<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Producto_DAO
 *
 * @author Andres
 */
class Producto_DAO {

    /**
     * Funcion que retorna un producto por cod y num sucursal
     * @param type $suc_num
     * @param type $cod_prod
     * @return type
     */
    function consultaProd_exist($suc_num, $cod_prod) {
        $sql = "SELECT * FROM productos WHERE suc_num_id = " . $suc_num . " AND pro_cod = '" . $cod_prod . "';";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna un producto por sku
     * @param type $sku
     * @return type
     */
    function consultaProd_x_sku($sku) {
        $sql = "SELECT * FROM productos WHERE pro_sku = '" . $sku . "';";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta un registro en tabla productos
     * @param type $producto_vo
     */
    function insertarProductoNuevo($producto_vo) {
        $sql = "INSERT INTO productos VALUES (" . $producto_vo->getSuc_numero() . ", "
                . "'" . $producto_vo->getCod_prod() . "', '" . $producto_vo->getSku_prod() . "', '" . $producto_vo->getDescripcion() . "', "
                . "'" . $producto_vo->getUbicacion() . "', '" . $producto_vo->getFecha_reg() . "')";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que inserta un bloque de registros en tabla productos
     * @param type $sql
     */
    function insertarBloqueProductoNuevo($sql) {
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que inserta un bloque de registros en tabla entradas_prod
     * @param type $sql
     */
    function insertarBloqueEnTabla($sql) {

        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que inserta un registro en tabla entradas_prod
     * @param type $producto_vo
     */
    function insertarEntradaProd($producto_vo) {
        $sql = "INSERT INTO entrada_prod VALUES ('" . $producto_vo->getFecha() . "', " . $producto_vo->getSuc_numero() . ", "
                . "'" . $producto_vo->getCod_prod() . "', '" . $producto_vo->getCant_ent() . "', '" . $producto_vo->getDetalle() . "')";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna la consulta de ultimas entradas al sistema
     * @return type
     */
    function consultaGeneralUltimasEntradas() {
        $sql = "SELECT * FROM entrada_prod WHERE ent_fecha = (select MAX(ent_fecha)FROM entrada_prod);";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
