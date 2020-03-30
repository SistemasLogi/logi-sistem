<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Ciudad_DAO
 *
 * @author V&G ASESORIAS SAS
 */
class Ciudad_DAO {

    //put your code here
    /**
     * Funcion que consulta la informacion en tabla ciudad
     * @return type
     */
    function consultaCiudades() {
        $sql = "SELECT c.*, d.dep_desc FROM ciudad AS c, departamento AS d "
                . "WHERE c.dep_id = d.dep_id;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta o actualiza un registro en tabla ciudad
     * @param type $ciudad_vo
     */
    function insertarCiudad($ciudad_vo) {
        $sql = "INSERT INTO ciudad (ciu_id, ciu_nombre)VALUES (" . $ciudad_vo->getId_ciudad() . ", '" . $ciudad_vo->getNombre_ciu() . "' )"
                . "ON DUPLICATE KEY UPDATE ciu_nombre = '" . $ciudad_vo->getNombre_ciu() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * funcion que permite eliminar un registro en tabla ciudad
     * enviado por arreglo de datos
     * @param type $id
     */
    function elimCiudad($id) {
        $sql = "DELETE FROM ciudad "
                . "WHERE ciu_id = " . $id . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
