<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');
$hora_desde = '00:00:00';
$hora_hasta = '23:59:00';

if ($_POST) {
    require '../../../config.php';
    $serv_dao = new Orden_serv_DAO();
    if (isset($_SESSION["adminlogi"])) {
        
    } elseif (isset($_SESSION["mensajero_logi"])) {
        echo json_encode($serv_dao->consulta_ult_os_dash_mens($_SESSION["tipo_doc"], $_SESSION["numero_doc"], $fech_solo));
    }
} else {
    header("location../");
}