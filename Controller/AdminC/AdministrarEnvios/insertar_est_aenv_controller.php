<?php

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');

if ($_POST) {
    require '../../../config.php';
    $est_x_aenv_dao = new Est_x_aenv_DAO();

    $est_id = $_POST["estado"];
    $fech_hora = $fecha_hora_now;
    $novedad = $_POST["novedad"];
    $venta = $_POST["venta"];
    $os_id = $_POST["os_num"];

    echo $est_x_aenv_dao->insertarEstado_x_AEnvio_Venta($est_id, $fech_hora, $novedad, $venta, $os_id);
} else {
    header("location../");
}