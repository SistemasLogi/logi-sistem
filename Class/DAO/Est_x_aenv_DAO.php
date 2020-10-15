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

}
