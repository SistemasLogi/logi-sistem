<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $est_x_env = new Estado_x_env_DAO();
    if (isset($_SESSION["adminlogi"])) {
        echo json_encode($est_x_env->consulta_seguimiento_env_x_id("AND e.en_id = " . $_POST["inpBuscaNumEnv"]));
    } elseif (isset($_SESSION["cliente_a"])) {
//        echo json_encode($os_serv->consultaSeguimientoEstadoOS($_POST["inpBuscaNumOS"] . " AND o.cli_td_id = " . $_SESSION["tipo_doc"] . " AND o.cli_num_doc = " . $_SESSION["numero_doc"] . ""));
    }
} else {
    header("location../");
}