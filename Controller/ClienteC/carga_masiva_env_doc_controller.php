<?php

require '../../config.php';

if ($_POST) {
    $nombre_fichero = $_FILES["txtnameMasivoEmp"]["name"];
    $tipo_fichero = $_FILES["txtnameMasivoEmp"]["type"];
    if (move_uploaded_file($_FILES["inpFileMasEnvDoc"]["tmp_name"], "../../Files/Temp/" . $nombre_fichero)) {
        echo 1;
    } else {
        echo 2;
    }
} else {
    header("location ../");
}