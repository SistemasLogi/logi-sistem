<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    if (isset($_SESSION["adminlogi"])) {
        $suc_id = $_POST["suc_id"];
        $fec_ini = $_POST["inpFechaInicio"];
        $fec_fin = $_POST["inpFechaFin"];
        echo json_encode($product_dao->consultaFechasEntrada($suc_id, $fec_ini, $fec_fin));
    } elseif (isset($_SESSION["cliente_a"])) {
        $suc_id = $_POST["suc_id"];
        $fec_ini = $_POST["inpFechaInicio"];
        $fec_fin = $_POST["inpFechaFin"];
        echo json_encode($product_dao->consultaFechasEntrada($suc_id, $fec_ini, $fec_fin));
    } elseif (isset($_SESSION["sucursal"])) {
        $fec_ini = $_POST["inpFechaInicio"];
        $fec_fin = $_POST["inpFechaFin"];
        echo json_encode($product_dao->consultaFechasEntrada($_SESSION["numero_suc"], $fec_ini, $fec_fin));
    }
} else {
    header("location../");
}
