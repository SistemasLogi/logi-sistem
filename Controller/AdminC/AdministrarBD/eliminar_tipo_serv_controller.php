<?php

if ($_POST) {
    require '../../../config.php';
    $tipoServ_dao = new Tipo_serv_DAO();

    echo $tipoServ_dao->elimTipoServ($_POST["inpCodTipoServ"]);
} else {
    header("location../");
}
