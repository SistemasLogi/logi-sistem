<?php

session_start();
require '../../config.php';

if ($_POST) {
    $nombre_fichero = $_FILES["inpFileMasEnvDoc"]["name"];
    $tipo_fichero = $_FILES["inpFileMasEnvDoc"]["type"];
    $extension = pathinfo($nombre_fichero, PATHINFO_EXTENSION);
    if (move_uploaded_file($_FILES["inpFileMasEnvDoc"]["tmp_name"], "../../Files/Temp/" . $nombre_fichero)) {
        $orden_servi_dao = new Orden_serv_DAO();
        $json_ultima_os = json_encode($orden_servi_dao->consultaUltimaOS($_SESSION["tipo_doc"], $_SESSION["numero_doc"]));
        $array = json_decode($json_ultima_os);

        $id_os_cliente = $array[0]->os_id;
        rename("../../Files/Temp/" . $nombre_fichero, "../../Files/Temp/" . $_SESSION["numero_doc"] . "_" . $id_os_cliente . "." . $extension);
        echo $extension;
    } else {
        echo 2;
    }
} else {
    header("location ../");
}