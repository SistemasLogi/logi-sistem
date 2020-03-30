<?php

if ($_POST) {
    require '../../../config.php';
    $estEnv_dao = new Estado_env_DAO();
    echo json_encode($estEnv_dao->consultaEstadoEnv());
} else {
    header("location../");
}