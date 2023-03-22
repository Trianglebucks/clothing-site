<?php

$dbname = "kampoDB";
$tablename = "productDB";

require "initial.php";

if ($con) {
}
else {
    die(mysqli_error($con));
}

//check if db exists
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";

if (mysqli_query($con, $sql)) {
    $conTable = mysqli_connect($hostname, $username, $password, $dbname);

    $tableSql = "CREATE TABLE IF NOT EXISTS $tablename
            (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
             date_published DATE NOT NULL,
             product_name VARCHAR (25) NOT NULL,
             product_price FLOAT,
             product_image VARCHAR(100),
             product_image2 VARCHAR(100),
             product_image3 VARCHAR(100),
             product_image4 VARCHAR(100),
             product_description VARCHAR(300),
             small_stocks INT,
             medium_stocks INT,
             large_stocks INT
            )";

    if (!mysqli_query($conTable,$tableSql)) {
        echo "Error creating table:" .mysqli_error($conTable);
    }
    else {
        return false;
    }
}

mysqli_close($con);
//gets data for shop


?>