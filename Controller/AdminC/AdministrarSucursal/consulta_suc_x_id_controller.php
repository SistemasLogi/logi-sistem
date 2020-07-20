<?php

if ($_POST) {
    require '../../../config.php';
    $sucursal_dao = new Sucursales_DAO();

    $id_suc = $_POST["selectSuc_x_Cli"];

    echo json_encode($sucursal_dao->consultaSuc_x_num($id_suc));
} else {
    header("location../");
}