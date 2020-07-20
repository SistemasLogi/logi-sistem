<?php

session_start();
require '../../config.php';

if ($_POST) {
    $nombre_fichero = $_FILES["inpFileMasEnvDoc"]["name"];
    $tipo_fichero = $_FILES["inpFileMasEnvDoc"]["type"];
    $extension = pathinfo($nombre_fichero, PATHINFO_EXTENSION);

    if (isset($_SESSION["adminlogi"])) {

        if (move_uploaded_file($_FILES["inpFileMasEnvDoc"]["tmp_name"], "../../Files/Temp_os_adm/" . $nombre_fichero)) {

//        unlink("../../Archivos/Atento/" . $nombre_archivo);
            $exist_csv = "../../Files/Temp_os_adm/" . $_SESSION["num_doc_cli_adm"] . "_" . $_SESSION["td_cli_adm"] . ".csv";
            $exist_xls = "../../Files/Temp_os_adm/" . $_SESSION["num_doc_cli_adm"] . "_" . $_SESSION["td_cli_adm"] . ".xls";
            $exist_xlsx = "../../Files/Temp_os_adm/" . $_SESSION["num_doc_cli_adm"] . "_" . $_SESSION["td_cli_adm"] . ".xlsx";
            if (file_exists($exist_csv)) {
                unlink("../../Files/Temp_os_adm/" . $_SESSION["num_doc_cli_adm"] . "_" . $_SESSION["td_cli_adm"] . ".csv");
            }
            if (file_exists($exist_xls)) {
                unlink("../../Files/Temp_os_adm/" . $_SESSION["num_doc_cli_adm"] . "_" . $_SESSION["td_cli_adm"] . ".xls");
            }
            if (file_exists($exist_xlsx)) {
                unlink("../../Files/Temp_os_adm/" . $_SESSION["num_doc_cli_adm"] . "_" . $_SESSION["td_cli_adm"] . ".xlsx");
            }

            rename("../../Files/Temp_os_adm/" . $nombre_fichero, "../../Files/Temp_os_adm/" . $_SESSION["num_doc_cli_adm"] . "_" . $_SESSION["td_cli_adm"] . "." . $extension);
            if ($extension == "csv") {
                echo 1;
            } elseif ($extension == "xls") {
                echo 2;
            } elseif ($extension == "xlsx") {
                echo 2;
            } else {
                echo "ARCHIVO NO COMPATIBLE";
            }
        } else {
            echo 3;
        }
    } else {
        if (move_uploaded_file($_FILES["inpFileMasEnvDoc"]["tmp_name"], "../../Files/Temp/" . $nombre_fichero)) {

//        unlink("../../Archivos/Atento/" . $nombre_archivo);
            $exist_csv = "../../Files/Temp/" . $_SESSION["numero_doc"] . "_" . $_SESSION["tipo_doc"] . ".csv";
            $exist_xls = "../../Files/Temp/" . $_SESSION["numero_doc"] . "_" . $_SESSION["tipo_doc"] . ".xls";
            $exist_xlsx = "../../Files/Temp/" . $_SESSION["numero_doc"] . "_" . $_SESSION["tipo_doc"] . ".xlsx";
            if (file_exists($exist_csv)) {
                unlink("../../Files/Temp/" . $_SESSION["numero_doc"] . "_" . $_SESSION["tipo_doc"] . ".csv");
            }
            if (file_exists($exist_xls)) {
                unlink("../../Files/Temp/" . $_SESSION["numero_doc"] . "_" . $_SESSION["tipo_doc"] . ".xls");
            }
            if (file_exists($exist_xlsx)) {
                unlink("../../Files/Temp/" . $_SESSION["numero_doc"] . "_" . $_SESSION["tipo_doc"] . ".xlsx");
            }

            rename("../../Files/Temp/" . $nombre_fichero, "../../Files/Temp/" . $_SESSION["numero_doc"] . "_" . $_SESSION["tipo_doc"] . "." . $extension);
            if ($extension == "csv") {
                echo 1;
            } elseif ($extension == "xls") {
                echo 2;
            } elseif ($extension == "xlsx") {
                echo 2;
            } else {
                echo "ARCHIVO NO COMPATIBLE";
            }
        } else {
            echo 3;
        }
    }
} else {
    header("location ../");
}