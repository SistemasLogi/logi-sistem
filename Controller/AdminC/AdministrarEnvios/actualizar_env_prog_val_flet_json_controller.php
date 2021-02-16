<?php

if ($_POST) {
    require '../../../config.php';
    $est_x_envio_dao = new Estado_x_env_DAO();

    $datos_env = $_POST["datos"];

    $objetophp = json_decode($datos_env);

    for ($i = 0; $i < count($objetophp); $i++) {
        $env_id = $objetophp[$i]->id_env;
        $est_id = $objetophp[$i]->id_est;
        $fecha_est = $objetophp[$i]->fech;
        $novedad = $objetophp[$i]->nov;

        $est_x_envio_dao->actualizaNovedad_env($env_id, $est_id, $fecha_est, $novedad);
        
    }

//    echo $est_x_envio_dao->actualizaNovedad_env($guia, $estado, $fecha, $novedad);
} else {
    header("location../");
}