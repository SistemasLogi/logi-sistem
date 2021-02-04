<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');
if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    if (isset($_SESSION["sucursal"])) {
        echo json_encode($product_dao->consultaInventarioStock($_SESSION["numero_suc"], $fecha_hora_now));
    } else {
        $suc_num_id = $_POST["suc"];
        echo json_encode($product_dao->consultaInventarioStock($suc_num_id, $fecha_hora_now));
    }
} else {
    header("location../");
}