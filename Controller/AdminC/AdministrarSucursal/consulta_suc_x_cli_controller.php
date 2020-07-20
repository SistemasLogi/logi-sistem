<?php

if ($_POST) {
    require '../../../config.php';
    $sucursal_dao = new Sucursales_DAO();

    $porciones = explode("|", $_POST["selectCliente"]);

    $td_cli = $porciones[0];
    $num_cli = $porciones[1];

    echo json_encode($sucursal_dao->consultaSuc_x_num_cli($num_cli, $td_cli));
} else {
    header("location../");
}