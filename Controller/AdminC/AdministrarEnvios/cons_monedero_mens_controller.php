<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");


$date = strtotime($fecha_hora_now);
$anio = date("Y", $date); // Year (2003)
$mes = date("m", $date); // Month (12)
$dia = date("d", $date); // day (14) 

$número = cal_days_in_month(CAL_GREGORIAN, $mes, $anio); // 31

if ($dia < 15) {
    setlocale(LC_TIME, "spanish");
    $quincena = ucwords(strftime("%B")) . " 1 al 15 =";
} else {
    setlocale(LC_TIME, "spanish");
    $quincena = ucwords(strftime("%B")) . " 16 al " . $número . " =";
}
