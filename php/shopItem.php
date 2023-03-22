<?php

function shopItem($productID, $productName, $productPrice, $productImage){
    $element = "

  <div class=\"col-md-6 col-lg-4 col-xl-3 p-4\">
    <div class=\"shop-img position-relative\">
        <img src=\"$productImage\" class=\"w-100\" />
            <div class=\"overlay\">
                <input type=\"text\" value=\"$productID\" name=\"productID\" style=\"display: none\" />
                    <button class=\"add-bag-canvas btn btn-outline-dark btn-sm\" data-bs-toggle=\"offcanvas\" data-bs-target=\"#addToBag\" aria-controls=\"addToBag\" type=\"submit\">
                        Add to
                        <i class=\"fas fa-bag-shopping\"></i>
                    </button>
                <button class=\"btn btn-outline-dark btn-sm\">
                    <i class=\"fas fa-heart\"></i>
                </button>
                </div>
            </div>
            <div class=\"item-details text-center\">

                <p class=\"selected-product mt-3 text-capitalize my-1\"><a class=\"text-black text-decoration-none\" href=\"product.php?productID=$productID\" >$productName</a></p>
                <span class=\"fw-bold\">PHP $productPrice</span>
              </div>
            </div>

            ";
    echo $element;


}



?>