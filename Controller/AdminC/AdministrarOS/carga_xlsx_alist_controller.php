<?php

session_start();

require '../../../config.php';

if ($_POST) {
    $nombre_fichero = $_FILES["inpFileMasAlist"]["name"];
    $_SESSION["num_doc_cli_adm_alst"] = $_POST["inputNumDocCl"];
    $_SESSION["td_cli_adm_alst"] = $_POST["inputTDocCli"];
    $_SESSION["fecha_adm_alst"] = $_POST["inputDateAlist"];
    $_SESSION["direccion_adm_alst"] = $_POST["inputDir"];
    $_SESSION["tel_adm_alst"] = $_POST["inputTele"];

    $_SESSION["num_suc_adm_alst"] = $_POST["inputNumSucu"];

    if (empty($_POST["inputNumSucu"])) {
        $name_xlsx = $_SESSION["num_doc_cli_adm_alst"] . '_' . $_SESSION["td_cli_adm_alst"];
        $_SESSION["name_xlsx"] = $name_xlsx;
    } else {
        $name_xlsx = $_SESSION["num_doc_cli_adm_alst"] . '_' . $_SESSION["td_cli_adm_alst"] . '_' . $_SESSION["num_suc_adm_alst"];
        $_SESSION["name_xlsx"] = $name_xlsx;
    }

    $name_directorio = $_SESSION["num_doc_cli_adm_alst"] . '_' . $_SESSION["td_cli_adm_alst"];

//    $tipo_fichero = $_FILES["inpFileMasInventario"]["type"];
    $extension = pathinfo($nombre_fichero, PATHINFO_EXTENSION);


    //Crear carpeta por cliente para temporal de xlsx alistamiento
    $directorioAlist = '../../../Files/Temp_alist_adm/' . $name_directorio . '/';
    if (!file_exists($directorioAlist)) {
        mkdir($directorioAlist, 0777, true);
    }

    if (move_uploaded_file($_FILES["inpFileMasAlist"]["tmp_name"], "../../../Files/Temp_alist_adm/" . $name_directorio . "/" . $nombre_fichero)) {

        $exist_xlsx = "../../../Files/Temp_alist_adm/" . $name_directorio . "/" . $name_xlsx . ".xlsx";

        if (file_exists($exist_xlsx)) {
            unlink("../../../Files/Temp_alist_adm/" . $name_directorio . "/" . $name_xlsx . ".xlsx");
        }

        rename("../../../Files/Temp_alist_adm/" . $name_directorio . "/" . $nombre_fichero, "../../../Files/Temp_alist_adm/" . $name_directorio . "/" . $name_xlsx . "." . $extension);
        if ($extension == "xlsx") {
            echo 1;
        } else {
            echo "ARCHIVO NO COMPATIBLE";
        }
    } else {
        echo 3;
    }
} else {
    header("location ../");
}