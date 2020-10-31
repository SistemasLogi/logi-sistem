<?php

if ($_POST) {
    require '../../../config.php';
    $est_x_envio_dao = new Estado_x_env_DAO();

    $guia = $_POST["guia"];
    $estado = $_POST["estado"];
    $fecha = $_POST["fecha"];
    $novedad = $_POST["novedad"];

    echo $est_x_envio_dao->actualizaNovedad_env($guia, $estado, $fecha, $novedad);
} else {
    header("location../");
}