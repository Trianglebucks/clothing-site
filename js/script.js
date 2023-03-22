//Navbar scroll animation
$(document).ready(function () {
  if ($(window).width() < 992) {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 60) {
        console.log("it is werking");

        $(".header-nav").removeClass("py-4");
        $(".header-nav").addClass("navbar-scroll");
        $(".header-nav").addClass("py-3");
      } else {
        $(".header-nav").removeClass("navbar-scroll");
        $(".header-nav").removeClass("py-3");
        $(".header-nav").addClass("py-4");
      }
    });
  } else if ($(window).width() > 991) {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 60) {
        $(".header-nav").removeClass("py-4");
        $(".header-nav").addClass("navbar-scroll");
        $(".header-nav").addClass("py-0");
      } else {
        $(".header-nav").removeClass("navbar-scroll");
        $(".header-nav").removeClass("py-0");
        $(".header-nav").addClass("py-4");
      }
    });
  }
});

//single product gallery
var mainImg = document.getElementById("prodMainImg");
var smallImg = document.getElementsByClassName("prodSmallImg");

for (let i = 0; i < smallImg.length; i++) {
  smallImg[i].addEventListener("click", function () {
    mainImg.src = smallImg[i].src;
  });
}

//related product load
$(function () {
  if ($("body").is(".product-page")) {
    $(document).ready(function () {
      $.ajax({
        type: "GET",
        url: "./php/randomProd.php",
        dataType: "html",
        success: function (data) {
          $("#relatedList").html(data);
          bagListCanvas();
        }
      });
    });
  }
});

//shop load
$(function () {
  if ($("body").is(".shop-page")) {
    $(document).ready(function () {
      $.ajax({
        type: "GET",
        url: "./php/shopProd.php",
        dataType: "html",
        success: function (data) {
          $("#shopList").html(data);
          bagListCanvas();
        }
      });
    });
  }
});

//new arrivals load
$(function () {
  if ($("body").is(".home-page")) {
    $(document).ready(function () {
      $.ajax({
        type: "GET",
        url: "./php/newProd.php",
        dataType: "html",
        success: function (data) {
          $("#arrivalList").html(data);
          bagListCanvas();
        }
      });
    });
  }
});

/* shop list add to bag logic */

function fetchOptions() {
  let id;
  let productName;
  let productPrice;
  let productImage;
  let smallStocks;
  let mediumStocks;
  let largeStocks;

  return $.ajax({
    type: "POST",
    dataType: "json",
    url: "./php/fetchOptions.php",
    data: {
      id: id,
      productName: productName,
      productPrice: productPrice,
      productImage: productImage,
      smallStocks: smallStocks,
      mediumStocks: mediumStocks,
      largeStocks: largeStocks
    }
  });
}

function selectStocks(smallStocks, mediumStocks, largeStocks) {
  let sizeSelect = document.querySelector("#selectSize");
  let selectedSize = () => {
    let sizeValue = sizeSelect.options[sizeSelect.selectedIndex].value;
    let stocksNum = document.getElementById("stocksNum");
    let addBtn = document.querySelector(".canvas-add-bag");

    if (sizeValue === "small") {
      if (smallStocks > 0) {
        stocksNum.hidden = false;
        stocksNum.innerHTML = "Only " + smallStocks + " left!";
        addBtn.innerHTML = "Add To Bag";
        addBtn.disabled = false;
      } else {
        stocksNum.hidden = true;
        addBtn.innerHTML = "Out of Stock";
        addBtn.disabled = true;
      }
    } else if (sizeValue === "medium") {
      if (mediumStocks > 0) {
        stocksNum.hidden = false;
        stocksNum.innerHTML = "Only " + mediumStocks + " left!";
        addBtn.innerHTML = "Add To Bag";
        addBtn.disabled = false;
      } else {
        stocksNum.hidden = true;
        addBtn.innerHTML = "Out of Stock";
        addBtn.disabled = true;
      }
    } else if (sizeValue === "large") {
      if (largeStocks > 0) {
        stocksNum.hidden = false;
        stocksNum.innerHTML = "Only " + largeStocks + " left!";
        addBtn.innerHTML = "Add To Bag";
        addBtn.disabled = false;
      } else {
        stocksNum.hidden = true;
        addBtn.innerHTML = "Out of Stock";
        addBtn.disabled = true;
      }
    }
  };

  selectedSize();

  sizeSelect.addEventListener("change", selectedSize);
}

