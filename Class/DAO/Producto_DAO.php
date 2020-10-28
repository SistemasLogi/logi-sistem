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
                . "'" . $producto_vo->getUbicacion() . "', '" . $producto_vo->getFecha_reg() . "', " . $producto_vo->getCosto_unit() . ")";
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

    /**
     * Funcion que retorna registro en tabla salidas prod por num de venta y sucursal
     * @param type $num_venta
     * @param type $suc_id
     * @return type
     */
    function consultaSalidaNumVenta($num_venta, $suc_id) {
        $sql = "SELECT * FROM salida_prod WHERE sal_num_venta = " . $num_venta . " AND suc_num_id = " . $suc_id . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna producto registrado en salidas temp y calcula el stock
     * requiere el csc de la tabla salidas temp
     * @param type $suc_id
     * @param type $csc_salida_tmp
     * @param type $fec_hor_actual
     * @return type
     */
    function consultaProdStockAlist($suc_id, $csc_salida_tmp, $fec_hor_actual) {
        $sql = "SELECT TM1.*, TM2.*, (TM2.total - TM1.t_sal_cantidad)AS estimado FROM "
                . "(SELECT st.*, p.pro_ubicacion, p.pro_sku, p.pro_desc "
                . "FROM salidas_prod_temp AS st, productos AS p "
                . "WHERE st.t_suc_num_id = " . $suc_id . " AND st.t_suc_num_id = p.suc_num_id AND st.t_pro_cod = p.pro_cod "
                . "AND st.t_csc = " . $csc_salida_tmp . ")AS TM1 LEFT JOIN "
                . "(SELECT T1.*, IFNULL(T2.salidas,0) AS t_salidas, "
                . "(T1.stk_cantidad - IFNULL(T2.salidas,0)) AS total "
                . "FROM (SELECT * FROM stock)AS T1 "
                . "LEFT JOIN (SELECT pro_cod, SUM(sal_cantidad) AS salidas "
                . "FROM salida_prod AS sa WHERE suc_num_id = " . $suc_id . " "
                . "AND sal_fecha > (SELECT stk_fecha FROM stock AS sk WHERE sa.pro_cod = sk.pro_cod) "
                . "AND sal_fecha < '" . $fec_hor_actual . "' GROUP BY pro_cod) AS T2 "
                . "ON T1.pro_cod = T2.pro_cod)AS TM2 ON TM1.t_pro_cod = TM2.pro_cod;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna producto consultado por sku calcula el stock
     * @param type $suc_id
     * @param type $sku
     * @param type $fec_hor_actual
     * @return type
     */
    function consultaProdStockAlistSku($suc_id, $sku, $fec_hor_actual) {
        $sql = "SELECT T1.*, IFNULL(T2.salidas,0) AS t_salidas, (T1.stk_cantidad - IFNULL(T2.salidas,0)) AS total "
                . "FROM (SELECT st.*, p.pro_ubicacion, p.pro_sku, p.pro_desc "
                . "FROM stock AS st, productos AS p "
                . "WHERE st.pro_cod = p.pro_cod AND st.suc_num_id = p.suc_num_id AND p.pro_sku = '" . $sku . "')AS T1 "
                . "LEFT JOIN (SELECT pro_cod, SUM(sal_cantidad) AS salidas FROM salida_prod AS sa "
                . "WHERE suc_num_id = " . $suc_id . " AND sal_fecha > (SELECT stk_fecha FROM stock AS sk "
                . "WHERE sa.pro_cod = sk.pro_cod) AND sal_fecha < '" . $fec_hor_actual . "' GROUP BY pro_cod) AS T2 ON T1.pro_cod = T2.pro_cod;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna el stock de todos los productos para una sucursal
     * @param type $suc_id
     * @param type $fec_hor_actual
     * @return type
     */
    function consultaInventarioStock($suc_id, $fec_hor_actual) {
        $sql = "SELECT T1.*, IFNULL(T2.salidas,0) AS t_salidas, (T1.stk_cantidad - IFNULL(T2.salidas,0)) AS total "
                . "FROM "
                . "(SELECT p.pro_sku, p.pro_desc, p.pro_ubicacion, s.* "
                . "FROM stock AS s, productos AS p WHERE p.pro_cod = s.pro_cod AND p.suc_num_id = s.suc_num_id  AND p.suc_num_id = " . $suc_id . ") "
                . "AS T1 "
                . "LEFT JOIN "
                . "(SELECT pro_cod, SUM(sal_cantidad) AS salidas "
                . "FROM salida_prod AS sa "
                . "WHERE suc_num_id = " . $suc_id . " "
                . "AND sal_fecha > (SELECT stk_fecha FROM stock AS sk WHERE sa.pro_cod = sk.pro_cod) "
                . "AND sal_fecha < '" . $fec_hor_actual . "' GROUP BY pro_cod) AS T2 ON T1.pro_cod = T2.pro_cod;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * funcion que permite eliminar un registro en tabla salidas_prod_temp sugun su consecutivo
     * @param type $csc
     */
    function elimProdTemp($csc) {
        $sql = "DELETE FROM salidas_prod_temp "
                . "WHERE t_csc = " . $csc . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que actualiza un item en tabla salidas_prod_temp para alistamiento
     * @param type $cod_prod
     * @param type $cantidad
     * @param type $csc
     * @return type
     */
    function actualizarItemProdAlist($cod_prod, $cantidad, $csc) {
        $sql = "UPDATE salidas_prod_temp SET "
                . "t_pro_cod = '" . $cod_prod . "', "
                . "t_sal_cantidad = " . $cantidad . " "
                . "WHERE t_csc = " . $csc . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * funcion que permite eliminar registros en tabla salidas_prod_temp
     * sugun un numero de venta
     * @param type $venta
     */
    function elimProdTempVent($venta) {
        $sql = "DELETE FROM salidas_prod_temp "
                . "WHERE t_sal_num_venta = " . $venta . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna los productos por venta en salidas temp
     * @param type $num_venta
     * @return type
     */
    function consultaProductos_x_venta_salTemp($num_venta) {
        $sql = "SELECT * FROM salidas_prod_temp WHERE t_sal_num_venta = " . $num_venta . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta un conjunto de datos a partir de una consulta en tabla salida_prod
     * @param type $num_venta
     * @return type
     */
    function insertarSalidaProd($num_venta) {
        $sql = "INSERT INTO salida_prod "
                . "SELECT NOW() AS fecha, st.t_suc_num_id, st.t_pro_cod, st.t_sal_num_venta, st.t_sal_cantidad, st.t_sal_observaciones "
                . "FROM salidas_prod_temp AS st WHERE st.t_sal_num_venta = " . $num_venta . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna los movimientos del kardex
     * @param type $cod_producto
     * @return type
     */
    function consultaTarjetaKardex($cod_producto) {
        $sql = "(SELECT p.pro_sku, p.pro_desc, e.ent_fecha, e.pro_cod, '' AS venta, e.ent_cantidad, 1 AS movimiento "
                . "FROM entrada_prod AS e, productos AS p "
                . "WHERE e.pro_cod = '" . $cod_producto . "' AND e.pro_cod = p.pro_cod) "
                . "UNION "
                . "(SELECT p.pro_sku, p.pro_desc, s.sal_fecha, s.pro_cod, s.sal_num_venta, s.sal_cantidad, 2 AS movimiento "
                . "FROM salida_prod AS s, productos AS p "
                . "WHERE s.pro_cod = '" . $cod_producto . "' AND s.pro_cod = p.pro_cod) ORDER BY ent_fecha ASC;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna los item de una venta en tabla salidas temp
     * @param type $num_venta
     * @return type
     */
    function consultaProd_x_venta_sal_temp($num_venta) {
        $sql = "SELECT ts.t_suc_num_id AS sucursal, ts.t_pro_cod AS codigo, ts.t_sal_guia_num AS guia, ts.t_sal_num_venta AS venta, p.pro_sku AS sku, p.pro_desc AS descripcion, ts.t_sal_cantidad AS unidades "
                . "FROM salidas_prod_temp AS ts, productos AS p "
                . "WHERE ts.t_pro_cod = p.pro_cod AND ts.t_sal_num_venta = " . $num_venta . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna los item de una venta en tabla salidas
     * @param type $num_venta
     * @return type
     */
    function consultaProd_x_venta_sal($num_venta) {
        $sql = "SELECT s.suc_num_id AS sucursal, s.pro_cod AS codigo, s.sal_num_venta AS venta, p.pro_sku AS sku, p.pro_desc AS descripcion, s.sal_cantidad AS unidades "
                . "FROM salida_prod AS s, productos AS p "
                . "WHERE s.pro_cod = p.pro_cod AND s.sal_num_venta = " . $num_venta . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna la consulta general de todos los productos creados
     * @return type
     */
    function consultaGeneralProductosCreados() {
        $sql = "SELECT * FROM productos;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
