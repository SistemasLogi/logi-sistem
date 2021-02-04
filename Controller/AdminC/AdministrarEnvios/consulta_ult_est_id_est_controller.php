<?php

session_start();

if ($_POST) {
    require '../../../config.php';
    $est_env = new Estado_x_env_DAO();
    if (isset($_SESSION["adminlogi"])) {

        $datos_cli = explode("|", $_POST["cliente_id"]);

        $tipo_doc = $datos_cli[0];
        $num_doc = $datos_cli[1];
        $suc_id = $_POST["sucursal_id"];

        if ($tipo_doc == '0' && $suc_id == '0') {
            echo json_encode($est_env->consulta_ultimo_est_envios("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", ""));
        } elseif ($tipo_doc == '0' && $suc_id != '0') {
            echo json_encode($est_env->consulta_ultimo_est_envios("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", ""));
        } elseif ($tipo_doc != '0' && $suc_id == '0') {
            echo json_encode($est_env->consulta_ultimo_est_envios("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND TM.exe_ee_id = " . $_POST["id_est_env"] . " AND cl.cli_td_id = " . $tipo_doc . " AND cl.cli_num_doc = " . $num_doc, ""));
        } elseif ($tipo_doc != '0' && $suc_id != '0') {
            echo json_encode($est_env->consulta_ultimo_est_envios_suc("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND TM.exe_ee_id = " . $_POST["id_est_env"] . " AND cl.cli_td_id = " . $tipo_doc . " AND cl.cli_num_doc = " . $num_doc, " AND oxs.suc_num_id = " . $suc_id . ""));
        }
    } elseif (isset($_SESSION["cliente_a"])) {

        $suc_id = $_POST["sucursal_id"];
        if ($suc_id == '0') {
            echo json_encode($est_env->consulta_ultimo_est_envios("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", ""));
        } else {
            echo json_encode($est_env->consulta_ultimo_est_envios_suc("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", " AND oxs.suc_num_id = " . $suc_id . ""));
        }
    } elseif (isset($_SESSION["sucursal"])) {
        echo json_encode($est_env->consulta_ultimo_est_envios_suc("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", " AND oxs.suc_num_id = " . $_SESSION["numero_suc"] . ""));
    }
} else {
    header("location../");
}
