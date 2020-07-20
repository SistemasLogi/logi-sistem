<?php

if ($_POST) {
    require '../../../config.php';
    $cliente_dao = new Cliente_DAO();

    $porciones = explode("|", $_POST["selectCliente"]);

    $td_cli = $porciones[0];
    $num_cli = $porciones[1];

    echo json_encode($cliente_dao->consultarCliente_x_ident($td_cli, $num_cli));
} else {
    header("location../");
}