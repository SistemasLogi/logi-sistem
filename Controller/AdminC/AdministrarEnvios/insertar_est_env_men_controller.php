<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");

if ($_POST) {
    require '../../../config.php';
    $es_x_env_dao = new Estado_x_env_DAO();
    $es_x_env_vo = new Estado_x_env_VO();

    $es_x_env_vo->setEnvio_id($_POST["inpNumEnv"]);
    $es_x_env_vo->setEst_env_id($_POST["inpEstado"]);
    $es_x_env_vo->setFecha_hora($fecha_hora_now);
    $es_x_env_vo->setNovedad($_POST["txaNovedad"]);
    $es_x_env_vo->setTd_mensajero($_SESSION["tipo_doc"]);
    $es_x_env_vo->setNum_doc_men($_SESSION["numero_doc"]);

    echo $es_x_env_dao->insertarEstado_x_envio_general($es_x_env_vo);
} else {
    header("location../");
}