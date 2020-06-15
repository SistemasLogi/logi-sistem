<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_x_env_DAO
 *
 * @author Andres
 */
class Estado_x_env_DAO {
    //put your code here

    /**
     * Funcion que inserta datos en tabla est_x_envio
     * @param type $ord_ser_vo
     */
    function insertarEstado_x_envio($ord_ser_vo) {
        $sql = "INSERT INTO est_x_envio (SELECT e.en_id, 9 AS estado, (SELECT now()) AS fecha, '' AS novedad, "
                . "1 AS td_id, 162534495867 AS num_doc "
                . "FROM envio AS e WHERE os_id = " . $ord_ser_vo . ");";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
