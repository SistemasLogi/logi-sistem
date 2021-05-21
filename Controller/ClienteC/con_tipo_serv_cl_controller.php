<?php

if ($_POST) {
    require '../../config.php';
    $tipoServ_dao = new Tipo_serv_DAO();
    echo json_encode($tipoServ_dao->consultaTipoServCl());
} else {
    header("location../");
}
