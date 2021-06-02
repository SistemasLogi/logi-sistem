<?php

if ($_POST) {
    require '../../../config.php';
    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");
    $es_x_env_dao = new Estado_x_env_DAO();
    $es_x_env_vo = new Estado_x_env_VO();

    $datos_est_env = $_POST["datos_est"];
    $objetophp = json_decode($datos_est_env);

    $sql_est_env = "INSERT INTO est_x_envio VALUES "; //cabecera del insert
    $reg_est_env = "";
    for ($i = 0; $i < count($objetophp); $i++) {

        $porciones = explode("|", $objetophp[$i]->mens);

        $td_men = $porciones[0];
        $doc_men = $porciones[1];
        $env_id = $objetophp[$i]->id_env;
        $est_id = $objetophp[$i]->id_est;
        $novedad = $objetophp[$i]->nov;


        $reg_est_env .= "(" . $env_id . ", " . $est_id . ", "
                . "'" . $fecha_hora . "', '" . $novedad . "', " . $td_men . ", "
                . "" . $doc_men . "),";
    }

    $reg_total_est = trim($reg_est_env, ",");
    $reg_total_est .= ";";

    echo $es_x_env_dao->insertarBloqueEnTablaEstados($sql_est_env . $reg_total_est);
} else {
    header("location../");
}