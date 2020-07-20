<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Operadores_DAO
 *
 * @author Andres
 */
class Operadores_DAO {
    //put your code here

    /**
     * Funcion que consulta la informacion en tabla operadores
     * @return type
     */
    function consultaOperadores() {
        $sql = "SELECT * FROM operador;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta o actualiza un registro en tabla operador
     * @param type $operador_vo
     */
    function insertarOperador($operador_vo) {
        $sql = "INSERT INTO operador (ope_id, ope_nombre)VALUES (" . $operador_vo->getOper_id() . ", "
                . "'" . $operador_vo->getOpera_nombre() . "')"
                . "ON DUPLICATE KEY UPDATE ope_nombre = '" . $operador_vo->getOpera_nombre() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
