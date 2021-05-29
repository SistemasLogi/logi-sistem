<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $env_dao = new Envio_DAO();
    $env_vo = new Envio_VO();

    $contador = $_POST["inputCuenta"];
    $guia_logi = $_POST["inputNumEnvLogi"];
    $cantidad_cont = 0;
    $peso_cont = 0;
    $total_vol_cub = 0;

    for ($i = 0; $i < $contador; $i++) {

        if (is_numeric($_POST["inputCantidadEnv$i"])) {
            $cantidad_item = $_POST["inputCantidadEnv$i"];
            $cantidad_cont = $cantidad_cont + $_POST["inputCantidadEnv$i"];
        } else {
            $cantidad_item = 1;
            $cantidad_cont = $cantidad_cont + 1;
        }
        if (is_numeric($_POST["inputPeso$i"])) {
            $peso_item = $_POST["inputPeso$i"];
            $peso_cont = $peso_cont + ($_POST["inputPeso$i"] * $cantidad_item);
        } else {
            $peso_item = 1;
            $peso_cont = $peso_cont + 1;
        }
        if (is_numeric($_POST["inputAlto$i"])) {
            $alto_cont_ciclo = $_POST["inputAlto$i"];
        } else {
            $alto_cont_ciclo = 1;
        }
        if (is_numeric($_POST["inputAncho$i"])) {
            $ancho_cont_ciclo = $_POST["inputAncho$i"];
        } else {
            $ancho_cont_ciclo = 1;
        }
        if (is_numeric($_POST["inputLargo$i"])) {
            $largo_cont_ciclo = $_POST["inputLargo$i"];
        } else {
            $largo_cont_ciclo = 1;
        }

        $vol_cubico_ciclo = $alto_cont_ciclo * $ancho_cont_ciclo * $largo_cont_ciclo * $cantidad_item;
        $total_vol_cub = $total_vol_cub + $vol_cubico_ciclo;

        $cantidad[$i] = $cantidad_item;
        $peso[$i] = $peso_item;
        $alto[$i] = $alto_cont_ciclo;
        $ancho[$i] = $ancho_cont_ciclo;
        $largo[$i] = $largo_cont_ciclo;

        if ($env_dao->actualizarDetalleEnvio($cantidad_item, $peso_item, $largo_cont_ciclo, $ancho_cont_ciclo, $alto_cont_ciclo, $_POST["inputItemId$i"]) == 1) {
            
        } else {
            echo 'error al actualizar item ' . $i;
        }
    }
    $promed_arist = pow($total_vol_cub, 1 / 3);
    $aprox_promed = round($promed_arist, 0, PHP_ROUND_HALF_UP);

    $env_vo->setCantidad($cantidad_cont);
    $env_vo->setPeso_kg($peso_cont);
    $env_vo->setAlto_cm($aprox_promed);
    $env_vo->setAncho_cm($aprox_promed);
    $env_vo->setLargo_cm($aprox_promed);
    $env_vo->setId_envio($guia_logi);

    if ($env_dao->actualizarDimensionesEnvio($env_vo) == 1) {
        echo 1;
    } else {
        echo 'error al actualizar dimensiones generales';
//        echo $env_dao->actualizarDimensionesEnvio($env_vo);
    }
} else {
    header("location../");
}


