<?php

if ($_POST) {
    require '../../../config.php';
    $tipoEnvio_dao = new Tipo_envio_DAO();

    echo $tipoEnvio_dao->elimTipoEnv($_POST["inpCodTipoEnv"]);
} else {
    header("location../");
}
