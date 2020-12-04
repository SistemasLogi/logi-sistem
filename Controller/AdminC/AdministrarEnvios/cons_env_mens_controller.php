<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');
$hora_desde = "07:00:00";
$hora_hasta = "23:30:00";

if ($_POST) {
    require '../../../config.php';
    $est_env = new Estado_x_env_DAO();
    if (isset($_SESSION["adminlogi"])) {
        echo json_encode($est_env->consulta_ultimo_est_envios("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND TM.exe_ee_id = " . $_POST["id_est_env"] . ""));
    } elseif (isset($_SESSION["mensajero_logi"])) {
        echo json_encode($est_env->consulta_ultimo_est_envios("", "AND ((TM.exe_ee_id = 6 || TM.exe_ee_id = 5 || TM.exe_ee_id = 8) AND TM.td_id_men = " . $_SESSION["tipo_doc"] . " AND TM.num_doc_men = " . $_SESSION["numero_doc"] . " TM.exe_fec_hora  BETWEEN '" . $fech_solo . " " . $hora_desde . "' AND '" . $fech_solo . " " . $hora_hasta . "')"));
    }
} else {
    header("location../");
}