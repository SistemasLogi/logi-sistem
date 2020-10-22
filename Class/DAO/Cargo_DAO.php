<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Cargo_DAO
 *
 * @author TECNOLOGIA-LOGI
 */
class Cargo_DAO {
    //put your code here

    /**
     * Funcion que consulta la informacion en tabla ciudad
     * @return type
     */
    function consultaCargos() {
        $sql = "SELECT * FROM cargo ORDER BY car_id DESC;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
