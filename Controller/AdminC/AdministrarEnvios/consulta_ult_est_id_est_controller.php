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
        $fecha_inicio = $_POST["ini_fecha"];
        $fecha_final = $_POST["fin_fecha"];

        $hora_desde = '00:00:00';
        $hora_hasta = '23:59:00';

        if ($suc_id == '0') {
            if ($fecha_inicio == '' || $fecha_final == '') {
                echo json_encode($est_env->consulta_ultimo_est_envios("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", ""));
            } else {
                $fecha_ini = $fecha_inicio . " " . $hora_desde;
                $fecha_fin = $fecha_final . " " . $hora_hasta;

                echo json_encode($est_env->consulta_ultimo_est_envios("", "AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND o.os_id = ess.os_id AND ess.exs_fecha_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "' AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", ""));
            }
        } else {

            if ($fecha_inicio == '' || $fecha_final == '') {
                echo json_encode($est_env->consulta_ultimo_est_envios_suc("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", " AND oxs.suc_num_id = " . $suc_id . ""));
            } else {
                $fecha_ini = $fecha_inicio . " " . $hora_desde;
                $fecha_fin = $fecha_final . " " . $hora_hasta;

                echo json_encode($est_env->consulta_ultimo_est_envios_suc("", "AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND o.os_id = ess.os_id AND ess.exs_fecha_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "' AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", " AND oxs.suc_num_id = " . $suc_id . ""));
            }
        }
    } elseif (isset($_SESSION["sucursal"])) {
        echo json_encode($est_env->consulta_ultimo_est_envios_suc("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND TM.exe_ee_id = " . $_POST["id_est_env"] . "", " AND oxs.suc_num_id = " . $_SESSION["numero_suc"] . ""));
    }
} else {
    header("location../");
}
