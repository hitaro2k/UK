"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.views = views;

var _cart = require("./cart.js");

var documentHTML = document.querySelector("html");
var cartItems = [];

function views() {
  /* -------------------------------------------------------------------------- */

  /*                                  Variable                                  */

  /* -------------------------------------------------------------------------- */
  var cartMenu = document.querySelector(".cart-menu");
  var menuBtn;
  var menu;
  var cartWrapper = document.querySelector(".isntclear");
  var isclear = document.querySelector(".isclear");
  var isntclear = document.querySelector(".isntclear");
  var totalPrice = document.querySelector(".total-price__wrapper");
  var showForm = document.querySelector(".total-price__button-buy");
  var formWrap = document.querySelector(".form-order__background");
  var formProductPrice = document.querySelector(".block__product-price");
  var formProductItem = document.querySelector(".block__product-item");
  /* -------------------------------------------------------------------------- */

  /*                                Main scripts                                */

  /* -------------------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    /* -------------------------------------------------------------------------- */

    /*                                  Preloader                                 */

    /* -------------------------------------------------------------------------- */
    window.addEventListener('load', function () {
      var images = [];
      document.querySelectorAll('img').forEach(function (img) {
        images.push(img.src);
      });
      var imagesLoaded = 0;

      for (var i = 0; i < images.length; i++) {
        var img = new Image();
        img.src = images[i];

        img.onload = function () {
          imagesLoaded++;

          if (imagesLoaded == images.length) {
            document.querySelector('#preloader').style.display = 'none';
          }
        };
      }
    });
    /* -------------------------------------------------------------------------- */

    /*                                Functionality                               */

    /* -------------------------------------------------------------------------- */

    function findCartItem(id) {
      return cartItems.find(function (item) {
        return item.id === id;
      });
    }

    window.addEventListener("click", function (event) {
      if (event.target.hasAttribute("data")) {
        var removeCartItem = function removeCartItem(id) {
          var index = cartItems.findIndex(function (item) {
            return item.id === id;
          });
          cartItems.splice(index, 1);
          var item = document.querySelector("[data-id=\"".concat(id, "\"]")).closest('.item');
          item.parentNode.removeChild(item);
          updateTotalPrice();
        };

        var updateTotalPrice = function updateTotalPrice() {
          var itemPrices = document.querySelectorAll('.item-price');
          var totalPriceCash = 0;
          itemPrices.forEach(function (item) {
            var productId = item.closest('.item').querySelector('.button-primary__plus').dataset.id;
            var itemInfo = findCartItem(productId);
            totalPriceCash += parseFloat(item.textContent) * itemInfo.count;
          });
          document.querySelector('.total-price__text').innerHTML = totalPriceCash + " грн";
        };

        var card = event.target.closest(".product");
        var productId = card.dataset.id;
        var existingItem = findCartItem(productId);
        cartMenu.classList.add("cart-active");
        isntclear.style.display = "flex";
        totalPrice.style.display = "flex";
        isclear.style.display = "none";
        /* -------------------------------------------------------------------------*/

        /*                                Card Item                                 */

        /* -------------------------------------------------------------------------*/

        if (existingItem) {
          var countElem = document.querySelector(".item-count[data-counter=\"".concat(productId, "\"]"));
          countElem.textContent = Number(countElem.textContent) + 1;
          return;
        }

        var productInfo = {
          id: productId,
          imgSrc: card.querySelector(".product-image").getAttribute("src"),
          title: card.querySelector(".product-title").innerText,
          status: card.querySelector(".product-status").innerText,
          price: card.querySelector(".product-price").innerText,
          count: 1,
          data: "".concat(productId)
        };
        var itemInCart = "   <div class=\"item\">\n                <img src=\"".concat(productInfo.imgSrc, "\" alt=\"\" class=\"item-image\">\n                <p class=\"item-name\">").concat(productInfo.title, "</p>\n                <p class=\"item-price\">").concat(productInfo.price, "</p>\n                <div class=\"item__button__add-delete\">\n                    <button class=\"button-primary__plus\" data-id=\"").concat(productInfo.data, "\">+</button>\n                    <p class=\"item-count\" data-counter=\"").concat(productInfo.id, "\">").concat(productInfo.count, "</p>\n                    <button class=\"button-primary__minus\" data-id=\"").concat(productInfo.data, "\" id=\"minus\">-</button>\n                </div>\n            </div>\n        ");
        cartWrapper.insertAdjacentHTML("beforeend", itemInCart);
        cartItems.push(productInfo);
        /* --------------------------------------------------------------------------*/

        /*                                  Buttons                                  */

        /* --------------------------------------------------------------------------*/

        var btnPlus = document.querySelectorAll(".button-primary__plus");
        var btnMinus = document.querySelectorAll(".button-primary__minus");
        /* -------------------------------------------------------------------------- */

        /*                                  Btn Plus                                  */

        /* -------------------------------------------------------------------------- */

        btnPlus.forEach(function (button) {
          button.addEventListener("click", function (event) {
            var productId = event.target.dataset.id;
            var item = findCartItem(productId);
            var countElem = document.querySelector(".item-count[data-counter=\"".concat(productId, "\"]"));
            var countElemAttr = countElem.getAttribute("data-counter");

            if (countElemAttr == productInfo.data) {
              item.count++;
            }

            countElem.textContent = item.count;
            updateTotalPrice();
          });
        });
        /* -------------------------------------------------------------------------- */

        /*                                  Btn Minus                                 */

        /* -------------------------------------------------------------------------- */

        btnMinus.forEach(function (button) {
          button.addEventListener("click", function (event) {
            var productId = event.target.dataset.id;
            var item = findCartItem(productId);
            var countElem = document.querySelector(".item-count[data-counter=\"".concat(productId, "\"]"));
            var countElemAttr = countElem.getAttribute("data-counter");

            if (countElemAttr == productInfo.data) {
              item.count--;
            }

            if (item.count === 0) {
              removeCartItem(productId);
            } else {
              countElem.textContent = item.count;
              updateTotalPrice();
            }
          });
        });
        updateTotalPrice();
      }
    });
    /* -----------------------------------------------------------------------*/

    /*                                  FORM                                  */

    /* -----------------------------------------------------------------------*/

    function formOrder() {
      var closeForm = document.querySelector(".close-form");
      closeForm.addEventListener("click", function () {
        formWrap.style.display = "none";
        documentHTML.style.overflowY = "scroll";
      });
      showForm.addEventListener("click", function () {
        var buyProduct;
        var priceToForm = document.querySelector('.total-price__text').textContent;
        var buyPrice = " \n        <div class=\"price-block\">\n          <p class=\"title\">Title</p>\n          <p class=\"total-price\">".concat(priceToForm, "</p>\n        </div>\n        ");
        cartItems.forEach(function (item) {
          buyProduct = "\n          <div class=\"product-block\">\n            <div class=\"product\">\n                <div class=\"image\"><img class=\"image\" src=\"".concat(item.imgSrc, "\" alt=\"\"></div>\n                  <div class=\"name\">").concat(item.title, "</div>\n                  <div class=\"product-price\">").concat(item.price, "</div>\n            </div>\n          </div>\n        "); // countProduct.forEach(item=>{
          //  item.forEach(el=>{
          //   console.log(el)
          //  })
          // })
          // formProductPrice.insertAdjacentHTML("beforeend" , buyPrice)
          // formProductItem.insertAdjacentHTML("beforeend" , buyProduct)
        });
        formWrap.style.display = "flex";

        if (formWrap.style.display = "flex") {
          documentHTML.style.position = "fixed";
          documentHTML.style.height = "100vh";
          documentHTML.style.width = "100%";
          documentHTML.style.overflowY = "hidden";
          documentHTML.style.top = "0";
          documentHTML.style.margin = "0 auto";
        } else {
          documentHTML.style.overflowY = "scroll";
        }
      });
    }

    ;
    formOrder();
  });
  return views;
}

views();