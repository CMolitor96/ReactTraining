import { fetchCouches, createContainer, createProductCard, fillCart } from './helper.js'

document.addEventListener("DOMContentLoaded", async function() {
    createContainer();
    let data = await fetchCouches();
    createProductCard(data);
    fillCart();
})