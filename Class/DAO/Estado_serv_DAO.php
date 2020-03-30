<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_serv_DAO
 *
 * @author Andres
 */
class Estado_serv_DAO {
    //put your code here

    /**
     * Funcion que consulta la informacion en tabla estado_serv
     * @return type
     */
    function consultaEstadoServ() {
        $sql = "SELECT * FROM estado_serv;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta o actualiza un registro en tabla estado_serv
     * @param type $est_serv_vo
     */
    function insertarEstServ($est_serv_vo) {
        $sql = "INSERT INTO estado_serv (es_id, es_desc)VALUES (" . $est_serv_vo->getCod_estado_serv() . ", "
                . "'" . $est_serv_vo->getDesc_estado_serv() . "')"
                . "ON DUPLICATE KEY UPDATE es_desc = '" . $est_serv_vo->getDesc_estado_serv() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * funcion que permite eliminar un registro en tabla estado_serv
     * @param type $id
     */
    function elimEstServ($id) {
        $sql = "DELETE FROM estado_serv "
                . "WHERE es_id = " . $id . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
