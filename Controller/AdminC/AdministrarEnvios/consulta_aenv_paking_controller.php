<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $est_x_alist_env_dao = new Est_x_aenv_DAO();
    $estado = 2;

    echo json_encode($est_x_alist_env_dao->consulta_aenv_hist_est("AND TM.esae_id = " . $estado . ""));
} else {
    header("location../");
}