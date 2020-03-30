<?php

if ($_POST) {
    require '../../../config.php';
    $est_env_dao = new Estado_env_DAO();
    $est_env_vo = new Estado_env_VO();

    $cod_eenv = $_POST["inpCodEstEnv"];

    if (empty($cod_eenv)) {
        $est_env_vo->setCod_es_env("null");
    } else {
        $est_env_vo->setCod_es_env($_POST["inpCodEstEnv"]);
    }

    $est_env_vo->setDesc_es_env($_POST["inpDescEstEnv"]);
    echo $est_env_dao->insertarEstEnv($est_env_vo);
} else {
    header("location../");
}
