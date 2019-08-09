Ver el desafío [acá](https://github.com/Aerolab/challenge).

## Parte 1

1. ✅ [Diseño](https://challenge-api.aerolab.co/design/) traducido a código usando [TailwindCSS](https://tailwindcss.com/).

2. Utilizando [Nuxt.js](https://nuxtjs.org/):

- ✅ Infinite scrolling.
- ✅ Agregar/restar productos del carrito. No se pierde al hacer refresh.
- ✅ Switcher de monedas (ARS, USD).

3. API personalizada en el endpoint /api:

- ✅ Agrega el precio en dólares por cada producto.
- ✅ Sólo trae los productos que tienen como máximo 1 mes de antigüedad.

4. ✅ Deploy app y API en Now.

## Parte 2: Electric Boogaloo

**UI**

a) ✅ WEBP con fallback a JPG para navegadores que no lo soportan.

b) ✅ Uso de [@nuxtjs/pwa](https://pwa.nuxtjs.org/ "Nuxt PWA") para navegación offline.

**JS**

a) ❌ El equipo de infraestructura nos pidió que nuestro proxy cargue los productos desde https://challenge-api.aerolab.co/slow/products , pero como el nombre indica, anda lentísimo y nos arruina la performance de la API.
Hay algo que puedas hacer en el proxy para que no nos afecte tanto? La verdad es que los productos no cambian súper seguido.

b) ❌ Por otra parte, la lista de categorías de https://challenge-api.aerolab.co/categories viene en una lista plana. Nos vendría muy bien a futuro tener un endpoint `/category_tree` a la API que devuelva las categorías en forma de árbol, tomando como referencia el siguiente formato:

```
{
  id: 1, name: 'Categoria', parent_id: null,
  subcategories: [{
    id: 25, name: 'Subcategoria', parent_id: 1,
    subcategories: [
      { id: 54, name: 'Sub-subcategoria' parent_id: 25 }
    ]
  }]
}
```
