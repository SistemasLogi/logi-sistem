<?php

if ($_POST) {
    require '../../../config.php';
    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");
    $es_x_env_dao = new Estado_x_env_DAO();

    $datos_env_asig = $_POST["data_json"];
    $objetophp = json_decode($datos_env_asig);

    $sql_est_env = "INSERT INTO est_x_envio VALUES "; //cabecera del insert
    $reg_est_env = "";


    $novedad = "";
    $id_est_env = 5;


    for ($i = 0; $i < count($objetophp); $i++) {

        $porciones = explode("|", $objetophp[$i]->mens);

        $id_env_logi = $objetophp[$i]->id_env;

        $td_men = $porciones[0];
        $doc_men = $porciones[1];

        $reg_est_env .= "(" . $id_env_logi . ", " . $id_est_env . ", "
                . "'" . $fecha_hora . "', '" . $novedad . "', " . $td_men . ", "
                . "" . $doc_men . "),";
    }

    $reg_total_est = trim($reg_est_env, ",");
    $reg_total_est .= ";";

    $es_x_env_dao->insertarBloqueEnTablaEstados($sql_est_env . $reg_total_est);
} else {
    header("location../");
}