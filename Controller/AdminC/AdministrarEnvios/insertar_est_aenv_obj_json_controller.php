<?php

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');

if ($_POST) {
    require '../../../config.php';
    $est_x_aenv_dao = new Est_x_aenv_DAO();
    $est_x_aenv_vo = new Est_x_aenv_VO();

    $datos_est_aenv = $_POST["dat_aenv"];
    $objetophp = json_decode($datos_est_aenv);

    $sql_est_aenv = "INSERT INTO est_x_aenv VALUES "; //cabecera del insert
    $reg_est_aenv = "";

    for ($i = 0; $i < count($objetophp); $i++) {

        $aenv_id = $objetophp[$i]->id_aenv;
        $est_id = $objetophp[$i]->id_est;
        $novedad = $objetophp[$i]->nov;


        $reg_est_aenv .= "(" . $aenv_id . ", " . $est_id . ", "
                . "'" . $fecha_hora_now . "', '" . $novedad . "'),";
    }

    $reg_total_est = trim($reg_est_aenv, ",");
    $reg_total_est .= ";";

    $est_x_aenv_dao->insertarBloqueEnTablaEstadosAenv($sql_est_aenv . $reg_total_est);
} else {
    header("location../");
}