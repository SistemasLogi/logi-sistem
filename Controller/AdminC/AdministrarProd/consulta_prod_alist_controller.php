<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');
if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    $csc_sal_tmp = $_POST["csc"];
    $suc_num_id = $_POST["id_suc"];

    echo json_encode($product_dao->consultaProdStockAlist($suc_num_id, $csc_sal_tmp, $fecha_hora_now));
} else {
    header("location../");
}