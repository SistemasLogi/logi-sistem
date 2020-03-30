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

}
