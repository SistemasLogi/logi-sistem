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
     * Funcion que inserta un registro en tabla clientes
     * @param type $cliente_vo
     */
    function insertarCliente($cliente_vo) {
        $sql = "INSERT INTO clientes VALUES (" . $cliente_vo->getTipo_doc() . ", " . $cliente_vo->getNum_doc() . ", "
                . "'" . $cliente_vo->getNombre() . "', '" . $cliente_vo->getTelefono() . "', '" . $cliente_vo->getCelular() . "', "
                . "'" . $cliente_vo->getDireccion() . "','" . $cliente_vo->getPcontac() . "')";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que actualiza un registro en tabla clientes
     * @param type $cliente_vo
     */
    function actualizarCliente($cliente_vo) {
        $sql = "UPDATE clientes SET cli_nombre = '" . $cliente_vo->getNombre() . "', "
                . "cli_tel = '" . $cliente_vo->getTelefono() . "', cli_cel = '" . $cliente_vo->getCelular() . "',"
                . "cli_direccion = '" . $cliente_vo->getDireccion() . "', cli_per_cont = '" . $cliente_vo->getPcontac() . "' "
                . "WHERE cli_td_id = " . $cliente_vo->getTipo_doc() . " AND cli_num_doc = " . $cliente_vo->getNum_doc() . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que consulta los clientes activos
     * @param type $cliente_vo
     */
    function consultarClientesActivos() {
        $sql = "SELECT c.*, u.tu_id, t.tu_tipo, d.td_sigla "
                . "FROM clientes AS c, usuario_pass AS u, tipo_doc AS d, tipo_usuario AS t "
                . "WHERE c.cli_td_id = u.us_td_id AND c.cli_num_doc = u.us_num_doc "
                . "AND c.cli_td_id = d.td_id AND u.tu_id = t.tu_id AND u.tu_id != 3 "
                . "ORDER BY c.cli_nombre ASC;";
        $BD = new MySQL();
//        return $sql;
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta datos de cliente por parametro
     * @param type $td_id
     * @param type $num_doc
     * @return type
     */
    function consultarCliente_x_ident($td_id, $num_doc) {
        $sql = "SELECT * FROM clientes WHERE cli_td_id = " . $td_id . " AND cli_num_doc = " . $num_doc . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->query($sql);
    }

}
