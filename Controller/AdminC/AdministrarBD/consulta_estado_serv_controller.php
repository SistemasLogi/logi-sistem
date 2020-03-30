<?php


if ($_POST) {
    require '../../../config.php';
    $estServ_dao = new Estado_serv_DAO();
    echo json_encode($estServ_dao->consultaEstadoServ());
} else {
    header("location../");
}