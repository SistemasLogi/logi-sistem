<?php

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');

if ($_POST) {
    require '../../../config.php';
    $est_x_aenv_dao = new Est_x_aenv_DAO();
    $est_x_aenv_vo = new Est_x_aenv_VO();

    $est_x_aenv_vo->setId_aenv($_POST["guia"]);
    $est_x_aenv_vo->setId_est_aenv($_POST["estado"]);
    $est_x_aenv_vo->setExae_fecha_hora($fecha_hora_now);
    $est_x_aenv_vo->setExae_novedad($_POST["novedad"]);

    echo $est_x_aenv_dao->insertarEstados_x_AEnv_obj($est_x_aenv_vo);
} else {
    header("location../");
}