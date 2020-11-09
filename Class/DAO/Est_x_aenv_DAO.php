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

    /**
     * Funcion que inserta estado aenvio
     * @param type $est_x_aenv_vo
     * @return type
     */
    function insertarEstados_x_AEnv_obj($est_x_aenv_vo) {
        $sql = "INSERT INTO est_x_aenv VALUES(" . $est_x_aenv_vo->getId_aenv() . ", " . $est_x_aenv_vo->getId_est_aenv() . ", "
                . "'" . $est_x_aenv_vo->getExae_fecha_hora() . "', '" . $est_x_aenv_vo->getExae_novedad() . "');";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que inserta registro en tabla estados x aenvio segun una venta
     * @param type $est_id
     * @param type $fech_hora
     * @param type $novedad
     * @param type $venta
     * @param type $os_id
     * @return type
     */
    function insertarEstado_x_AEnvio_Venta($est_id, $fech_hora, $novedad, $venta, $os_id) {
        $sql = "INSERT INTO est_x_aenv "
                . "SELECT ae.aen_id, " . $est_id . " AS estado, '" . $fech_hora . "' AS fecha, '" . $novedad . "' AS novedad "
                . "FROM a_envio AS ae WHERE ae.aen_venta = " . $venta . " AND ae.os_id = " . $os_id . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna datos de seguimiento de envio en alistamiento segun parametro
     * @param type $parametro
     * @return type
     */
    function consulta_seg_env_alist($parametro) {
        $sql = "SELECT ae.*, o.*, c.*, es.exae_fecha_hora, es.exae_novedad, ee.esae_desc, ee.esae_id, cd.ciu_nombre, d.*, op.ope_nombre "
                . "FROM a_envio AS ae, orden_serv AS o, clientes AS c, est_x_aenv AS es, estados_aenv AS ee, "
                . "ciudad AS cd, departamento AS d, operador AS op "
                . "WHERE ae.os_id = o.os_id AND o.cli_td_id = c.cli_td_id AND o.cli_num_doc = c.cli_num_doc "
                . "AND op.ope_id = ae.ope_id AND es.aen_id = ae.aen_id AND es.esae_id = ee.esae_id "
                . "AND cd.ciu_id = o.ciu_id AND cd.dep_id = d.dep_id " . $parametro . " "
                . "ORDER BY es.esae_id ASC, es.exae_fecha_hora ASC;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna datos de historico de estados en alistamiento
     * @param type $parametro
     * @return type
     */
    function consulta_aenv_hist_est($parametro) {
        $sql = "SELECT TM.*, es.esae_desc, ae.aen_guia_op, ae.aen_venta, ae.os_id, ae.ope_id, op.ope_nombre, os.cli_td_id, "
                . "os.cli_num_doc, cl.cli_nombre, oxs.suc_num_id, suc.suc_nombre "
                . "FROM "
                . "(SELECT T1.* FROM est_x_aenv AS T1 WHERE T1.exae_fecha_hora = (SELECT MAX(T2.exae_fecha_hora) "
                . "FROM est_x_aenv AS T2 WHERE T1.aen_id = T2.aen_id)  AND T1.esae_id = (SELECT MAX(T2.esae_id) FROM est_x_aenv AS T2 WHERE T1.aen_id = T2.aen_id) "
                . "ORDER BY T1.exae_fecha_hora DESC) AS TM, estados_aenv AS es, a_envio AS ae, operador AS op, orden_serv AS os, "
                . "clientes AS cl, os_x_suc AS oxs, sucursales AS suc "
                . "WHERE TM.esae_id = es.esae_id AND TM.aen_id = ae.aen_id AND ae.ope_id = op.ope_id AND ae.os_id = os.os_id "
                . "AND cl.cli_td_id = os.cli_td_id AND cl.cli_num_doc = os.cli_num_doc AND oxs.os_id = os.os_id AND oxs.suc_num_id = suc.suc_num_id "
                . "" . $parametro . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
