<?php

if ($_POST) {
    require '../../../config.php';
    $est_aenv_dao = new Estado_aenv_DAO();
    $est_aenv_vo = new Estado_aenv_VO();

    $cod_eaenv = $_POST["inpCodEstAEnv"];

    if (empty($cod_eaenv)) {
        $est_aenv_vo->setEst_aenv_id("null");
    } else {
        $est_aenv_vo->setEst_aenv_id($_POST["inpCodEstAEnv"]);
    }

    $est_aenv_vo->setEst_aenv_desc($_POST["inpDescEstAEnv"]);
    echo $est_aenv_dao->insertarAEstEnv($est_aenv_vo);
} else {
    header("location../");
}
