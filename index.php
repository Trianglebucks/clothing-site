<?php
//create instance of connect db
require_once("php/createDB.php");

?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home</title>
    <!-- font awesome -->
    <link rel="stylesheet" href="fontawesome-free-6.3.0-web/css/all.min.css" />
    <!-- bootstrap css -->
    <link rel="stylesheet" href="bootstrap-5.2.3-dist/css/bootstrap.min.css" />
    <!-- custom css -->
    <link rel="stylesheet" href="css/main.css" />
  </head>
  <body class="home-page">
   <!-- header -->
     <!-- add to bag menu -->
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header border-bottom">
              <h5 class="offcanvas-title" id="offcanvasExampleLabel">Your bag</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="container text-center" id="emptyList">
                  <span>Your bag is empty.</span>
                </div>
                <div class="container" id="bagList">
                </div>
                <div class="container" id="bagTotalCost">
                </div>
            </div>
          </div>
    <!-- end add to bag menu -->

    <!-- navigation bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-4 header-nav">
      <div class="container">
        <a
          class="navbar-brand d-flex justify-content-between align-items-center order-lg-0"
          href="index.php"
        >
          <img src="images/brand-name-jap.png" style="width: 100px" />
        </a>
        <div class="order-lg-2">
          <button type="button" class="bag-menu btn position-relative" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i class="fa fa-shopping-bag fa-1x"></i
            ><span
              class="position-absolute top-0 start-100 translate-middle badge text-black"
              >0</span
            >
          </button>
          <button type="button" class="btn position-relative">
            <i class="fa fa-heart fa-1x"></i
            ><span
              class="position-absolute top-0 start-100 translate-middle badge text-black"
              ></span
            >
          </button>
          <button type="button" class="btn position-relative">
            <i class="fa fa-search fa-1x"></i>
          </button>
        </div>

        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse order-lg-1" id="navMenu">
          <ul class="navbar-nav mx-auto text-center" id="navLinks">
            <li class="nav-item px-2 py-2">
              <a class="active nav-link text-uppercase" href="index.php">Home</a>
            </li>
            <li class="nav-item px-2 py-2">
              <a class="nav-link text-uppercase" href="shop.php">Shop</a>
            </li>
            <li class="nav-item px-2 py-2">
              <a class="nav-link text-uppercase" href="collection.php"
                >Collection</a
              >
            </li>
            <li class="nav-item px-2 py-2">
              <a class="nav-link text-uppercase text-center" href="about.php"
                >About us</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- end of navigation bar -->

    <!-- end of header -->

    <!-- add to bag off canvas -->

    <div class="offcanvas offcanvas-end" tabindex="-1" id="addToBag" aria-labelledby="addToBagLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="addToBagLabel">Options</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <div class="container">
                <div class="row" id="canvasProduct">

                </div>
              </div>

            </div>
          </div>

    <!-- end of add to bag off canvas -->

    <!-- carousel -->

    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="./images/carousel-image.jpg"
            class="d-block w-100"
            alt="..."
            style="height: 150vh"
          />
          <div class="carousel-caption">
            <h5>Smart in appearance</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae,
              doloremque!
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="./images/carousel-image-2.jpg"
            class="d-block w-100"
            alt="..."
            style="height: 150vh"
          />
          <div class="carousel-caption">
            <h5>Never go out of style</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae,
              doloremque!
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="./images/carousel-image-1.jpg"
            class="d-block w-100"
            alt="..."
            style="height: 150vh"
          />
          <div class="carousel-caption">
            <h5>Dress how you want to be dressed</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae,
              doloremque!
            </p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- end of carousel -->

    <!-- new arrivals -->

    <section id="newArrivals" class="py-5">
      <div class="container-fluid">
        <div class="title text-center">
          <h2 class="position-relative d-inline-block">New Arrivals</h2>
        </div>
        <div class="row g-0">
          <div class="arrival-list row gx-0" id="arrivalList">

        </div>
      </div>
    </section>

    <!-- end of new arrivals -->

    <!-- footer -->
    <footer class="bg-black pt-5">
      <div class="container">
        <div class="row text-white g-4">
          <div class="col-md-12 col-lg-3">
            <a href="index.php"
              ><img
                src="images/kampo-brand-name.png"
                style="width: 200px; position: relative; bottom: 20px"
              />
            </a>
            <p class="text-white text-decoration-none">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At quia
              perspiciatis labore aut ad similique facilis esse enim, eligendi
              expedita! Commodi vitae vero veritatis iusto harum voluptas ipsum
              at incidunt.
            </p>
          </div>
          <div class="col-md-4 col-lg-3 position-relative">
            <div class="footer-pages">
              <h5 class="fw-light">Pages</h5>
              <ul class="list-unstyled mt-4">
                <li class="">
                  <a href="#" class="text-white text-decoration-none">Home</a>
                </li>
                <li class="">
                  <a href="#" class="text-white text-decoration-none"
                    >Contact</a
                  >
                </li>
                <li class="">
                  <a href="#" class="text-white text-decoration-none">FAQ</a>
                </li>
                <li class="">
                  <a href="#" class="text-white text-decoration-none">Shop</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-md-4 col-lg-3">
            <h5 class="fw-light">Follow us</h5>
            <p class="socials mt-4">
              <i class="fab fa-facebook-f"></i>
              <i class="fab fa-instagram"></i>
              <i class="fab fa-twitter"></i>
            </p>
          </div>
          <div class="col-md-4 col-lg-3">
            <h5 class="fw-light">Newsletter</h5>
            <p class="mt-4 text-white text-decoration-none">
              Stay updated for news
            </p>
            <div class="footer-newsletter">
              <form action="#newsletter">
                <input type="text" placeholder="Your email" />
                <button type="submit">
                  <span
                    ><i class="fa fa-envelope" arial-hidden="true"></i
                  ></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12 text-center">
        <div class="footer-copyright text-white">
          <p>Copyright &copy; 2023 Kampo</p>
        </div>
      </div>
    </footer>
    <!-- end of footer -->

    <!-- jquery -->
    <script src="./js/jquery-3.6.4.js"></script>
    <!-- bootstrap js -->
    <script src="./bootstrap-5.2.3-dist/js/bootstrap.min.js"></script>
    <!-- custom js -->
    <script src="./js/script.js"></script>
    <!-- stocks availability logic -->
    <script>

      let smallStocks = parseInt("<?=  $smallStocks?>");
      let mediumStocks = parseInt("<?=  $mediumStocks?>");
      let largeStocks = parseInt("<?=  $largeStocks?>");

      $(function() {
        fetchStocks(smallStocks, mediumStocks, largeStocks);
      });

    </script>

  </body>
</html>
