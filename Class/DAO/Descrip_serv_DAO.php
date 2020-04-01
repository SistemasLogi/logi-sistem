<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Descrip_serv_DAO
 *
 * @author Andres
 */
class Descrip_serv_DAO {
    //put your code here

    /**
     * Funcion que inserta o actualiza un registro en tabla orden_serv
     * @param type $desc_or_vo
     */
    function insertarDescrip_serv($desc_or_vo) {
        $sql = "INSERT INTO descrip_serv VALUES (" . $desc_or_vo->getOs_id() . ", " . $desc_or_vo->getCsc() . ", "
                . "" . $desc_or_vo->getTs_id() . ", " . $desc_or_vo->getCantidad_env() . ", '" . $desc_or_vo->getContenido() . "')"
                . "ON DUPLICATE KEY UPDATE ts_id = " .  $desc_or_vo->getTs_id() . ", dos_cant = " . $desc_or_vo->getCantidad_env() . ", "
                . "dos_contiene = '" . $desc_or_vo->getContenido() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
