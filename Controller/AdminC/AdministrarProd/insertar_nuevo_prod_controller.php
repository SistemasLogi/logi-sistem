<?php

if ($_POST) {
    require '../../../config.php';
    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");
    $producto_dao = new Producto_DAO();
    $producto_vo = new Producto_VO();
    $stock_vo = new Stock_VO();
    $stock_dao = new Stock_DAO();

    $num_suc = $_POST["inputNumSuc"];
    $cod_pro = $_POST["inputCodProd"];
    $sku = $_POST["inputSku"];
    $desc = $_POST["inputNomProd"];
    $ubicacion = $_POST["inputUbProd"];
    $cantidad = $_POST["inputCantProd"];

    $producto_vo->setSuc_numero($num_suc);
    $producto_vo->setCod_prod($cod_pro);
    $producto_vo->setSku_prod($sku);
    $producto_vo->setDescripcion($desc);
    $producto_vo->setUbicacion($ubicacion);
    $producto_vo->setFecha_reg($fecha_hora);
    $producto_vo->setFecha($fecha_hora);
    $producto_vo->setCant_ent($cantidad);
    $producto_vo->setDetalle("");
    $producto_vo->setCosto_unit(0);

    if ($producto_dao->insertarProductoNuevo($producto_vo) == 1) {
        $stock_vo->setNum_sucursal($num_suc);
        $stock_vo->setCod_producto($cod_pro);
        $stock_vo->setFecha_stock($fecha_hora);
        $stock_vo->setCantidad_stk($cantidad);
        $stock_vo->setObserv_stock("");

        if($producto_dao->insertarEntradaProd($producto_vo)) {
            if ($stock_dao->insertarStock($stock_vo) == 1) {
                echo 1;
            } else {
                echo "error al guardar estock";
            }
        }else{
            echo "error al generar entrada";
        }
    } else {
        echo "error al crear producto, revise los datos y que el codigo de barras no se repita en la base de datos";
    }
} else {
    header("location../");
}