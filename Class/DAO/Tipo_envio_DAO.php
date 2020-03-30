<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tipo_envio_DAO
 *
 * @author Andres
 */
class Tipo_envio_DAO {
    //put your code here

    /**
     * Funcion que consulta la informacion en tabla tipo_envio
     * @return type
     */
    function consultaTipoEnv() {
        $sql = "SELECT * FROM tipo_envio;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta o actualiza un registro en tabla tipo_env
     * @param type $tipo_env_vo
     */
    function insertarTipoEnv($tipo_env_vo) {
        $sql = "INSERT INTO tipo_envio (te_id, te_desc)VALUES (" . $tipo_env_vo->getCod_env() . ", "
                . "'" . $tipo_env_vo->getEnv_desc() . "')"
                . "ON DUPLICATE KEY UPDATE te_desc = '" . $tipo_env_vo->getEnv_desc() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * funcion que permite eliminar un registro en tabla tipo_envio
     * @param type $id
     */
    function elimTipoEnv($id) {
        $sql = "DELETE FROM tipo_envio "
                . "WHERE te_id = " . $id . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
