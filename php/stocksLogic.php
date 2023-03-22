<?php

    require "connect.php";

    $getSql = "SELECT * FROM productdb";

    $result = mysqli_query($con, $getSql);
    $data = array();

        if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)){
                 $data[] = array('id' => $row['id'], 'smallStocks' => $row['small_stocks'], 'mediumStocks' => $row['medium_stocks'], 'largeStocks' => $row['large_stocks'] );
              }
        }
    echo json_encode($data);

?>