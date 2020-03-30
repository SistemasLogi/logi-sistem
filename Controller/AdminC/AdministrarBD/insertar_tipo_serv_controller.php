<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $tipo_serv_dao = new Tipo_serv_DAO();
    $tipo_serv_vo = new Tipo_serv_VO();

    $cod_serv = $_POST["inpCodTipoServ"];

    if (empty($cod_serv)) {
        $tipo_serv_vo->setCod_serv("null");
    } else {
        $tipo_serv_vo->setCod_serv($_POST["inpCodTipoServ"]);
    }

    $tipo_serv_vo->setNom_serv($_POST["inpNomServ"]);
    echo $tipo_serv_dao->insertarTipoServ($tipo_serv_vo);
} else {
    header("location../");
}
