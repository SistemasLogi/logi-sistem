<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_x_env_DAO
 *
 * @author Andres
 */
class Estado_x_env_DAO {
    //put your code here

    /**
     * Funcion que inserta datos en tabla est_x_envio por consulta de orden de servocio
     * @param type $ord_ser_vo
     */
    function insertarEstado_x_envio($ord_ser_vo) {
        $sql = "INSERT INTO est_x_envio (SELECT e.en_id, 1 AS estado, (SELECT now()) AS fecha, '' AS novedad, "
                . "1 AS td_id, 162534495867 AS num_doc "
                . "FROM envio AS e WHERE os_id = " . $ord_ser_vo . ");";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna los envios segun su estado
     * @param type $parametros
     * @return type
     */
    function consultaEnv_x_Estado($parametros) {
        $sql = "SELECT TM.*, e.en_guia, e.os_id, e.en_nombre, e.en_direccion, e.en_ciudad, ee.ee_desc "
                . "FROM (SELECT T1.* FROM est_x_envio AS T1 "
                . "WHERE T1.exe_fec_hora = (SELECT MAX(T2.exe_fec_hora) FROM est_x_envio AS T2 WHERE T1.exe_en_id = T2.exe_en_id) ORDER BY T1.exe_fec_hora DESC)AS TM, "
                . "envio AS e, estado_env AS ee "
                . "WHERE TM.exe_en_id = e.en_id AND TM.exe_ee_id = ee.ee_id " . $parametros . "";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta un registro en tabla est_x_envio
     * @param type $est_x_env_vo
     */
    function insertarEstado_x_envio_general($est_x_env_vo) {
        $sql = "INSERT INTO est_x_envio VALUES (" . $est_x_env_vo->getEnvio_id() . ", " . $est_x_env_vo->getEst_env_id() . ", "
                . "'" . $est_x_env_vo->getFecha_hora() . "', '" . $est_x_env_vo->getNovedad() . "', " . $est_x_env_vo->getTd_mensajero() . ", "
                . "" . $est_x_env_vo->getNum_doc_men() . ")";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
