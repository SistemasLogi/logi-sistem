<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $est_x_env = new Estado_x_env_DAO();
    if (isset($_SESSION["adminlogi"])) {
        echo json_encode($est_x_env->consulta_seguimiento_env_x_id("AND e.en_guia = " . $_POST["inpBuscaEnvGuiaOp"]));
    } elseif (isset($_SESSION["cliente_a"])) {
        echo json_encode($est_x_env->consulta_seguimiento_env_x_id("AND e.en_guia = " . $_POST["inpBuscaEnvGuiaOp"] . " AND c.cli_td_id = " . $_SESSION["tipo_doc"] . " AND c.cli_num_doc = " . $_SESSION["numero_doc"]));
    } elseif (isset($_SESSION["sucursal"])) {
        echo json_encode($est_x_env->consulta_seguimiento_env_x_id("AND e.en_guia = " . $_POST["inpBuscaEnvGuiaOp"] . " "
                . "AND c.cli_td_id = " . $_SESSION["tipo_doc"] . " AND c.cli_num_doc = " . $_SESSION["numero_doc"] . " "
                . "AND e.os_id IN (SELECT osu.os_id FROM os_x_suc AS osu WHERE osu.suc_num_id = " . $_SESSION["numero_suc"] . ")"));
    }
} else {
    header("location../");
}