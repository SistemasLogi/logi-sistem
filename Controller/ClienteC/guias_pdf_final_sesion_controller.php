<?php

if (isset($_SESSION["adminlogi"])) {
    //Crear carpeta por usuario para Guias en pdf
    $directorioGuias_pdf = '../../Files/GuiasPDF_temp_adm/' . $_SESSION["num_doc_cli_adm"] . '_' . $_SESSION["td_cli_adm"] . '/';
    if (!file_exists($directorioGuias_pdf)) {
        mkdir($directorioGuias_pdf, 0777, true);
    }
//elimina el contenido en carpeta imagenes QR existente
    $filesGuias = glob($directorioGuias_pdf . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesGuias as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//elimina el contenido en carpeta imagenes QR existente
    $filesQR_Del = glob($directorioQR . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesQR_Del as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//elimina el contenido en carpeta imagenes Barras existente
    $filesBar_Del = glob($directorioBar . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesBar_Del as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

    $file_pdf_name = $directorioGuias_pdf . $_SESSION["num_doc_cli_adm"] . '.pdf';

    $pdf->Output($file_pdf_name, 'F');
} else {
    //Crear carpeta por usuario para Guias en pdf
    $directorioGuias_pdf = '../../Files/GuiasPDF_temp/' . $_SESSION["numero_doc"] . '_' . $_SESSION["tipo_doc"] . '/';
    if (!file_exists($directorioGuias_pdf)) {
        mkdir($directorioGuias_pdf, 0777, true);
    }
//elimina el contenido en carpeta imagenes QR existente
    $filesGuias = glob($directorioGuias_pdf . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesGuias as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//elimina el contenido en carpeta imagenes QR existente
    $filesQR_Del = glob($directorioQR . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesQR_Del as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//elimina el contenido en carpeta imagenes Barras existente
    $filesBar_Del = glob($directorioBar . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesBar_Del as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

    $file_pdf_name = $directorioGuias_pdf . $_SESSION["numero_doc"] . '.pdf';

    $pdf->Output($file_pdf_name, 'F');
}
