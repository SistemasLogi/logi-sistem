<?php

if ($_POST) {
    require '../../../config.php';
    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");
    $es_x_env_dao = new Estado_x_env_DAO();
    $es_x_env_vo = new Estado_x_env_VO();

    $porciones = explode("|", $_POST["selectMensajero"]);

    $es_x_env_vo->setEnvio_id($_POST["inputNumEnvi"]);
    $es_x_env_vo->setEst_env_id($_POST["selectEstado"]);
    $es_x_env_vo->setFecha_hora($fecha_hora);
    $es_x_env_vo->setNovedad($_POST["txaNovedadEstado"]);
    $es_x_env_vo->setTd_mensajero($porciones[0]);
    $es_x_env_vo->setNum_doc_men($porciones[1]);

    echo $es_x_env_dao->insertarEstado_x_envio_general($es_x_env_vo);
} else {
    header("location../");
}