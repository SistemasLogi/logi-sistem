<?php

if ($_POST) {
    require '../../../config.php';
    $est_env = new Estado_x_env_DAO();

    $porciones = explode("|", $_POST["fil"]);

    $tipo_d = $porciones[0];
    $num_d = $porciones[1];
    $est_id = 5; //asignado a mensajero estado en reparto

    echo json_encode($est_env->consultaEnv_x_Estado(" AND TM.exe_ee_id = " . $est_id . " AND TM.td_id_men = " . $tipo_d . " "
            . "AND TM.num_doc_men = " . $num_d . ";"));
} else {
    header("location../");
}