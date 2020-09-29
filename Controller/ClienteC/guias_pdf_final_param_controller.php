<?php

if (isset($_SESSION["adminlogi"])) {
    //Crear carpeta por usuario para Guias en pdf
    $directorioGuias_pdf = '../../Files/GuiasPDF_temp_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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

    $file_pdf_name = $directorioGuias_pdf . $num_doc_client . '.pdf';

    $pdf->Output($file_pdf_name, 'F');
} else {
    //Crear carpeta por usuario para Guias en pdf
    $directorioGuias_pdf = '../../Files/GuiasPDF_temp/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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

    $file_pdf_name = $directorioGuias_pdf . $num_doc_client . '.pdf';

    $pdf->Output($file_pdf_name, 'F');
}
