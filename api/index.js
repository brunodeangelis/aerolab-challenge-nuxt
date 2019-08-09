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

  const dollarPromise = axios.get(`https://challenge-api.aerolab.co/dollar`);
  const productsPromise = axios.get(
    `https://challenge-api.aerolab.co/products?page=${page}`
  );

  const [dollar, products] = await Promise.all([
    dollarPromise,
    productsPromise
  ]);

  // Add field priceInUSD to each product.
  products.data.products.forEach(p => {
    p.priceInUSD = parseFloat((p.price / dollar.data.rate).toFixed(2));
    p.originalPriceInUSD = parseFloat(
      (p.originalPrice / dollar.data.rate).toFixed(2)
    );
  });

  // If it's less than a month old, we let it stay in the array.
  const now = moment();
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
