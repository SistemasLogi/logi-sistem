<?php

//session_start();

require '../../../config.php';

if ($_POST) {

    $nombre_fichero = $_FILES["inpFileMasAlist"]["name"];
//    $_SESSION["dash_fech_alst"] = $_POST["inputDateAlist"];
//    $_SESSION["dash_doc_cli"] = $_POST["inputNumDocCli"];
//    $_SESSION["dash_td_cli"] = $_POST["inputTdCli"];
//    $_SESSION["dash_num_suc"] = $_POST["inputNumSuc"];
//    $_SESSION["dash_ciu_id"] = $_POST["inputCiuId"];
//    $_SESSION["dash_ts_id"] = $_POST["inputTipoServ"];
//    $_SESSION["dash_te_id"] = $_POST["inputTipoEnv"];
//    $_SESSION["dash_os_num"] = $_POST["inputNumOrd"];

    $fecha_input = $_POST["inputDateAlist"];
    $num_doc_cli = $_POST["inputNumDocCli"];
    $td_cli = $_POST["inputTdCli"];
    $num_suc = $_POST["inputNumSuc"];
    $ciu_id = $_POST["inputCiuId"];
    $serv_id = $_POST["inputTipoServ"];
    $env_id = $_POST["inputTipoEnv"];
    $os_num = $_POST["inputNumOrd"];


    if (empty($_POST["inputNumSuc"])) {
        $name_xlsx = $num_doc_cli . '_' . $td_cli;
//        $_SESSION["name_xlsx"] = $name_xlsx;
    } else {
        $name_xlsx = $num_doc_cli . '_' . $td_cli . '_' . $num_suc;
//        $_SESSION["name_xlsx"] = $name_xlsx;
    }

    $name_directorio = $num_doc_cli . '_' . $td_cli;

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
//            echo 1;

            require './leer_xlsx_alist_v3_controller.php';
        } else {
            echo "ARCHIVO NO COMPATIBLE";
        }
    } else {
        echo 3;
    }
} else {
    header("location ../");
}