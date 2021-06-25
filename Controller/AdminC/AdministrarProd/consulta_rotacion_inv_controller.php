<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    if (isset($_SESSION["adminlogi"])) {
//        $suc_id = $_POST["suc_id"];
//        $fec_ini = $_POST["inpFechaInicio"];
//        $fec_fin = $_POST["inpFechaFin"];
//        echo json_encode($product_dao->consultaFechasEntrada($suc_id, $fec_ini, $fec_fin));
    } elseif (isset($_SESSION["cliente_a"])) {
//        $suc_id = $_POST["suc_id"];
//        $fec_ini = $_POST["inpFechaInicio"];
//        $fec_fin = $_POST["inpFechaFin"];
//        echo json_encode($product_dao->consultaFechasEntrada($suc_id, $fec_ini, $fec_fin));
    } elseif (isset($_SESSION["sucursal"])) {
        $fec_ini = $_POST["inpFechaIni"];
        $fec_fin = $_POST["inpFechaFin"];

        $hora_desde = '00:00:00';
        $hora_hasta = '23:59:00';

        $fecha_ini = $fec_ini . " " . $hora_desde;
        $fecha_fin = $fec_fin . " " . $hora_hasta;
        echo json_encode($product_dao->consultaFechasRotacionInv($_SESSION["numero_suc"], $fecha_ini, $fecha_fin, $fecha_hora_now));
    }
} else {
    header("location../");
}