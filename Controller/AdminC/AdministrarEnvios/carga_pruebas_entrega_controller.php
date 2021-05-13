<?php

//session_start();

require '../../../config.php';

if ($_POST) {

    //Como el elemento es un arreglos utilizamos foreach para extraer todos los valores
    foreach ($_FILES["inpFileMasPruebas"]['tmp_name'] as $key => $tmp_name) {
        //Validamos que el archivo exista
        if ($_FILES["inpFileMasPruebas"]["name"][$key]) {
            $filename = $_FILES["inpFileMasPruebas"]["name"][$key]; //Obtenemos el nombre original del archivo
            $source = $_FILES["inpFileMasPruebas"]["tmp_name"][$key]; //Obtenemos un nombre temporal del archivo

            $directorio = '../../../img/pruebas_entrega/'; //Declaramos un  variable con la ruta donde guardaremos los archivos
            //Validamos si la ruta de destino existe, en caso de no existir la creamos
            if (!file_exists($directorio)) {
                mkdir($directorio, 0777) or die("No se puede crear el directorio de extracci&oacute;n");
            }

            $dir = opendir($directorio); //Abrimos el directorio de destino
            $target_path = $directorio . '/' . $filename; //Indicamos la ruta de destino, así como el nombre del archivo
            //Movemos y validamos que el archivo se haya cargado correctamente
            //El primer campo es el origen y el segundo el destino
            if (move_uploaded_file($source, $target_path)) {
                echo "<b class='text-success'>El archivo " . $filename . " se ha almacenado en forma exitosa.</b>";
            } else {
                echo "Ha ocurrido un error, por favor inténtelo de nuevo.<br>";
            }
            closedir($dir); //Cerramos el directorio de destino
        }
    }
} else {
    header("location ../");
}