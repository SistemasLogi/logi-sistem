<?php

if ($_POST) {
    require '../../../config.php';
    $est_env = new Estado_x_env_DAO();

//    $tipo_d = 1; //predeterminado Logi
//    $num_d = 162534495867; //Mensajero Logi
//    $est_id = 3; //programado

    echo json_encode($est_env->consultaEnv_x_Estado(" AND (TM.exe_ee_id = 1 || TM.exe_ee_id = 2 || TM.exe_ee_id = 8 || TM.exe_ee_id = 10);"));
} else {
    header("location../");
}