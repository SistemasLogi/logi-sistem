<?php

if (isset($_SESSION["adminlogi"])) {
    //Crear carpeta por usuario para imagenes QR
    $directorioQR = '../../img/tmp_qr_adm/' . $_SESSION["num_doc_cli_adm"] . '_' . $_SESSION["td_cli_adm"] . '/';
    if (!file_exists($directorioQR)) {
        mkdir($directorioQR, 0777, true);
    }
//elimina el contenido en carpeta imagenes QR existente
    $filesQR = glob($directorioQR . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesQR as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//Crear carpeta por usuario para imagenes Barras
    $directorioBar = '../../img/tmp_barras_adm/' . $_SESSION["num_doc_cli_adm"] . '_' . $_SESSION["td_cli_adm"] . '/';
    if (!file_exists($directorioBar)) {
        mkdir($directorioBar, 0777, true);
    }
//elimina el contenido en carpeta imagenes Barras existente
    $filesBar = glob($directorioBar . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesBar as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }
} else {
    //Crear carpeta por usuario para imagenes QR
    $directorioQR = '../../img/tmp_qr/' . $_SESSION["numero_doc"] . '_' . $_SESSION["tipo_doc"] . '/';
    if (!file_exists($directorioQR)) {
        mkdir($directorioQR, 0777, true);
    }
//elimina el contenido en carpeta imagenes QR existente
    $filesQR = glob($directorioQR . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesQR as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//Crear carpeta por usuario para imagenes Barras
    $directorioBar = '../../img/tmp_barras/' . $_SESSION["numero_doc"] . '_' . $_SESSION["tipo_doc"] . '/';
    if (!file_exists($directorioBar)) {
        mkdir($directorioBar, 0777, true);
    }
//elimina el contenido en carpeta imagenes Barras existente
    $filesBar = glob($directorioBar . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesBar as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }
}

require './generar_guias_pdf_controller.php';

require './guias_pdf_final_sesion_controller.php';