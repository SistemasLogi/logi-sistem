<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");
    $es_x_serv_dao = new Est_x_serv_DAO();
    $es_x_serv_vo = new Est_x_serv_VO();


    $es_x_serv_vo->setOrden_id($_POST["inpEstOrdServ"]);
    $es_x_serv_vo->setEstado_id($_POST["inpEstado"]);
    $es_x_serv_vo->setFecha_hora($fecha_hora);
    $es_x_serv_vo->setNovedad($_POST["txaNovedad"]);
    $es_x_serv_vo->setTd_mensajero($_SESSION["tipo_doc"]);
    $es_x_serv_vo->setNum_doc_mensajero($_SESSION["numero_doc"]);

    echo $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
} else {
    header("location../");
}