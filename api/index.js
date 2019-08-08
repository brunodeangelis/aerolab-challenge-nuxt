const express = require("express");
const app = express();
const router = express.Router();
const axios = require("axios");
const moment = require("moment");

router.get("/products", async (req, res) => {
  let page = 1;

  // Default to page 1 if no page query string is set.
  if (req.query.page) {
    page = req.query.page;
  }

  const dollar = await axios.get(`https://challenge-api.aerolab.co/dollar`);
  const products = await axios.get(
    `https://challenge-api.aerolab.co/products?page=${page}`
  );
  const now = moment();

  // Add field priceInDollars to each product.
  products.data.products.forEach(
    p =>
      (p.priceInDollars = parseFloat((p.price / dollar.data.rate).toFixed(2)))
  );

  // Filter by the difference in date from now.
  // If it's greater than a month, we filter out that product.
  products.data.products = products.data.products.filter(p => {
    const updatedAt = moment(p.updatedAt);
    return now.diff(updatedAt, "months") < 1;
  });

  res.json(products.data);
});

app.use(router);

module.exports = {
  path: "/api",
  handler: app
};
