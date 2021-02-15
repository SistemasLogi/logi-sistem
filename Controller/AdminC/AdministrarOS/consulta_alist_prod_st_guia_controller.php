<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');
if ($_POST) {
    require '../../../config.php';
    $stock_dao = new Stock_DAO();
    $num_guia = $_POST["inp_num_guia"];
    $id_sucursal = $_POST["inp_id_sucursal"];

    echo json_encode($stock_dao->consultaAlistaStockGuia($fecha_hora_now, $id_sucursal, $num_guia));
} else {
    header("location../");
}