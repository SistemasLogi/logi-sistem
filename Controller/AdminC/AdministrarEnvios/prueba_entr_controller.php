<?php

if ($_POST) {
    $num_envio = $_POST['envio'];
    // Ruta del directorio donde están los archivos
    $path = '../../../img/pruebas_entrega';

    // Arreglo con todos los nombres de los archivos
    $files = array_diff(scandir($path), array('.', '..'));

    foreach ($files as $file) {
        // Divides en dos el nombre de tu archivo utilizando el . 
        $data = explode(".", $file);
        // Nombre del archivo
        $fileName = $data[0];
        // Extensión del archivo 
        $fileExtension = $data[1];

        if ($num_envio == $fileName) {
            $ruta_prueba = $fileName . "." . $fileExtension;
            echo $ruta_prueba;
            // Realizamos un break para que el ciclo se interrumpa
            break;
        } else {
            
        }
    }
} else {
    header("location../");
}