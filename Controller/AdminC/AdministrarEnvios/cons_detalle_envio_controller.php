<?php

if ($_POST) {
    require '../../../config.php';
    $envio_dao = new Envio_DAO();

    echo json_encode($envio_dao->consultaDetalleEnvio($_POST["NumGuiaLogi"]));
} else {
    header("location../");
}