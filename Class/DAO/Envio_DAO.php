<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Envio_DAO
 *
 * @author Andres
 */
class Envio_DAO {

    //put your code here
    /**
     * funcion que retorna la informacion de envios por numero de orden de servicio
     * @param type $num_os
     * @return type
     */
    function consultaEnvIng_x_os($num_os) {
        $sql = "SELECT * FROM envio WHERE os_id = " . $num_os . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
