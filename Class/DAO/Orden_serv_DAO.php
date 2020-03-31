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

    /**
     * Funcion que consulta la informacion del ultimo registro en orden_serv
     * por cliente 
     * @param type $tipoDoc
     * @param type $numDoc
     * @return type
     */
    function consultaUltimaOS($tipoDoc, $numDoc) {
        $sql = "SELECT * FROM orden_serv "
                . "WHERE cli_td_id = " . $tipoDoc . " "
                . "AND cli_num_doc = " . $numDoc . " AND os_id = (SELECT MAX(os_id) FROM orden_serv);";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
