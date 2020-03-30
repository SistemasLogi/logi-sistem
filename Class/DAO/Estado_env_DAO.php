<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_env_DAO
 *
 * @author Andres
 */
class Estado_env_DAO {
    //put your code here

    /**
     * Funcion que consulta la informacion en tabla estado_serv
     * @return type
     */
    function consultaEstadoEnv() {
        $sql = "SELECT * FROM estado_env;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta o actualiza un registro en tabla estado_env
     * @param type $est_env_vo
     */
    function insertarEstEnv($est_env_vo) {
        $sql = "INSERT INTO estado_env (ee_id, ee_desc)VALUES (" . $est_env_vo->getCod_es_env() . ", "
                . "'" . $est_env_vo->getDesc_es_env() . "')"
                . "ON DUPLICATE KEY UPDATE ee_desc = '" . $est_env_vo->getDesc_es_env() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * funcion que permite eliminar un registro en tabla estado_env
     * @param type $id
     */
    function elimEstEnv($id) {
        $sql = "DELETE FROM estado_env "
                . "WHERE ee_id = " . $id . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
