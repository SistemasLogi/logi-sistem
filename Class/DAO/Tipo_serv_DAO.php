<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tipo_serv_DAO
 *
 * @author Andres
 */
class Tipo_serv_DAO {
    //put your code here

    /**
     * Funcion que consulta la informacion en tabla tipo_serv
     * @return type
     */
    function consultaTipoServ() {
        $sql = "SELECT * FROM tipo_serv;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta o actualiza un registro en tabla tipo_serv
     * @param type $tipo_serv_vo
     */
    function insertarTipoServ($tipo_serv_vo) {
        $sql = "INSERT INTO tipo_serv (ts_id, ts_desc)VALUES (" . $tipo_serv_vo->getCod_serv() . ", "
                . "'" . $tipo_serv_vo->getNom_serv() . "')"
                . "ON DUPLICATE KEY UPDATE ts_desc = '" . $tipo_serv_vo->getNom_serv() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * funcion que permite eliminar un registro en tabla tipo_serv
     * @param type $id
     */
    function elimTipoServ($id) {
        $sql = "DELETE FROM tipo_serv "
                . "WHERE ts_id = " . $id . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
