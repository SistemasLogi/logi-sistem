<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Est_x_serv_DAO
 *
 * @author Andres
 */
class Est_x_serv_DAO {
    //put your code here

    /**
     * Funcion que inserta o actualiza un registro en tabla est_x_serv
     * @param type $estXserv_vo
     */
    function insertarOrden_serv($estXserv_vo) {
        $sql = "INSERT INTO est_x_serv VALUES (" . $estXserv_vo->getOrden_id() . ", " . $estXserv_vo->getOrd_csc_id() . ", "
                . "" . $estXserv_vo->getEstado_id() . ", '" . $estXserv_vo->getFecha_hora() . "', "
                . "'" . $estXserv_vo->getNovedad() . "')"
                . "ON DUPLICATE KEY UPDATE exs_fecha_hora = '" . $estXserv_vo->getFecha_hora() . "', "
                . "exs_novedad = '" . $estXserv_vo->getNovedad() . "'";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
