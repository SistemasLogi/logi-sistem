<?php

if ($_POST) {
    require '../../../config.php';
    $envio_dao = new Envio_DAO();

    echo json_encode($envio_dao->consultaInfoEnviosOS_no_detalle($_POST["num_os"]));
} else {
    header("location../");
}