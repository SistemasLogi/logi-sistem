<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require '../../../config.php';
$est_env = new Estado_x_env_DAO();
$num_envio = $_GET["inpBuscaNumEnv"];
$datosEnvio = json_encode($est_env->consulta_ultimo_est_envios("AND TM.exe_en_id = " . $num_envio . ";"));

if (!empty($datosEnvio)) {
    $id_env_dec = json_decode($datosEnvio);

    $cant_estados = count($id_env_dec); //cantidad de registros que equivalen a los estados por los que pasa el envio
    $cant_teorico = $cant_estados;
    $tmp_ult_est = $datosEnvio[$cant_estados - 1];


    if ($datosEnvio[0]->ee_id == 6 || $datosEnvio[0]->ee_id == 7) {
        
    } else {
        $cant_teorico = $datosEnvio[$cant_estados - 1]; //cantidad teorica para visualizacion
    }
}

echo '<script type="text/javascript">
    alert("' . $num_envio . '");
    </script>';