function bagListCanvas() {
  console.log("its working now");
  let bags = document.querySelectorAll(".add-bag-canvas");

  let idValue;
  for (let i = 0; i < bags.length; i++) {
    bags[i].addEventListener("click", () => {
      idValue = bags[i].previousElementSibling.value;

      $.when(
        fetchOptions().then(
          function successHandler(data) {
            console.log(idValue);

            let selectedProd = data.find(data => data.id === idValue);

            displayProdCanvas(
              selectedProd.productName,
              selectedProd.productImage,
              selectedProd.productPrice
            );
            selectStocks(
              selectedProd.smallStocks,
              selectedProd.mediumStocks,
              selectedProd.largeStocks
            );

            let canvasBtn = document.querySelector(".canvas-add-bag");
            console.log(canvasBtn);

            canvasBtn.addEventListener("click", () => {
              //if selected size exists, it will not add to cart
              let sizeValue = document.querySelector("#selectSize").value;
              selectedProd.inBag = 0;
              selectedProd.size = sizeValue;
              let prodNameSize =
                selectedProd.productName + "n" + selectedProd.size;
              let bagItems = localStorage.getItem("productsInBag");
              bagItems = JSON.parse(bagItems);

              if (bagItems != null) {
                if (bagItems[prodNameSize] != undefined) {
                  alert("selected size already exist in bag!");
                } else {
                  bagNumbers(selectedProd);
                  totalCost(selectedProd);
                  displayBag();
                }
              } else {
                bagNumbers(selectedProd);
                totalCost(selectedProd);
                displayBag();
              }
            });
          },
          function errorHandler() {
            console.log("error occured");
          }
        )
      );
    });
  }
}

// dynamic fetch of data from server
function displayProdCanvas(productName, productImage, productPrice) {
  let canvasProd = document.querySelector("#canvasProduct");
  canvasProd.innerHTML = `<div class="col-12 text-center">
                      <h4>${productName}</h4>
                    </div>
                    <div class="col-12">
                          <img
                          src="${productImage}"
                          width="100%"
                          id="prodMainImg"
                          alt=""
                      />
                    </div>
                    <div class="col-12">
                      <h5>PHP${productPrice}</h5>
                    </div>
                    <div class="col-12">
                      <h6 class="pt-1">Size</h6>
                      <select id="selectSize" class="form-select" aria-label="Default select example">
                        <option value="small" selected>S</option>
                        <option value="medium">M</option>
                        <option value="large">L</option>
                      </select>
                    </div>
                    <div class="col-12">
                      <div class="d-grid gap-2 pt-2 ">
                          <button class="canvas-add-bag btn btn-dark" disabled>

                          <span id="loadingIcon" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

                          </button>
                        </div>
                    </div>
                    <div class="col-12 pt-2">

                    <h6 class="text-center" id="stocksNum"></h6>

                    </div>
                    `;
}

/* product page add to bag logic */

//fetch product item
function fetchData() {
  let id;
  let productName;
  let productPrice;
  let productImage;

  return $.ajax({
    type: "POST",
    dataType: "json",
    url: "./php/fetchData.php",
    data: {
      id: id,
      productName: productName,
      productPrice: productPrice,
      productImage: productImage,
      inBag: 0
    }
  });
}

//gets stocks data for product page
function fetchStocks(smallStocks, mediumStocks, largeStocks) {
  let sizeRadio = document.querySelectorAll("input[name='size']");

  let selectedSize = () => {
    let selected = document.querySelector("input[name='size']:checked").value;
    let stocksNum = document.getElementById("stocksNumber");
    let btnBag = document.querySelector(".add-bag");
    if (selected === "small") {
      if (smallStocks > 0) {
        stocksNum.hidden = false;
        stocksNum.innerHTML = "Only " + smallStocks + " left!";
        btnBag.innerHTML = "Add To Bag";
        btnBag.disabled = false;
      } else {
        stocksNum.hidden = true;
        btnBag.innerHTML = "Out of Stock";
        btnBag.disabled = true;
      }
    } else if (selected === "medium") {
      if (mediumStocks > 0) {
        stocksNum.hidden = false;
        stocksNum.innerHTML = "Only " + mediumStocks + " left!";
        btnBag.innerHTML = "Add To Bag";
        btnBag.disabled = false;
      } else {
        stocksNum.hidden = true;
        btnBag.innerHTML = "Out of Stock";
        btnBag.disabled = true;
      }
    } else if (selected === "large") {
      if (largeStocks > 0) {
        stocksNum.hidden = false;
        stocksNum.innerHTML = "Only " + largeStocks + " left!";
        btnBag.innerHTML = "Add To Bag";
        btnBag.disabled = false;
      } else {
        stocksNum.hidden = true;
        btnBag.innerHTML = "Out of Stock";
        btnBag.disabled = true;
      }
    }
  };

  selectedSize();

  sizeRadio.forEach(radioBtn => {
    radioBtn.addEventListener("change", selectedSize);
  });
}

