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
     * para estado programado
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
        $sql = "SELECT TM.*, e.en_guia, e.os_id, e.en_nombre, e.en_direccion, e.en_ciudad, ee.ee_desc, os.ts_id "
                . "FROM (SELECT T1.* FROM est_x_envio AS T1 "
                . "WHERE T1.exe_fec_hora = (SELECT MAX(T2.exe_fec_hora) FROM est_x_envio AS T2 WHERE T1.exe_en_id = T2.exe_en_id) ORDER BY T1.exe_fec_hora DESC)AS TM, "
                . "envio AS e, estado_env AS ee, orden_serv AS os "
                . "WHERE TM.exe_en_id = e.en_id AND TM.exe_ee_id = ee.ee_id AND e.os_id = os.os_id " . $parametros . "";
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

    /**
     * Funcion que actualiza estado de un registro en tabla est_x_envio
     * @param type $guia
     * @param type $estado
     * @param type $fecha
     * @param type $novedad
     * @return type
     */
    function actualizaNovedad_env($guia, $estado, $fecha, $novedad) {
        $sql = "UPDATE est_x_envio SET exe_novedad = '" . $novedad . "' "
                . "WHERE exe_en_id = " . $guia . " AND exe_ee_id = " . $estado . " "
                . "AND exe_fec_hora = '" . $fecha . "';";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna datos del ultimo estado de envio por numero guia logi
     * @param type $env_id
     * @return type
     */
    function consultaEnv_x_id($env_id) {
        $sql = "SELECT e.*, o.ciu_id, o.os_direccion, o.os_per_cont, o.os_tel_cont, o.te_id, o.ts_id, "
                . "o.os_observacion, c.*, es.exe_fec_hora, ee.ee_desc, ee.ee_id, cd.ciu_nombre, d.* "
                . "FROM envio AS e, orden_serv AS o, clientes AS c, est_x_envio AS es, estado_env AS ee, "
                . "ciudad AS cd, departamento AS d "
                . "WHERE e.os_id = o.os_id AND o.cli_td_id = c.cli_td_id AND o.cli_num_doc = c.cli_num_doc "
                . "AND es.exe_en_id = e.en_id AND es.exe_ee_id = ee.ee_id "
                . "AND cd.ciu_id = o.ciu_id "
                . "AND cd.dep_id = d.dep_id AND e.en_id = " . $env_id . " ORDER BY es.exe_fec_hora DESC LIMIT 1;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * funcion que permite eliminar un registro en tabla est_x_envio
     * @param type $envio_id
     * @param type $estado_id
     * @param type $fecha_est
     * @return type
     */
    function eliminar_est_env($envio_id, $estado_id, $fecha_est) {
        $sql = "DELETE FROM est_x_envio "
                . "WHERE exe_en_id = " . $envio_id . " AND exe_ee_id = " . $estado_id . " AND exe_fec_hora = '" . $fecha_est . "';";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna datos de seguimiento de envio segun parametro
     * @param type $parametro
     * @return type
     */
    function consulta_seguimiento_env_x_id($parametro) {
        $sql = "SELECT e.*, o.*, c.*, es.exe_fec_hora, es.exe_novedad, es.td_id_men, es.num_doc_men, "
                . "em.emp_nombre, ee.ee_desc, ee.ee_id, cd.ciu_nombre, d.* "
                . "FROM envio AS e, orden_serv AS o, clientes AS c, est_x_envio AS es, estado_env AS ee, "
                . "ciudad AS cd, departamento AS d, empleados AS em "
                . "WHERE e.os_id = o.os_id AND o.cli_td_id = c.cli_td_id AND o.cli_num_doc = c.cli_num_doc "
                . "AND es.exe_en_id = e.en_id AND es.exe_ee_id = ee.ee_id AND cd.ciu_id = o.ciu_id "
                . "AND cd.dep_id = d.dep_id AND es.td_id_men = em.emp_td_id AND es.num_doc_men = em.emp_num_doc "
                . "" . $parametro . " ORDER BY es.exe_fec_hora ASC;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna datos de el ultimo estado de todos los envios
     * @param type $param
     * @return type
     */
    function consulta_ultimo_est_envios($param) {
        $sql = "SELECT TM.*, e.en_guia, e.os_id, e.en_cantidad, e.en_nombre, e.en_direccion, e.en_telefono, "
                . "e.en_ciudad, e.en_departamento, e.en_contiene, e.en_valor_decl, em.emp_nombre, es.ee_desc, "
                . "o.ts_id, ts.ts_desc, o.te_id, te.te_desc "
                . "FROM "
                . "(SELECT T1.* FROM est_x_envio AS T1 WHERE T1.exe_fec_hora = (SELECT MAX(T2.exe_fec_hora)"
                . "FROM est_x_envio AS T2 WHERE T1.exe_en_id = T2.exe_en_id)"
                . "ORDER BY T1.exe_fec_hora DESC) AS TM, envio AS e, empleados AS em, estado_env AS es, "
                . "orden_serv AS o, tipo_serv AS ts, tipo_envio AS te "
                . "WHERE TM.exe_en_id = e.en_id AND em.emp_td_id = TM.td_id_men "
                . "AND em.emp_num_doc = TM.num_doc_men AND TM.exe_ee_id = es.ee_id AND e.os_id = o.os_id "
                . "AND o.ts_id = ts.ts_id AND o.te_id = te.te_id "
                . "" . $param . "";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
