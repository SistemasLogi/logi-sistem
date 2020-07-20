<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AEnvio_DAO
 *
 * @author Andres
 */
class AEnvio_DAO {
    //put your code here

    /**
     * Funcion que inserta un registro en tabla a_envio
     * @param type $obj_aenv_vo
     */
    function insertarAlistEnvio($obj_aenv_vo) {
        $sql = "INSERT INTO a_envio VALUES (null,'" . $obj_aenv_vo->getAenv_guia() . "', " . $obj_aenv_vo->getAenv_os_id() . ", "
                . "" . $obj_aenv_vo->getAenv_operador_id() . ", " . $obj_aenv_vo->getAenv_cantidad() . ");";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
