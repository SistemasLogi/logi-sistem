<?php

if ($_POST) {
    require '../../../config.php';
    $producto_dao = new Producto_DAO();
    $producto_vo = new Producto_VO();

    $UltEntradas = json_encode($producto_dao->consultaGeneralUltimasEntradas());
    $UltEntradas_dec = json_decode($UltEntradas);


    for ($i = 0; $i <= count($UltEntradas_dec); $i++) {
        $codigo = $UltEntradas_dec[$i]->pro_cod;
        $fech_ent = $UltEntradas_dec[$i]->ent_fecha;
    }
} else {
    header("location../");
}