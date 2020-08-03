<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');
if ($_POST) {
    require '../../../config.php';
    $stock_dao = new Stock_DAO();
    echo json_encode($stock_dao->consultaAlistaStock($fecha_hora_now, $_SESSION["num_suc_adm_alst"]));
} else {
    header("location../");
}