<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tipo_doc_DAO
 *
 * @author Andres
 */
class Tipo_doc_DAO {

    //put your code here
    /**
     * Funcion que consulta la informacion en tabla tipo_doc
     * @return type
     */
    function consultaTipoDoc() {
        $sql = "SELECT * FROM tipo_doc;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta o actualiza un registro en tabla tipo_doc
     * @param type $tipo_doc_vo
     */
    function insertarTipoDoc($tipo_doc_vo) {
        $sql = "INSERT INTO tipo_doc (td_id, td_sigla, td_desc)VALUES (" . $tipo_doc_vo->getCod_td() . ", "
                . "'" . $tipo_doc_vo->getSigla() . "', '" . $tipo_doc_vo->getDesc_td() . "' )"
                . "ON DUPLICATE KEY UPDATE td_sigla = '" . $tipo_doc_vo->getSigla() . "', "
                . "td_desc = '" . $tipo_doc_vo->getDesc_td() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * funcion que permite eliminar un registro en tabla tipo_doc
     * @param type $id
     */
    function elimTipoDoc($id) {
        $sql = "DELETE FROM tipo_doc "
                . "WHERE td_id = " . $id . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
