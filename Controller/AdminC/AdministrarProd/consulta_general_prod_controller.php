<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    $suc_id = $_POST["suc_id"];

    echo json_encode($product_dao->consultaGeneralProductosCreados($suc_id));
} else {
    header("location../");
}
