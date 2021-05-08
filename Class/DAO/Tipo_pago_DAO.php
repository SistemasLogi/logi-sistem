<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tipo_pago_DAO
 *
 * @author TECNOLOGIA-LOGI
 */
class Tipo_pago_DAO {
    //put your code here

    /**
     * Funcion que consulta la informacion en tabla tipo_pago
     * @return type
     */
    function consultaTipoPago() {
        $sql = "SELECT * FROM tipo_pago;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
