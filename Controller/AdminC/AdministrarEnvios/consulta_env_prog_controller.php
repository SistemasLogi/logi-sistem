<?php

if ($_POST) {
    require '../../../config.php';
    $est_env = new Estado_x_env_DAO();

    $tipo_d = 1; //predeterminado Logi
    $num_d = 162534495867; //Mensajero Logi
    $est_id = 3; //programado

    echo json_encode($est_env->consultaEnv_x_Estado(" AND TM.exe_ee_id < " . $est_id . " AND TM.td_id_men = " . $tipo_d . " AND TM.num_doc_men = " . $num_d . ";"));
} else {
    header("location../");
}