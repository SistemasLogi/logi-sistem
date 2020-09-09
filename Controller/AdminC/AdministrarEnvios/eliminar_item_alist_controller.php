<?php

if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    echo $product_dao->elimProdTemp($_POST["csc"]);
} else {
    header("location../");
}
