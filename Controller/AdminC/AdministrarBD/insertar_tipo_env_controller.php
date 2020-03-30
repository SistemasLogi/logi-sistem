<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $tipo_env_dao = new Tipo_envio_DAO();
    $tipo_env_vo = new Tipo_envio_VO();

    $cod_env = $_POST["inpCodTipoEnv"];

    if (empty($cod_env)) {
        $tipo_env_vo->setCod_env("null");
    } else {
        $tipo_env_vo->setCod_env($_POST["inpCodTipoEnv"]);
    }

    $tipo_env_vo->setEnv_desc($_POST["inpNomEnv"]);
    echo $tipo_env_dao->insertarTipoEnv($tipo_env_vo);
} else {
    header("location../");
}
