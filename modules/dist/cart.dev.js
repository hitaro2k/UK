"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartVisible = cartVisible;

var _views = require("./views.js");

var menuBtn;
var menu;
var cartMenu = document.querySelector(".cart-menu");

function cartVisible() {
  var cartIcon = document.querySelector(".shopping-card__link");
  var cartClose = document.getElementById("close-cart");
  var documentHTML = document.querySelector("html");
  menuBtn = document.querySelector('.menu-btn');
  menu = document.querySelector(".menu--burger-list");

  cartIcon.onclick = function () {
    cartMenu.classList.add("cart-active");

    if (window.innerWidth < 560) {
      documentHTML.style.position = "fixed";
      documentHTML.style.height = "100vh";
      documentHTML.style.width = "100%";
      documentHTML.style.top = "0";
      documentHTML.style.margin = "0 auto";
    } else if (window.innerWidth < 560) {
      documentHTML.style.position = "static";
    }
  };

  cartClose.onclick = function () {
    cartMenu.classList.remove("cart-active");
    documentHTML.style.position = "static";
  };

  cartClose.addEventListener("click", function () {
    cartMenu.classList.remove("cart-active");
    documentHTML.style.position = "static";
  });
  return cartVisible;
}

cartVisible();