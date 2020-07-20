<?php

if ($_POST) {
    require '../../../config.php';
    $sucursal_dao = new Sucursales_DAO();

    echo json_encode($sucursal_dao->consultaGeneral_suc());
} else {
    header("location../");
}