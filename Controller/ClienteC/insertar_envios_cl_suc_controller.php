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
    if (is_numeric($_POST["inputCantidadEnv"])) {
        $cantidad_cont = $_POST["inputCantidadEnv"];
    } else {
        $cantidad_cont = 1;
    }
    if (is_numeric($_POST["inputPeso"])) {
        $peso_cont = $_POST["inputPeso"] * $cantidad_cont;
    } else {
        $peso_cont = 1;
    }
    if (is_numeric($_POST["inputAlto"])) {
        $alto_cont = $_POST["inputAlto"];
    } else {
        $alto_cont = 1;
    }
    if (is_numeric($_POST["inputAncho"])) {
        $ancho_cont = $_POST["inputAncho"];
    } else {
        $ancho_cont = 1;
    }
    if (is_numeric($_POST["inputLargo"])) {
        $largo_cont = $_POST["inputLargo"];
    } else {
        $largo_cont = 1;
    }
    $env_vo->setTrayecto("");
    $env_vo->setNombre($_POST["inputNombreDestino"]);
    $env_vo->setDireccion($_POST["inputDirDestino"]);
    $env_vo->setTelefono($_POST["inputTeleDestino"]);
    $env_vo->setCiudad_dest($dpto_ciu[0]->ciu_nombre);
    $env_vo->setDepto_dest($dpto_ciu[0]->dep_desc);
    $env_vo->setNovedad($_POST["inputObserv"]);
    $env_vo->setContenido($_POST["inputContenido"]);

    if (is_numeric($_POST["inputValorDecl"])) {
        $env_vo->setValor_declarado($_POST["inputValorDecl"]);
    } else {
        $env_vo->setValor_declarado(0);
    }
    $env_vo->setNum_venta(0);
    if (is_numeric($_POST["inputRecaudo"])) {
        $env_vo->setRecaudo($_POST["inputRecaudo"]);
    } else {
        $env_vo->setRecaudo(0);
    }
    $env_vo->setTipo_pag_id(3);

    $env_vo->setValor_pago(0);
    $id_os_cliente = $_POST["inputNumOrdServ"];

    $vol_cubico = $alto_cont * $ancho_cont * $largo_cont * $cantidad_cont;
    $total_vol_cub = $vol_cubico;

    if ($contador > 0) {
        for ($i = 0; $i < $contador; $i++) {
            $ind = $i + 1;

            if (is_numeric($_POST["inputCantidadEnv$ind"])) {
                $cantidad_item = $_POST["inputCantidadEnv$ind"];
                $cantidad_cont = $cantidad_cont + $_POST["inputCantidadEnv$ind"];
            } else {
                $cantidad_item = 1;
                $cantidad_cont = $cantidad_cont + 1;
            }
            if (is_numeric($_POST["inputPeso$ind"])) {
                $peso_cont = $peso_cont + ($_POST["inputPeso$ind"] * $cantidad_item);
            } else {
                $peso_cont = $peso_cont + 1;
            }
            if (is_numeric($_POST["inputAlto$ind"])) {
                $alto_cont_ciclo = $_POST["inputAlto$ind"];
            } else {
                $alto_cont_ciclo = 1;
            }
            if (is_numeric($_POST["inputAncho$ind"])) {
                $ancho_cont_ciclo = $_POST["inputAncho$ind"];
            } else {
                $ancho_cont_ciclo = 1;
            }
            if (is_numeric($_POST["inputLargo$ind"])) {
                $largo_cont_ciclo = $_POST["inputLargo$ind"];
            } else {
                $largo_cont_ciclo = 1;
            }

            $vol_cubico_ciclo = $alto_cont_ciclo * $ancho_cont_ciclo * $largo_cont_ciclo * $cantidad_item;
            $total_vol_cub = $total_vol_cub + $vol_cubico_ciclo;
        }
    }

    $promed_arist = pow($total_vol_cub, 1 / 3);
    $aprox_promed = round($promed_arist, 0, PHP_ROUND_HALF_UP);


    $env_vo->setCantidad($cantidad_cont);
    $env_vo->setPeso_kg($peso_cont);
    $env_vo->setAlto_cm($aprox_promed);
    $env_vo->setAncho_cm($aprox_promed);
    $env_vo->setLargo_cm($aprox_promed);


    $env_dao->insertarEnvio($env_vo);
//        echo '<strong>Envios ingresados correctamente.</strong>';
//        echo "<strong>&nbsp;&nbsp;Total " . ($contador + 1) . " numeros de Guia creados</strong>";
    $est_x_env = new Estado_x_env_DAO();
    $est_x_env->insertarEstado_x_envio($id_os_cliente, $fecha_hora);
//        if (isset($_SESSION["adminlogi"])) {
//            $env_ing = json_encode($env_dao->consultaEnvIng_x_os($id_os_cliente, $_SESSION["td_cli_adm"], $_SESSION["num_doc_cli_adm"], 1));
//        } else {
//            $env_ing = json_encode($env_dao->consultaEnvIng_x_os($id_os_cliente, $_SESSION["tipo_doc"], $_SESSION["numero_doc"], 1));
//        }
//
//        $array = json_decode($env_ing);
//        require '../../ClienteC/consulta_env_ingresados_controller.php';
    echo 1;



//    echo $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
} else {
    header("location../");
}
