<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $ord_serv_dao = new Orden_serv_DAO();
    $ord_serv_vo = new Orden_serv_VO();

    $ord_serv_vo->setCod_ciudad($_POST["selectCiudad"]);
    $ord_serv_vo->setDireccion($_POST["inputDir"]);
    $ord_serv_vo->setPer_contacto($_POST["inputPerContacto"]);
    $ord_serv_vo->setTelefono($_POST["inputTele"]);
    $ord_serv_vo->setTipo_env_id($_POST["selectTipEnvio"]);
    $ord_serv_vo->setCli_docum($_POST["inputNumDocCli"]);
    $ord_serv_vo->setCli_id($_POST["inputTdCli"]);
    $ord_serv_vo->setNumero($_POST["inputNumOSAd"]);
    $ord_serv_vo->setTipo_serv_id($_POST["selectTipoServi"]);
    $ord_serv_vo->setObservacion($_POST["inputObservServ"]);

    echo $ord_serv_dao->actualizarOS($ord_serv_vo);
} else {
    header("location../");
}