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
     * @param type $ord_ser_vo
     */
    function insertarOrden_serv($ord_ser_vo) {
        $sql = "INSERT INTO orden_serv VALUES (" . $ord_ser_vo->getNumero() . ", " . $ord_ser_vo->getCli_id() . ", "
                . "" . $ord_ser_vo->getCli_docum() . ", " . $ord_ser_vo->getCod_ciudad() . ", "
                . "'" . $ord_ser_vo->getDireccion() . "', '" . $ord_ser_vo->getPer_contacto() . "', "
                . "'" . $ord_ser_vo->getTelefono() . "', '" . $ord_ser_vo->getEnvio() . "')"
                . "ON DUPLICATE KEY UPDATE ciu_id = " . $ord_ser_vo->getCli_id() . ", os_direccion = '" . $ord_ser_vo->getDireccion() . "', "
                . "os_per_cont = '" . $ord_ser_vo->getPer_contacto() . "', os_tel_cont = '" . $ord_ser_vo->getTelefono() . "', "
                . "os_tipo_envio = '" . $ord_ser_vo->getEnvio() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
