<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");

if ($_POST) {
    require '../../../config.php';
    $es_x_env_dao = new Estado_x_env_DAO();
    $es_x_env_vo = new Estado_x_env_VO();

    $nombre_fichero = $_FILES["inpFileFoto"]["name"];
    $es_x_env_vo->setEnvio_id($_POST["inpNumEnv"]);
    $es_x_env_vo->setEst_env_id($_POST["inpEstado"]);
    $es_x_env_vo->setFecha_hora($fecha_hora_now);
    $es_x_env_vo->setNovedad($_POST["txaNovedad"]);
    $es_x_env_vo->setTd_mensajero($_SESSION["tipo_doc"]);
    $es_x_env_vo->setNum_doc_men($_SESSION["numero_doc"]);

    if (!empty($nombre_fichero)) {
        $extension = pathinfo($nombre_fichero, PATHINFO_EXTENSION);

        if (move_uploaded_file($_FILES["inpFileFoto"]["tmp_name"], "../../../img/pruebas_entrega/" . $nombre_fichero)) {

            rename("../../../img/pruebas_entrega/" . $nombre_fichero, "../../../img/pruebas_entrega/" . $_POST["inpNumEnv"] . "." . $extension);
        } else {
            if ($_FILES['inpFileFoto']['error'] !== UPLOAD_ERR_OK) {
                /* Mostramos un mensaje de error personalizado en cada caso */
                switch ($_FILES['inpFileFoto']['error']) {
                    case UPLOAD_ERR_INI_SIZE:
                        echo('El tamaño de archivo excedió el máximo definido en upload_max_filesize');
                        break;
                    default:
                        /* Para no extenderme capturo el resto de mensajes aquí */
                        echo('Hubo un error inesperado durante la subida del archivo');
                }
            }
            echo 3;
        }
    } else {
        
    }
    echo $es_x_env_dao->insertarEstado_x_envio_general($es_x_env_vo);
} else {
    header("location../");
}