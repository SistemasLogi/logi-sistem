<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    if (isset($_SESSION["adminlogi"])) {
        $suc_id = $_POST["suc_id"];
        $detalle = $_POST["inpBuscaDet"];
        echo json_encode($product_dao->consultaDetalleEntrada($suc_id, $detalle));
    } elseif (isset($_SESSION["cliente_a"])) {
        $suc_id = $_POST["suc_id"];
        $detalle = $_POST["inpBuscaDet"];
        echo json_encode($product_dao->consultaDetalleEntrada($suc_id, $detalle));
    } elseif (isset($_SESSION["sucursal"])) {
        $detalle = $_POST["inpBuscaDet"];
        echo json_encode($product_dao->consultaDetalleEntrada($_SESSION["numero_suc"], $detalle));
    }
} else {
    header("location../");
}
