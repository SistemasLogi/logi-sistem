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
    function insertar_est_x_os($estXserv_vo) {
        $sql = "INSERT INTO est_x_serv VALUES (" . $estXserv_vo->getOrden_id() . ", "
                . "" . $estXserv_vo->getEstado_id() . ", '" . $estXserv_vo->getFecha_hora() . "', "
                . "'" . $estXserv_vo->getNovedad() . "', " . $estXserv_vo->getTd_mensajero() . ", " . $estXserv_vo->getNum_doc_mensajero() . ");";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que consulta la informacion de ordenes segun su ultimo estado
     * @param type $param
     * @return type
     */
    function consultaUltimoEstadoOS($param) {
        $sql = "SELECT TM.*, em.emp_nombre, es.es_desc, ord.cli_td_id, ord.cli_num_doc, cl.cli_nombre, "
                . "ord.os_direccion, ord.ciu_id, ciu.ciu_nombre, ord.os_tel_cont, ord.os_per_cont, ord.os_observacion, ord.ts_id, ts.ts_desc, ord.te_id, te.te_desc "
                . "FROM (SELECT T1.* FROM est_x_serv AS T1 WHERE T1.es_id =(SELECT MAX(T2.es_id)FROM est_x_serv AS T2 "
                . "WHERE T1.os_id = T2.os_id) ORDER BY T1.exs_fecha_hora DESC)AS TM, "
                . "empleados AS em, estado_serv AS es, orden_serv AS ord, clientes AS cl, tipo_serv AS ts, tipo_envio AS te, ciudad AS ciu "
                . "WHERE TM.td_id_men = em.emp_td_id AND TM.num_doc_men = em.emp_num_doc AND TM.es_id = es.es_id "
                . "AND TM.os_id = ord.os_id AND ord.cli_td_id = cl.cli_td_id AND ord.cli_num_doc = cl.cli_num_doc "
                . "AND ord.ts_id = ts.ts_id AND ord.te_id = te.te_id AND ord.ciu_id = ciu.ciu_id" . $param . "";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna numero de orden estado y fecha hora de el registro mas reciente
     * @return type
     */
    function consultaUltimaOS_x_estado() {
        $sql = "SELECT os_id, es_id, MAX(exs_fecha_hora) AS fecha FROM est_x_serv WHERE es_id = 1;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta la informacion de ordenes segun su ultimo estado
     * @param type $param
     * @return type
     */
    function consultaSeguimientoEstadoOS($param) {
        $sql = "SELECT exs.*, o.cli_td_id, o.cli_num_doc, cl.cli_nombre, o.os_direccion, o.os_tel_cont, o.ts_id, ts.ts_desc, "
                . "o.te_id, te.te_desc, em.emp_nombre, es.es_desc, o.ciu_id, ciu.ciu_nombre "
                . "FROM est_x_serv AS exs, orden_serv AS o, clientes AS cl, tipo_serv AS ts, tipo_envio AS te, empleados AS em, estado_serv AS es, ciudad AS ciu "
                . "WHERE exs.os_id = o.os_id AND o.cli_td_id = cl.cli_td_id AND o.cli_num_doc = cl.cli_num_doc AND o.ts_id = ts.ts_id "
                . "AND o.te_id = te.te_id AND exs.td_id_men = em.emp_td_id AND exs.num_doc_men = em.emp_num_doc AND es.es_id = exs.es_id AND o.ciu_id = ciu.ciu_id AND exs.os_id = " . $param . " "
                . "ORDER BY exs.es_id ASC;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
