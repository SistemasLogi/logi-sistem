<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $est_env = new Estado_x_env_DAO();
    if (isset($_SESSION["adminlogi"])) {
        echo json_encode($est_env->consulta_ultimo_est_envios("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND TM.exe_ee_id = " . $_POST["id_est_env"] . "",""));
    } elseif (isset($_SESSION["cliente_a"])) {
        echo json_encode($est_env->consulta_ultimo_est_envios("", "AND (TM.exe_ee_id != 6 AND TM.exe_ee_id != 7 AND TM.exe_ee_id != 11) AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND TM.exe_ee_id = " . $_POST["id_est_env"] . "",""));
    }
} else {
    header("location../");
}
