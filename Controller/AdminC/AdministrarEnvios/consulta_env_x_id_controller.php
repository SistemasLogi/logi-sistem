<?php

if ($_POST) {
    require '../../../config.php';
    $est_env = new Estado_x_env_DAO();

    $env_id = $_POST["env_id"];

    echo json_encode($est_env->consultaEnv_x_id($env_id));
} else {
    header("location../");
}