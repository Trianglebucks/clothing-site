<?php

    require "connect.php";

    $getSql = "SELECT * FROM productdb";

    $result = mysqli_query($con, $getSql);
    $data = array();

        if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)){
                 $data[] = array('id' => $row['id'], 'productName' => $row['product_name'], 'productPrice' => (float)$row['product_price'], 'productImage' => $row['product_image'],'inBag' => 0);
              }
        }
    echo json_encode($data);

?>