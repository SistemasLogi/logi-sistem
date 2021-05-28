<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if ($_POST) {
    require '../../../config.php';
    $envio_dao = new Envio_DAO();
    $envio_vo = new Envio_VO();

    $ord_serv_dao = new Orden_serv_DAO();
    $ord_serv_vo = new Orden_serv_VO();

    $ord_serv_vo->setCod_ciudad($_POST["selectCiuRemite"]);
    $ord_serv_vo->setDireccion($_POST["inputDirRemite"]);
    $ord_serv_vo->setTelefono($_POST["inputTeleRemite"]);
    $ord_serv_vo->setTipo_env_id($_POST["selectTipoEnvi"]);
    $ord_serv_vo->setTipo_serv_id($_POST["selectTipoServi"]);
    $ord_serv_vo->setObservacion($_POST["inputObservServi"]);
    $ord_serv_vo->setNumero($_POST["inputNumOs"]);



    $envio_vo->setId_envio($_POST["inputNumGuiaLogi"]);
    if (is_numeric($_POST["inputGuiaOp"])) {
        $envio_vo->setNum_guia($_POST["inputGuiaOp"]);
    } else {
        $envio_vo->setNum_guia(0);
    }
    $envio_vo->setNombre($_POST["inputNombreDestino"]);
    $envio_vo->setDireccion($_POST["inputDirDestino"]);
    $envio_vo->setTelefono($_POST["inputTeleDestino"]);
    $envio_vo->setCiudad_dest($_POST["inputCiudDestino"]);
    $envio_vo->setDepto_dest($_POST["inputDptoDestino"]);
    $envio_vo->setNovedad($_POST["inputObservEnvio"]);
    $envio_vo->setContenido($_POST["inputContenido"]);
    if (is_numeric($_POST["inputValorDecl"])) {
        $envio_vo->setValor_declarado($_POST["inputValorDecl"]);
    } else {
        $envio_vo->setValor_declarado(0);
    }
    if (is_numeric($_POST["inputRecaudo"])) {
        $envio_vo->setRecaudo($_POST["inputRecaudo"]);
    } else {
        $envio_vo->setRecaudo(0);
    }
    if (is_numeric($_POST["inputValPago"])) {
        $envio_vo->setValor_pago($_POST["inputValPago"]);
    } else {
        $envio_vo->setValor_pago(0);
    }


    if ($ord_serv_dao->actualizarOS_edit_env($ord_serv_vo) == 1) {
        if ($envio_dao->actualizarEnvio($envio_vo) == 1) {
            echo 1;
        } else {
            echo 'error 2 al actualizar envio';
        }
    } else {
        echo 'error 3 al actualizar os';
    }
} else {
    header("location../");
}