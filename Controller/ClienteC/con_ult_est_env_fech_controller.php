<?php

session_start();
if ($_POST) {
    require '../../config.php';
    $est_env = new Estado_x_env_DAO();

    $fecha_ini = $_POST["inputFechIni"];
    $fecha_fin = $_POST["inputFechFin"];

    echo json_encode($est_env->consulta_ultimo_est_envios("AND T1.exe_fec_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "'", "AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"],""));
} else {
    header("location../");
}

