<?php

if ($_POST) {
    require '../../../config.php';
    $tipoEnv_dao = new Tipo_envio_DAO();
    echo json_encode($tipoEnv_dao->consultaTipoEnv());
} else {
    header("location../");
}