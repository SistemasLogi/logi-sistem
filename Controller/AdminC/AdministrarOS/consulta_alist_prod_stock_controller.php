<?php

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');
if ($_POST) {
    $id_sucursal = $_POST["inp_id_sucursal"];
    require '../../../config.php';
    $stock_dao = new Stock_DAO();
    echo json_encode($stock_dao->consultaAlistaStock($fecha_hora_now, $id_sucursal));
} else {
    header("location../");
}