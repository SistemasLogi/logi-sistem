<?php

if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();


    $items_temp = json_encode($product_dao->consultaProd_x_venta_sal_temp($_POST["numVentAlist"]));
    if (!empty($items_temp)) {
        echo $items_temp;
    } else {
        echo json_encode($product_dao->consultaProd_x_venta_sal($_POST["numVentAlist"]));
    }
} else {
    header("location../");
}