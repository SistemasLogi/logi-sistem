<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
session_start();

require '../../config.php';

date_default_timezone_set('America/Bogota');
$fecha_hora = date("Y-m-d H:i:s");
if ($_POST) {
    $env_dao = new Envio_DAO();
    $env_vo = new Envio_VO();
    $dpto_dao = new Depto_DAO();

    $json_id_dpto = json_encode($dpto_dao->consultaDepto_x_ciu($_POST["selectCiudDestino"]));
    $dpto_ciu = json_decode($json_id_dpto);

    $contador = $_POST["inputContador"];
    $env_vo->setNum_orden_serv($_POST["inputNumOrdServ"]);
    $env_vo->setNum_guia($_POST["inputRefGuia"]);
    $env_vo->setCantidad($_POST["inputCantidadEnv"]);
    $env_vo->setPeso_kg($_POST["inputPeso"]);
    $env_vo->setAlto_cm($_POST["inputAlto"]);
    $env_vo->setAncho_cm($_POST["inputAncho"]);
    $env_vo->setLargo_cm($_POST["inputLargo"]);
    $env_vo->setTrayecto("");
    $env_vo->setNombre($_POST["inputNombreDestino"]);
    $env_vo->setDireccion($_POST["inputDirDestino"]);
    $env_vo->setTelefono($_POST["inputTeleDestino"]);
    $env_vo->setCiudad_dest($dpto_ciu[0]->ciu_nombre);
    $env_vo->setDepto_dest($dpto_ciu[0]->dep_desc);
    $env_vo->setNovedad($_POST["inputObserv"]);
    $env_vo->setContenido($_POST["inputContenido"]);
    $env_vo->setValor_declarado($_POST["inputValorDecl"]);

    $id_os_cliente = $_POST["inputNumOrdServ"];

    if ($env_dao->insertarEnvio($env_vo) == 1) {
        if ($contador > 0) {
            for ($i = 0; $i < $contador; $i++) {
                $ind = $i + 1;
                $json_id_dpto = json_encode($dpto_dao->consultaDepto_x_ciu($_POST["selectCiudDestino$ind"]));
                $dpto_id = json_decode($json_id_dpto);
                $env_vo->setNum_orden_serv($_POST["inputNumOrdServ"]);
                $env_vo->setNum_guia($_POST["inputRefGuia$ind"]);
                $env_vo->setCantidad($_POST["inputCantidadEnv$ind"]);
                $env_vo->setPeso_kg($_POST["inputPeso$ind"]);
                $env_vo->setAlto_cm($_POST["inputAlto$ind"]);
                $env_vo->setAncho_cm($_POST["inputAncho$ind"]);
                $env_vo->setLargo_cm($_POST["inputLargo$ind"]);
                $env_vo->setTrayecto("");
                $env_vo->setNombre($_POST["inputNombreDestino$ind"]);
                $env_vo->setDireccion($_POST["inputDirDestino$ind"]);
                $env_vo->setTelefono($_POST["inputTeleDestino$ind"]);
                $env_vo->setCiudad_dest($dpto_ciu[0]->ciu_nombre);
                $env_vo->setDepto_dest($dpto_ciu[0]->dep_desc);
                $env_vo->setNovedad($_POST["inputObserv$ind"]);
                $env_vo->setContenido($_POST["inputContenido$ind"]);
                $env_vo->setValor_declarado($_POST["inputValorDecl$ind"]);

                $env_dao->insertarEnvio($env_vo);
            }
        }

        echo '<strong>Envios ingresados correctamente.</strong>';
        echo "<strong>&nbsp;&nbsp;Total " . ($contador + 1) . " numeros de Guia creados</strong>";
        $est_x_env = new Estado_x_env_DAO();
        $est_x_env->insertarEstado_x_envio($id_os_cliente);

        if (isset($_SESSION["adminlogi"])) {
            $env_ing = json_encode($env_dao->consultaEnvIng_x_os($id_os_cliente, $_SESSION["td_cli_adm"], $_SESSION["num_doc_cli_adm"], 1));
        } else {
            $env_ing = json_encode($env_dao->consultaEnvIng_x_os($id_os_cliente, $_SESSION["tipo_doc"], $_SESSION["numero_doc"], 1));
        }
        
        $array = json_decode($env_ing);
        require './consulta_env_ingresados_controller.php';
    } else {
        
    }


//    echo $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
} else {
    header("location../");
}
