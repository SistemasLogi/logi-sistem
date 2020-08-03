<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Stock_DAO
 *
 * @author Andres
 */
class Stock_DAO {
    //put your code here

    /**
     * Funcion que inserta un registro en tabla stock
     * @param type $obj_stock
     */
    function insertarStock($obj_stock) {
        $sql = "INSERT INTO stock VALUES (" . $obj_stock->getNum_sucursal() . ",'" . $obj_stock->getCod_producto() . "', '" . $obj_stock->getFecha_stock() . "', "
                . "" . $obj_stock->getCantidad_stk() . ", '" . $obj_stock->getObserv_stock() . "');";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que inserta un bloque de registros en tabla stock
     * @param type $sql
     */
    function insertarBloqueStock($sql) {
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que inserta un conjunto de datos a partir de una consulta en tabla stock
     * @param type $fecha_entrada
     */
    function insertarStockNuevo($fecha_entrada) {
        $sql = "INSERT INTO stock SELECT suc_num_id, pro_cod, ent_fecha, ent_cantidad, '' AS observaciones "
                . "FROM entrada_prod WHERE ent_fecha >= '" . $fecha_entrada . "';";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna el stock de un producto por codigo
     * @param type $cod_prod
     * @return type
     */
    function consultaStockProd($cod_prod) {
        $sql = "SELECT * FROM stock WHERE pro_cod = '" . $cod_prod . "';";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna el stock de un producto
     * @param type $cod_prod
     * @param type $num_suc
     * @param type $fech_stock
     * @param type $fech_actual
     * @return type
     */
    function consultaStockActual($cod_prod, $num_suc, $fech_stock, $fech_actual) {
        $sql = "SELECT T1.*, IFNULL(T2.salidas,0) AS t_salidas, (T1.stk_cantidad - IFNULL(T2.salidas,0)) AS total "
                . "FROM "
                . "(SELECT * FROM stock WHERE pro_cod = '" . $cod_prod . "')AS T1 "
                . "LEFT JOIN "
                . "(SELECT pro_cod, SUM(sal_cantidad) AS salidas "
                . "FROM salida_prod WHERE suc_num_id = " . $num_suc . " AND sal_fecha > '" . $fech_stock . "' AND sal_fecha < '" . $fech_actual . "' "
                . "GROUP BY pro_cod) AS T2 "
                . "ON T1.pro_cod = T2.pro_cod;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna el stock de un producto por codigo para alistamiento
     * @param type $fech_actual
     * @param type $num_suc
     * @return type
     */
    function consultaAlistaStock($fech_actual, $num_suc) {
        $sql = "SELECT TM1.*, TM2.*, (TM2.total - TM1.t_sal_cantidad)AS estimado FROM "
                . "(SELECT st.*, p.pro_ubicacion, p.pro_sku, p.pro_desc "
                . "FROM salidas_prod_temp AS st, productos AS p "
                . "WHERE st.t_suc_num_id = " . $num_suc . " AND st.t_suc_num_id = p.suc_num_id AND st.t_pro_cod = p.pro_cod)AS TM1 "
                . "LEFT JOIN "
                . "(SELECT T1.*, IFNULL(T2.salidas,0) AS t_salidas, (T1.stk_cantidad - IFNULL(T2.salidas,0)) AS total "
                . "FROM "
                . "(SELECT * FROM stock)AS T1 "
                . "LEFT JOIN "
                . "(SELECT pro_cod, SUM(sal_cantidad) AS salidas "
                . "FROM salida_prod AS sa WHERE suc_num_id = " . $num_suc . " "
                . "AND sal_fecha > (SELECT stk_fecha FROM stock AS sk WHERE sa.pro_cod = sk.pro_cod) AND sal_fecha < '" . $fech_actual . "' "
                . "GROUP BY pro_cod) AS T2 "
                . "ON T1.pro_cod = T2.pro_cod)AS TM2 "
                . "ON TM1.t_pro_cod = TM2.pro_cod ORDER BY TM1.t_sal_num_venta;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que actualiza un registro en tabla stock
     * @param type $fecha
     * @param type $new_cantidad
     * @param type $num_suc
     * @param type $codigo_prod
     * @return type
     */
    function actualizarStock($fecha, $new_cantidad, $num_suc, $codigo_prod) {
        $sql = "UPDATE stock SET stk_fecha = '" . $fecha . "', "
                . "stk_cantidad = " . $new_cantidad . " "
                . "WHERE suc_num_id = " . $num_suc . " AND pro_cod = '" . $codigo_prod . "';";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
