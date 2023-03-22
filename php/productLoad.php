
 <?php

    if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
         $url = "https://";
    else
         $url = "http://";
    // Append the host(domain name, ip) to the URL.
    $url.= $_SERVER['HTTP_HOST'];

    // Append the requested resource location to the URL
    $url.= $_SERVER['REQUEST_URI'];


    $url_components = parse_url($url);

    parse_str($url_components['query'], $params);

    $selProdID = $params['productID'];


    //extract data from database
    require "php/connect.php";

    $getProd = "SELECT * FROM productdb WHERE id = $selProdID";

    $result = mysqli_query($con, $getProd);

    $data = array();

    if (mysqli_num_rows($result) > 0) {
  // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
    $id = $row ["id"];
    $prodName =  $row["product_name"];
    $prodPrice = $row["product_price"];
    $prodImage = $row["product_image"];
    $prodImage2 = $row["product_image2"];
    $prodImage3 = $row["product_image3"];
    $prodImage4 = $row["product_image4"];
    $prodDesc = $row["product_description"];
    $smallStocks = $row["small_stocks"];
    $mediumStocks = $row["medium_stocks"];
    $largeStocks = $row["large_stocks"];

    //stocks
    $data[] = array('smallStocks' => (int)$row['small_stocks'], 'mediumStocks' => (int)$row['medium_stocks'], 'largeStocks' => (int)$row['large_stocks']);
    }
  }




 ?>

