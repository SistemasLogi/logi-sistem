<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Orden_serv_DAO
 *
 * @author Andres
 */
class Orden_serv_DAO {
    //put your code here

    /**
     * Funcion que inserta o actualiza un registro en tabla orden_serv
     * @param type $ord_ser_vo
     */
    function insertarOrden_serv($ord_ser_vo) {
        $sql = "INSERT INTO orden_serv VALUES (null, " . $ord_ser_vo->getCli_id() . ", "
                . "" . $ord_ser_vo->getCli_docum() . ", " . $ord_ser_vo->getCod_ciudad() . ", "
                . "'" . $ord_ser_vo->getDireccion() . "', '" . $ord_ser_vo->getPer_contacto() . "', "
                . "'" . $ord_ser_vo->getTelefono() . "', " . $ord_ser_vo->getTipo_serv_id() . ", "
                . "" . $ord_ser_vo->getTipo_env_id() . ", '" . $ord_ser_vo->getObservacion() . "');";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que consulta la informacion del ultimo registro en orden_serv
     * por cliente 
     * @param type $tipoDoc
     * @param type $numDoc
     * @return type
     */
    function consultaUltimaOS($tipoDoc, $numDoc) {
        $sql = "SELECT * FROM orden_serv "
                . "WHERE os_id = (SELECT MAX(os_id) FROM orden_serv "
                . "WHERE cli_td_id =  " . $tipoDoc . " AND cli_num_doc = " . $numDoc . ");";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta el numero de id del ultimo registro en orden_serv
     * por cliente 
     * @return type
     */
    function consulta_id_UltimaOS() {
        $sql = "SELECT MAX(os_id) AS num FROM orden_serv;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta datos del ultimo registro en orden_serv
     * @return type
     */
    function consulta_datos_UltimaOS() {
        $sql = "SELECT o.*, c.ciu_nombre, ts.ts_desc, te.te_desc "
                . "FROM orden_serv AS o, ciudad AS c, tipo_serv AS ts, tipo_envio AS te "
                . "WHERE o.os_id = (SELECT MAX(os_id) AS num FROM orden_serv) AND o.ciu_id = c.ciu_id "
                . "AND o.ts_id = ts.ts_id AND o.te_id = te.te_id;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta orden de servicio por numero
     * @param type $num_os
     * @return type
     */
    function consulta_os_num($num_os) {
        $sql = "SELECT os.*, cl.cli_nombre, exs.os_id, MAX(exs.es_id) AS ult_estado, MAX(exs.exs_fecha_hora) AS fecha "
                . "FROM orden_serv AS os, clientes AS cl, est_x_serv AS exs "
                . "WHERE os.cli_td_id = cl.cli_td_id AND os.cli_num_doc = cl.cli_num_doc AND exs.os_id = os.os_id AND os.os_id =" . $num_os . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que actualiza una orden de servicio
     * @param type $ordenServ_vo
     * @return type
     */
    function actualizarOS($ordenServ_vo) {
        $sql = "UPDATE orden_serv SET "
                . "ciu_id = " . $ordenServ_vo->getCod_ciudad() . ", "
                . "os_direccion = '" . $ordenServ_vo->getDireccion() . "', "
                . "os_per_cont = '" . $ordenServ_vo->getPer_contacto() . "', "
                . "os_tel_cont = '" . $ordenServ_vo->getTelefono() . "', "
                . "ts_id = " . $ordenServ_vo->getTipo_serv_id() . ", "
                . "te_id = " . $ordenServ_vo->getTipo_env_id() . ", "
                . "os_observacion = '" . $ordenServ_vo->getObservacion() . "' "
                . "WHERE orden_serv.os_id = " . $ordenServ_vo->getNumero() . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que inserta un registro en tabla os_x_suc
     * @param type $num_os
     * @param type $num_suc
     * @return type
     */
    function insertarOS_x_SUC($num_os, $num_suc) {
        $sql = "INSERT INTO os_x_suc VALUES (" . $num_os . ", " . $num_suc . ");";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que consulta el numero de id del ultimo registro en orden_serv
     * por cliente y por tipo de servicio
     * @param type $tipo_doc
     * @param type $num_doc
     * @param type $tipo_serv
     * @return type
     */
    function consulta_id_UltimaOS_x_cli($tipo_doc, $num_doc, $tipo_serv) {
        $sql = "SELECT MAX(os_id) AS num FROM orden_serv "
                . "WHERE cli_td_id = " . $tipo_doc . " AND cli_num_doc = " . $num_doc . " AND ts_id = " . $tipo_serv . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta la ultima OS segun tipo servicio tipo envio y cliente
     * @param type $tipo_serv
     * @param type $tipo_envio
     * @param type $tipo_doc
     * @param type $num_doc
     * @return type
     */
    function consulta_UltimaOS_x_ts_te($tipo_serv, $tipo_envio, $tipo_doc, $num_doc) {
        $sql = "SELECT o.*, es.es_id, es.exs_fecha_hora FROM orden_serv AS o, est_x_serv AS es "
                . "WHERE o.os_id = es.os_id AND es.exs_fecha_hora > CURDATE() "
                . "AND o.ts_id = " . $tipo_serv . " AND o.te_id = " . $tipo_envio . " "
                . "AND o.cli_td_id = " . $tipo_doc . " AND o.cli_num_doc = " . $num_doc . " "
                . "ORDER BY o.os_id DESC LIMIT 1;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta el total de envios cargados a la orden
     * @param type $num_os
     * @return type
     */
    function consulta_total_envios($num_os) {
        $sql = "SELECT COUNT(*) AS total, s.*, c.ciu_nombre, ts.ts_desc, te.te_desc "
                . "FROM envio AS e, orden_serv AS s, tipo_serv AS ts, ciudad AS c, tipo_envio AS te "
                . "WHERE ts.ts_id = s.ts_id AND e.os_id = s.os_id AND s.ciu_id = c.ciu_id AND s.te_id = te.te_id "
                . "AND e.os_id = " . $num_os . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta el total de aenvios cargados a la orden alistamiento
     * @param type $num_os
     * @return type
     */
    function consulta_total_aenvios($num_os) {
        $sql = "SELECT COUNT(*) AS total, s.*, c.ciu_nombre, ts.ts_desc, te.te_desc, oxs.suc_num_id  "
                . "FROM a_envio AS e, orden_serv AS s, tipo_serv AS ts, ciudad AS c, tipo_envio AS te, os_x_suc AS oxs "
                . "WHERE ts.ts_id = s.ts_id AND e.os_id = s.os_id AND s.ciu_id = c.ciu_id AND s.te_id = te.te_id "
                . "AND s.os_id = oxs.os_id AND e.os_id = " . $num_os . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta los datos de sucursal segun num os
     * @param type $num_os
     * @return type
     */
    function consulta_datos_suc_os($num_os) {
        $sql = "SELECT oxs.*, s.suc_nombre "
                . "FROM os_x_suc AS oxs, sucursales AS s "
                . "WHERE oxs.suc_num_id = s.suc_num_id AND oxs.os_id = " . $num_os . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
