 <?php

      require "connect.php";
      require_once("shopItem.php");
      $getSql = "SELECT * FROM productdb";

      $result = mysqli_query($con, $getSql);

        if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)){
                shopItem($row['id'], $row['product_name'], $row['product_price'], $row['product_image']);
              }
        }

 ?>