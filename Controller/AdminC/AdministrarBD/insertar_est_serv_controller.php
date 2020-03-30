<?php

if ($_POST) {
    require '../../../config.php';
    $est_serv_dao = new Estado_serv_DAO();
    $est_serv_vo = new Estado_serv_VO();

    $cod_eserv = $_POST["inpCodEstServ"];

    if (empty($cod_eserv)) {
        $est_serv_vo->setCod_estado_serv("null");
    } else {
        $est_serv_vo->setCod_estado_serv($_POST["inpCodEstServ"]);
    }

    $est_serv_vo->setDesc_estado_serv($_POST["inpDescEstServ"]);
    echo $est_serv_dao->insertarEstServ($est_serv_vo);
} else {
    header("location../");
}
