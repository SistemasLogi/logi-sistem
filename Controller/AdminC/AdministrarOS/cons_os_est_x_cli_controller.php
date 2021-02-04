<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
session_start();
if ($_POST) {
    require '../../../config.php';
    $est_os = new Est_x_serv_DAO();

    if (isset($_SESSION["adminlogi"])) {

        $porciones = explode("|", $_POST["fil"]);

        $tipo_d = $porciones[0];
        $num_d = $porciones[1];

        echo json_encode($est_os->consultaUltimoEstadoOS(" AND ord.cli_td_id = " . $tipo_d . " AND ord.cli_num_doc = " . $num_d . " ORDER BY ord.os_id DESC;"));
    } elseif (isset($_SESSION["cliente_a"])) {
        echo json_encode($est_os->consultaUltimoEstadoOS(" AND ord.cli_td_id = " . $_SESSION["tipo_doc"] . " AND ord.cli_num_doc = " . $_SESSION["numero_doc"] . " ORDER BY ord.os_id DESC;"));
    } elseif (isset($_SESSION["sucursal"])) {
        echo json_encode($est_os->consultaUltimoEstadoOS(" AND ord.cli_td_id = " . $_SESSION["tipo_doc"] . " AND ord.cli_num_doc = " . $_SESSION["numero_doc"] . " AND ord.os_id IN (SELECT osu.os_id FROM os_x_suc AS osu WHERE osu.suc_num_id = " . $_SESSION["numero_suc"] . ") ORDER BY ord.os_id DESC;"));
    }
} else {
    header("location../");
}

