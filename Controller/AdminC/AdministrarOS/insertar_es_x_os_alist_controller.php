<?php

if ($_POST) {
    require '../../../config.php';
    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");
    $es_x_serv_dao = new Est_x_serv_DAO();
    $es_x_serv_vo = new Est_x_serv_VO();

    $es_x_serv_vo->setOrden_id($_POST["os_num"]);
    $es_x_serv_vo->setEstado_id($_POST["estado"]);
    $es_x_serv_vo->setFecha_hora($fecha_hora);
    $es_x_serv_vo->setNovedad("");
    $es_x_serv_vo->setTd_mensajero(1);
    $es_x_serv_vo->setNum_doc_mensajero(9874123652);

    echo $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
} else {
    header("location../");
}