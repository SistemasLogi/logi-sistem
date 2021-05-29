<?php

$inicio_array = 0;

$pag_fin = count($array);

$num_doc_client = $array[0]->cli_num_doc;
$tipo_docum_cli = $array[0]->cli_td_id;

if (isset($_SESSION["adminlogi"])) {
    //Crear carpeta por usuario para imagenes QR
    $directorioQR = '../../img/tmp_qr_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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
    $directorioBar = '../../img/tmp_barras_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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
    $directorioQR = '../../img/tmp_qr/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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
    $directorioBar = '../../img/tmp_barras/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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

require './guias_pdf_final_param_controller.php';

if (isset($_SESSION["adminlogi"])) {
    echo "<div class='alert alert-dismissible alert-success'>"
    . "<a href='Files/GuiasPDF_temp_adm/" . $num_doc_client . "_" . $tipo_docum_cli . "/" . $num_doc_client . ".pdf' class='alert-link' target='_blank'>Click AQUI para descargar pdf</a>."
    . "</div>";
} else {
    echo "<div class='alert alert-dismissible alert-success'>"
    . "<a href='Files/GuiasPDF_temp/" . $num_doc_client . "_" . $tipo_docum_cli . "/" . $num_doc_client . ".pdf' class='alert-link' target='_blank'>Click AQUI para descargar pdf</a>."
    . "</div>"
    . "<div class='alert alert-dismissible alert-warning'>"
    . "<a href='http://www.grupologi.co/rastreo_envio.php?EnvNum=" . $code . "' class='alert-link' target='_blank'>Sigue tu envio en <b class='text-info'>www.grupologi.co/rastreo_envio.php?EnvNum=" . $code . "</b></a>"
    . "</div>";
}
