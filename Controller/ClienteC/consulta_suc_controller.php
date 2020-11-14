<?php

session_start();
if ($_POST) {
    require '../../config.php';
    $sucursal_dao = new Sucursales_DAO();

    $td_cli = $_SESSION["tipo_doc"];
    $num_cli = $_SESSION["numero_doc"];

    echo json_encode($sucursal_dao->consultaSuc_x_num_cli($num_cli, $td_cli));
} else {
    header("location../");
}