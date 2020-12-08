<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");

$fech_solo = date('Y-m-d');
$hora_desde = '00:00:00';
$hora_hasta = '23:59:00';
$fecha_ini = $fech_solo . " " . $hora_desde;
$fecha_fin = $fech_solo . " " . $hora_hasta;
$date = strtotime($fecha_hora_now);
$anio = date("Y", $date); // Year (2003)
$mes = date("m", $date); // Month (12)
$dia = date("d", $date); // day (14) 

$número = cal_days_in_month(CAL_GREGORIAN, $mes, $anio); // 31

if ($_POST) {
    if ($dia < 15) {
        setlocale(LC_TIME, "spanish");
        $quincena = ucwords(strftime("%B")) . " 1 al 15 =$";
    } else {
        setlocale(LC_TIME, "spanish");
        $quincena = ucwords(strftime("%B")) . " 16 al " . $número . " =$";
    }

    require '../../../config.php';
    $emp_dao = new Empleado_DAO();
    $super_query = "SELECT SUM(TM.exe_novedad) AS total FROM (";
    $fin_query = ")AS TM";
    if (isset($_SESSION["adminlogi"])) {
//        echo json_encode($emp_dao->consultaEmpleadosQuincena($td_mens, $num_doc_mens, $fecha_ini, $fecha_fin));
    } elseif (isset($_SESSION["mensajero_logi"])) {
        $valor_json = json_encode($emp_dao->consultaEmpleadosQuincena($super_query, $_SESSION["tipo_doc"], $_SESSION["numero_doc"], $fecha_ini, $fecha_fin, $fin_query));
        $valor_dec = json_decode($valor_json);
        echo '<h5>' . $quincena . '<b class="text-primary">' . $valor_dec[0]->total . '</b></h5>';
    }
} else {
    header("location../");
}
