<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require '../../../config.php';
$est_env = new Estado_x_env_DAO();
//echo json_encode($est_env->consulta_ultimo_est_envios("AND TM.exe_en_id = " . $_GET["id_env"] . ";"));
$num_envio = $_GET["inpBuscaNumEnv"];
echo '<script type="text/javascript">
    alert("' . $num_envio . '");
    </script>';



