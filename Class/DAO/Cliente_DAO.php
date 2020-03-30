<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Cliente_DAO
 *
 * @author V&G ASESORIAS SAS
 */
class Cliente_DAO {

    //put your code here
    /**
     * Funcion que retorna los datos de tipos de usuario del sistema
     * @return type
     */
    function consultaCliente($documento) {
        $sql = "SELECT T1.*, T2.* FROM "
                . "(SELECT * FROM clientes WHERE cli_num_doc = " . $documento . " )AS T1 "
                . "LEFT JOIN(SELECT u.us_td_id, u.us_num_doc, u.tu_id, d.td_sigla, d.td_desc, t.tu_tipo "
                . "FROM usuario_pass AS u, tipo_doc AS d, tipo_usuario t "
                . "WHERE u.us_td_id = d.td_id AND u.tu_id = t.tu_id "
                . "AND u.us_num_doc = " . $documento . ") AS T2 ON T1.cli_td_id = T2.us_td_id "
                . "AND T1.cli_num_doc = T2.us_num_doc;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta o actualiza un registro en tabla clientes
     * @param type $cliente_vo
     */
    function insertarCliente($cliente_vo) {
        $sql = "INSERT INTO clientes VALUES (" . $cliente_vo->getTipo_doc() . ", " . $cliente_vo->getNum_doc() . ", "
                . "'" . $cliente_vo->getNombre() . "', '" . $cliente_vo->getTelefono() . "', '" . $cliente_vo->getCelular() . "', "
                . "'" . $cliente_vo->getDireccion() . "','" . $cliente_vo->getPcontac() . "')"
                . "ON DUPLICATE KEY UPDATE cli_nombre = '" . $cliente_vo->getNombre() . "', "
                . "cli_tel = '" . $cliente_vo->getTelefono() . "', cli_cel = '" . $cliente_vo->getCelular() . "',"
                . "cli_direccion = '" . $cliente_vo->getDireccion() . "', cli_per_cont = '" . $cliente_vo->getPcontac() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
