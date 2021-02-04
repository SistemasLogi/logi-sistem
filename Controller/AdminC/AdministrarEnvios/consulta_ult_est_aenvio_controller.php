<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $est_aenv = new Est_x_aenv_DAO();
    if (isset($_SESSION["adminlogi"])) {
        echo json_encode($est_aenv->consulta_ultimo_est_alistamiento("", "AND (TM.esae_id != 3 AND TM.esae_id != 4)", ""));
    } elseif (isset($_SESSION["cliente_a"])) {
        echo json_encode($est_aenv->consulta_ultimo_est_alistamiento("", "AND (TM.esae_id != 3 AND TM.esae_id != 4) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"], ""));
    } elseif (isset($_SESSION["sucursal"])) {
        echo json_encode($est_aenv->consulta_ultimo_est_alistamiento_suc("", "AND (TM.esae_id != 3 AND TM.esae_id != 4) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"], " AND oxs.suc_num_id = " . $_SESSION["numero_suc"] . ""));
    }
} else {
    header("location../");
}