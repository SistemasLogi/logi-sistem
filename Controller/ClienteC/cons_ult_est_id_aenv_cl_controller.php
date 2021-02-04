<?php

session_start();

if ($_POST) {
    require '../../config.php';
    $est_aenv = new Est_x_aenv_DAO();

    $fecha_ini = $_POST["fech_ini"];
    $fecha_fin = $_POST["fech_fin"];
    $estado_env = $_POST["est_env"];

    if (isset($_SESSION["adminlogi"])) {
        echo json_encode($est_aenv->consulta_ultimo_est_alistamiento(" AND T1.exae_fecha_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "'", "AND TM.esae_id = " . $estado_env, ""));
    } elseif (isset($_SESSION["cliente_a"])) {
        echo json_encode($est_aenv->consulta_ultimo_est_alistamiento(" AND T1.exae_fecha_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "'", "AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND TM.esae_id = " . $estado_env, ""));
    } elseif (isset($_SESSION["sucursal"])) {
        echo json_encode($est_aenv->consulta_ultimo_est_alistamiento_suc(" AND T1.exae_fecha_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "'", "AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND TM.esae_id = " . $estado_env, " AND oxs.suc_num_id = " . $_SESSION["numero_suc"] . ""));
    }
} else {
    header("location../");
}