//guaranteees product is finished loading
if ($("body").is(".product-page")) {
  $(document).ready(function () {
    $.when(
      fetchData().then(
        function successHandler(data) {
          let bag = document.querySelector(".add-bag");
          let idValue = document.querySelector(".product-id").value;

          bag.addEventListener("click", () => {
            for (let a = 0; a < data.length; a++) {
              if (data[a].id == idValue) {
                let sizeValue = document.querySelector(
                  "input[name = size]:checked"
                ).value;
                data[a].size = sizeValue;
                data[a].inBag = 0;

                //if selected size exists, it will not add to cart
                let prodNameSize = data[a].productName + "n" + data[a].size;
                let bagItems = localStorage.getItem("productsInBag");
                bagItems = JSON.parse(bagItems);
                if (bagItems != null) {
                  if (bagItems[prodNameSize] != undefined) {
                    alert("selected size already exist in bag!");
                  } else {
                    bagNumbers(data[a]);
                    totalCost(data[a]);
                    displayBag();
                  }
                } else {
                  bagNumbers(data[a]);
                  totalCost(data[a]);
                  displayBag();
                }
              }
            }
          });
        },
        function errorHandler() {
          console.log("error occured");
        }
      )
    );
  });
}

//function for cart numbers on local storage
function bagNumbers(clickedProd, action) {
  let productNumbers = localStorage.getItem("bagNumbers");
  productNumbers = parseInt(productNumbers);

  let bagItems = localStorage.getItem("productsInBag");
  bagItems = JSON.parse(bagItems);

  if (action) {
    localStorage.setItem("bagNumbers", productNumbers - 1);
    document.querySelector(".bag-menu span").textContent = productNumbers - 1;
    console.log("it decreases");
  } else if (productNumbers) {
    localStorage.setItem("bagNumbers", productNumbers + 1);
    document.querySelector(".bag-menu span").textContent = productNumbers + 1;
    console.log("it increases");
  } else {
    localStorage.setItem("bagNumbers", 1);
    document.querySelector(".bag-menu span").textContent = 1;
  }
  setItems(clickedProd);
}

//set items on local storage
function setItems(clickedProd) {
  let prodNameSize = clickedProd.productName + "n" + clickedProd.size;
  let bagItems = localStorage.getItem("productsInBag");
  bagItems = JSON.parse(bagItems);

  if (bagItems != null) {
    if (bagItems[prodNameSize] == undefined) {
      bagItems = {
        ...bagItems,
        [prodNameSize]: clickedProd
      };
    }
    bagItems[prodNameSize].inBag += 1;
  } else {
    clickedProd.inBag = 1;
    bagItems = {
      [prodNameSize]: clickedProd
    };
  }

  localStorage.setItem("productsInBag", JSON.stringify(bagItems));
}

function totalCost(clickedProd, action) {
  // console.log("The product price is:", clickedProd);

  let bagCost = localStorage.getItem("totalCost");

  if (action) {
    bagCost = parseInt(bagCost);
    localStorage.setItem("totalCost", bagCost - clickedProd.productPrice);
  } else if (bagCost != null) {
    bagCost = parseInt(bagCost);
    localStorage.setItem("totalCost", bagCost + clickedProd.productPrice);
  } else {
    localStorage.setItem("totalCost", clickedProd.productPrice);
  }
}

//loads the data in localstorage
function onLoadBagNumbers() {
  let productNumbers = localStorage.getItem("bagNumbers");

  if (productNumbers) {
    document.querySelector(".bag-menu span").textContent = productNumbers;
  }
}

