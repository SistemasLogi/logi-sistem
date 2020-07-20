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

}
