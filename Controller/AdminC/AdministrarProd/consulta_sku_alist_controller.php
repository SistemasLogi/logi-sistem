<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');
if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    $sku = $_POST["sku"];
    $suc_numero_id = $_POST["id_suc"];

//    echo json_encode($product_dao->consultaProdStockAlist($_SESSION["num_suc_adm_alst"], $csc_sal_tmp, $fecha_hora_now));
    echo json_encode($product_dao->consultaProdStockAlistSku($suc_numero_id, $sku, $fecha_hora_now));
} else {
    header("location../");
}