"use strict"
import {views} from "../modules/views.js"
import {search} from "../modules/search.js"
import {form} from "../modules/form.js"
import {renderData} from "../modules/render.js"
function getProductData() {
    const productContainer = document.querySelector(".products__container")
    const urlParams = new URLSearchParams(window.location.search);
    const cartData = urlParams.get("cartData");
  
    if (cartData) {
      const parsedCartData = JSON.parse(decodeURIComponent(cartData));

      const product = `
        <div class="product" data-id ="${parsedCartData.id}">
        <img src="${parsedCartData.image}" alt="" class="product-image">
        <div class="product-content">
            <p class="product-title">${parsedCartData.name}</p>
            <p class="product__articul">${parsedCartData.articul}</p>
            <p class= "product-status"> </p>
            <div class="product-buy">
                <p class="product-price">${parsedCartData.price}</p>
                <button class="product-btn" data>Купить </button>
            </div>
        </div>
    </div>
      `
      productContainer.insertAdjacentHTML("beforeend" , product)
    }
  }
  
getProductData();
  