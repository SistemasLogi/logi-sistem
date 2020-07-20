<?php

if ($_POST) {
    require '../../../config.php';
    $estAEnv_dao = new Estado_aenv_DAO();
    echo json_encode($estAEnv_dao->consultaEstadoAEnv());
} else {
    header("location../");
}