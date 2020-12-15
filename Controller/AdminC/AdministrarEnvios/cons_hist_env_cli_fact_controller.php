<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");


if ($_POST) {

    require '../../../config.php';
    $client_dao = new Cliente_DAO();

    $fecha_inicial = $_POST["InputFecIni"];
    $fecha_final = $_POST["InputFecFin"];

    $hora_desde = '00:00:00';
    $hora_hasta = '23:59:00';

    $fecha_ini = $fecha_inicial . " " . $hora_desde;
    $fecha_fin = $fecha_final . " " . $hora_hasta;
    if (isset($_SESSION["adminlogi"])) {
        $porciones = explode("|", $_POST["selectCliente"]);
        $td_cli = $porciones[0];
        $num_doc_cli = $porciones[1];

        echo json_encode($client_dao->consulta_hist_env_cliente_fact($fecha_ini, $fecha_fin, $td_cli, $num_doc_cli));
    } elseif (isset($_SESSION["mensajero_logi"])) {
//        echo json_encode($emp_dao->consultaEmpleadosQuincena($super_query, $_SESSION["tipo_doc"], $_SESSION["numero_doc"], $fecha_ini, $fecha_fin, $fin_query));
    }
} else {
    header("location../");
}