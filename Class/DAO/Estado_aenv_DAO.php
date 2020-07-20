<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_aenv_DAO
 *
 * @author Andres
 */
class Estado_aenv_DAO {
    //put your code here

    /**
     * Funcion que consulta la informacion en tabla estado_aenv
     * @return type
     */
    function consultaEstadoAEnv() {
        $sql = "SELECT * FROM estados_aenv;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta o actualiza un registro en tabla estados_aenv
     * @param type $est_aenv_vo
     */
    function insertarAEstEnv($est_aenv_vo) {
        $sql = "INSERT INTO estados_aenv (esae_id, esae_desc)VALUES (" . $est_aenv_vo->getEst_aenv_id() . ", "
                . "'" . $est_aenv_vo->getEst_aenv_desc() . "')"
                . "ON DUPLICATE KEY UPDATE esae_desc = '" . $est_aenv_vo->getEst_aenv_desc() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
