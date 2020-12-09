<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");


if ($_POST) {

    require '../../../config.php';
    $emp_dao = new Empleado_DAO();

    $fecha_inicial = $_POST["InputFecIni"];
    $fecha_final = $_POST["InputFecFin"];

    $hora_desde = '00:00:00';
    $hora_hasta = '23:59:00';


    $super_query = "SELECT TM.* FROM (";
    $fin_query = ")AS TM ORDER BY TM.exe_fec_hora ASC";
    $fecha_ini = $fecha_inicial . " " . $hora_desde;
    $fecha_fin = $fecha_final . " " . $hora_hasta;
    if (isset($_SESSION["adminlogi"])) {
//        echo json_encode($emp_dao->consultaEmpleadosQuincena($td_mens, $num_doc_mens, $fecha_ini, $fecha_fin));
    } elseif (isset($_SESSION["mensajero_logi"])) {
        echo json_encode($emp_dao->consultaEmpleadosQuincena($super_query, $_SESSION["tipo_doc"], $_SESSION["numero_doc"], $fecha_ini, $fecha_fin, $fin_query));
    }
} else {
    header("location../");
}