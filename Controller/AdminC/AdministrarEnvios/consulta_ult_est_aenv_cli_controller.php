<?php

session_start();

if ($_POST) {
    require '../../../config.php';
    $est_aenv = new Est_x_aenv_DAO();
    if (isset($_SESSION["adminlogi"])) {

        $datos_cli = explode("|", $_POST["cliente_id"]);

        $tipo_doc = $datos_cli[0];
        $num_doc = $datos_cli[1];
        $suc_id = $_POST["sucursal_id"];

        if ($tipo_doc == '0' && $suc_id == '0') {
            echo json_encode($est_aenv->consulta_ultimo_est_alistamiento("", "AND (TM.esae_id != 3 AND TM.esae_id != 4)", ""));
        } elseif ($tipo_doc == '0' && $suc_id != '0') {
            echo json_encode($est_aenv->consulta_ultimo_est_alistamiento("", "AND (TM.esae_id != 3 AND TM.esae_id != 4)", ""));
        } elseif ($tipo_doc != '0' && $suc_id == '0') {
            echo json_encode($est_aenv->consulta_ultimo_est_alistamiento("", "AND (TM.esae_id != 3 AND TM.esae_id != 4) AND cl.cli_td_id = " . $tipo_doc . " AND cl.cli_num_doc = " . $num_doc, ""));
        } elseif ($tipo_doc != '0' && $suc_id != '0') {
            echo json_encode($est_aenv->consulta_ultimo_est_alistamiento_suc("", "AND (TM.esae_id != 3 AND TM.esae_id != 4) AND cl.cli_td_id = " . $tipo_doc . " AND cl.cli_num_doc = " . $num_doc, " AND oxs.suc_num_id = " . $suc_id . ""));
        }
    } elseif (isset($_SESSION["cliente_a"])) {

        $suc_id = $_POST["sucursal_id"];
        if ($suc_id == '0') {
            echo json_encode($est_aenv->consulta_ultimo_est_alistamiento("", "AND (TM.esae_id != 3 AND TM.esae_id != 4) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . "", ""));
        } else {
            echo json_encode($est_aenv->consulta_ultimo_est_alistamiento_suc("", "AND (TM.esae_id != 3 AND TM.esae_id != 4) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . "", " AND oxs.suc_num_id = " . $suc_id . ""));
        }
    } elseif (isset($_SESSION["sucursal"])) {
        echo json_encode($est_aenv->consulta_ultimo_est_alistamiento_suc("", "AND (TM.esae_id != 3 AND TM.esae_id != 4) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . "", " AND oxs.suc_num_id = " . $_SESSION["numero_suc"] . ""));
    }
} else {
    header("location../");
}