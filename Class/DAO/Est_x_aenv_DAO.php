<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Est_x_aenv_DAO
 *
 * @author Andres
 */
class Est_x_aenv_DAO {
    //put your code here

    /**
     * Funcion que inserta los estados de envios de alistamiento
     * @param type $est_id
     * @param type $fech_hora
     * @param type $novedad
     * @param type $os_id
     * @return type
     */
    function insertarEstados_x_AEnvio($est_id, $fech_hora, $novedad, $os_id) {
        $sql = "INSERT INTO est_x_aenv "
                . "SELECT aen_id, " . $est_id . " AS est, '" . $fech_hora . "' AS fecha, '" . $novedad . "' AS novedad "
                . "FROM a_envio WHERE os_id = " . $os_id . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
