<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Depto_DAO
 *
 * @author Andres
 */
class Depto_DAO {
    //put your code here

    /**
     * Funcion que consulta la informacion en tabla depto
     * @return type
     */
    function consultaDepto() {
        $sql = "SELECT * FROM departamento;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    function consultaDepto_x_ciu($cod_ciu) {
        $sql = "SELECT c.ciu_id, c.ciu_nombre, d.* FROM ciudad AS c, departamento AS d "
                . "WHERE c.dep_id = d.dep_id AND c.ciu_id = " . $cod_ciu . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
