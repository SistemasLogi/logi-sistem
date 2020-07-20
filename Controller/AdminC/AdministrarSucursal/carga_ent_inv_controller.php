<?php
/**
 * Archivo de control de entrdas de inventario por archivo xlsx
 */
require '../../../config.php';

if ($_POST) {
    $nombre_fichero = $_FILES["inpFileMasInventario"]["name"];
    $num_sucursal = $_POST["inputSucNumId"];
//    $tipo_fichero = $_FILES["inpFileMasInventario"]["type"];
    $extension = pathinfo($nombre_fichero, PATHINFO_EXTENSION);
    if (move_uploaded_file($_FILES["inpFileMasInventario"]["tmp_name"], "../../../Files/Temp_inv/" . $nombre_fichero)) {

//        unlink("../../Archivos/Atento/" . $nombre_archivo);
        $exist_xls = "../../../Files/Temp_inv/" . $num_sucursal . ".xls";
        $exist_xlsx = "../../../Files/Temp_inv/" . $num_sucursal . ".xlsx";

        if (file_exists($exist_xls)) {
            unlink("../../../Files/Temp_inv/" . $num_sucursal . ".xls");
        }
        if (file_exists($exist_xlsx)) {
            unlink("../../../Files/Temp_inv/" . $num_sucursal . ".xlsx");
        }

        rename("../../../Files/Temp_inv/" . $nombre_fichero, "../../../Files/Temp_inv/" . $num_sucursal . "." . $extension);
        if ($extension == "xls") {
            echo 1;
        } elseif ($extension == "xlsx") {
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