//displays current data in localStorage
function displayBag() {
  let bagItems = localStorage.getItem("productsInBag");
  let bagCost = localStorage.getItem("totalCost");
  let bagNum = localStorage.getItem("bagNumbers");

  bagItems = JSON.parse(bagItems);
  let bagList = document.querySelector("#bagList");
  let bagTotalCost = document.querySelector("#bagTotalCost");
  let emptyBag = document.querySelector("#emptyList");
  if (bagItems && bagList && bagNum != 0 && bagNum != null) {
    emptyBag.style.visibility = "hidden";
    bagList.style.visibility = "visible";
    bagTotalCost.style.visibility = "visible";
    bagList.innerHTML = "";
    Object.values(bagItems).map(item => {
      bagList.innerHTML += `

                    <div class="row rows-cols-2">
                      <div class="col-12 py-2">
                      <h5>${item.productName}</h5>
                      </div>
                      <div class="border-bottom col-5 py-2">
                          <img
                          src="${item.productImage}"
                          width="100%"
                          id="prodMainImg"
                          alt=""
                        /></div>
                      <div class="border-bottom col-5 py-2">
                          <span class="py-1">${item.size}</span>
                          <br>
                          <span class="py-1">₱ ${item.productPrice}</span>
                          <div class="bag-quantity-input pt-4 text-nowrap">
                            <button class="decrease btn"><span>-</span></button>
                              <span class="py-2 px-3 border">${item.inBag}</span>
                            <button class="increase btn"><span>+</span></button>
                          </div>
                      </div>
                      <div class="border-bottom col-2 py-4 d-flex flex-column-reverse">
                          <button class="remove-btn btn">
                            <span><i class="fa-solid fa-trash" style="font-size: 24px"></i></span>
                          </button>
                      </div>
                    </div>

      `;
    });

    bagTotalCost.innerHTML = `

    <h5 class="text-center pt-4">Total</h5>
                  <h5 class="text-center">₱ ${bagCost}</h5>
                  <div class="d-grid gap-2 pt-2 ">
                    <button class="btn btn-dark">Checkout</button>
                  </div>

    `;

    manageQuantity();
    deleteButtons();
  } else {
    emptyBag.style.visibility = "visible";
    bagList.style.visibility = "hidden";
    bagTotalCost.style.visibility = "hidden";
  }
}

//decrease and increase quantity clientside
function manageQuantity() {
  let decreaseButtons = document.querySelectorAll(".decrease");
  let increaseButtons = document.querySelectorAll(".increase");
  let currentQuantity = 0;
  let currentProduct = "";
  let bagItems = localStorage.getItem("productsInBag");
  bagItems = JSON.parse(bagItems);

  for (let i = 0; i < increaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", () => {
      currentQuantity = decreaseButtons[i].nextElementSibling.textContent;
      currentProduct =
        decreaseButtons[i].parentElement.parentElement.previousElementSibling
          .previousElementSibling.children[0].textContent +
        "n" +
        decreaseButtons[i].parentElement.previousElementSibling
          .previousElementSibling.previousElementSibling.textContent;

      if (bagItems[currentProduct].inBag > 1) {
        bagItems[currentProduct].inBag -= 1;

        bagNumbers(bagItems[currentProduct], true);

        totalCost(bagItems[currentProduct], true);

        localStorage.setItem("productsInBag", JSON.stringify(bagItems));
        displayBag();
      }
    });

    increaseButtons[i].addEventListener("click", () => {
      currentQuantity = increaseButtons[i].previousElementSibling.textContent;
      currentProduct =
        increaseButtons[i].parentElement.parentElement.previousElementSibling
          .previousElementSibling.children[0].textContent +
        "n" +
        increaseButtons[i].parentElement.previousElementSibling
          .previousElementSibling.previousElementSibling.textContent;

      bagItems[currentProduct].inBag += 1;
      bagNumbers(bagItems[currentProduct]);
      totalCost(bagItems[currentProduct]);
      localStorage.setItem("productsInBag", JSON.stringify(bagItems));
      displayBag();
      console.log("after 4 method", bagItems[currentProduct].inBag);
    });
  }
}

//delete product
function deleteButtons() {
  let deleteButtons = document.querySelectorAll(".remove-btn");
  let productNumbers = localStorage.getItem("bagNumbers");
  let bagCost = localStorage.getItem("totalCost");
  let bagItems = localStorage.getItem("productsInBag");
  bagItems = JSON.parse(bagItems);

  let productName;

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      productName =
        deleteButtons[i].parentElement.previousElementSibling
          .previousElementSibling.previousElementSibling.children[0]
          .textContent +
        "n" +
        deleteButtons[i].parentElement.previousElementSibling.children[0]
          .textContent;

      localStorage.setItem(
        "bagNumbers",
        productNumbers - bagItems[productName].inBag
      );
      localStorage.setItem(
        "totalCost",
        bagCost -
          bagItems[productName].productPrice * bagItems[productName].inBag
      );

      delete bagItems[productName];

      localStorage.setItem("productsInBag", JSON.stringify(bagItems));

      displayBag();

      onLoadBagNumbers();
    });
  }
}

displayBag();
onLoadBagNumbers();
