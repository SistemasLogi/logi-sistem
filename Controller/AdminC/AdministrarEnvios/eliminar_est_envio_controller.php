<?php

if ($_POST) {
    require '../../../config.php';
    $est_x_env_dao = new Estado_x_env_DAO();

    $envio_id = $_POST["inputEnvId"];
    $estado_id = $_POST["inputEstId"];
    $fecha_est = $_POST["inputFechaEst"];

    echo $est_x_env_dao->eliminar_est_env($envio_id, $estado_id, $fecha_est);
} else {
    header("location../");
}