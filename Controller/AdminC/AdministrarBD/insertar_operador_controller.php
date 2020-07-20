<?php

if ($_POST) {
    require '../../../config.php';
    $operador_dao = new Operadores_DAO();
    $operador_vo = new Operadores_VO();

    $cod_opera = $_POST["inpCodOpera"];

    if (empty($cod_opera)) {
        $operador_vo->setOper_id("null");
    } else {
        $operador_vo->setOper_id($_POST["inpCodOpera"]);
    }

    $operador_vo->setOpera_nombre($_POST["inpNomOpera"]);
    echo $operador_dao->insertarOperador($operador_vo);
} else {
    header("location../");
}