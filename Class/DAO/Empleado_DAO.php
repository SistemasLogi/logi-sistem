<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Empleado_DAO
 *
 * @author Andres
 */
class Empleado_DAO {

    /**
     * Funcion que retorna los datos de todos los empleados activos
     * @return type
     */
    function consultaEmpleados() {
        $sql = "SELECT ue.car_id, c.car_nombre, e.* "
                . "FROM usuario_emp_pass AS ue, cargo AS c, empleados AS e "
                . "WHERE ue.ue_td_id = e.emp_td_id AND ue.ue_num_doc = e.emp_num_doc AND ue.car_id = c.car_id;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna los datos de todos los empleados activos
     * con filtro de seleccion
     * @param type $filtro
     * @return type
     */
    function consultaEmpleadosParam($filtro) {
        $sql = "SELECT ue.car_id, c.car_nombre, e.* "
                . "FROM usuario_emp_pass AS ue, cargo AS c, empleados AS e "
                . "WHERE ue.ue_td_id = e.emp_td_id AND ue.ue_num_doc = e.emp_num_doc AND ue.car_id = c.car_id " . $filtro . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta un registro en tabla empleado
     * @param type $empleado_vo
     */
    function insertarEmpleado($empleado_vo) {
        $sql = "INSERT INTO empleados VALUES (" . $empleado_vo->getEmp_tipo_doc() . ", " . $empleado_vo->getEmp_numero_doc() . ", "
                . "'" . $empleado_vo->getEmp_nombre() . "', '" . $empleado_vo->getEmp_telefono() . "', '" . $empleado_vo->getEmp_celular() . "', "
                . "'" . $empleado_vo->getEmp_direccion() . "','" . $empleado_vo->getEmp_correo() . "')";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna los datos del acumulado para pago de mensajero y manifiestos
     * @param type $seper_query
     * @param type $td_mens
     * @param type $num_doc_mens
     * @param type $fecha_ini
     * @param type $fecha_fin
     * @param type $fin_query
     * @return type
     */
    function consultaEmpleadosQuincena($seper_query, $td_mens, $num_doc_mens, $fecha_ini, $fecha_fin, $fin_query) {
        $sql = "" . $seper_query . "SELECT es.*, e.en_guia, e.en_nombre, e.en_direccion, e.en_novedad "
                . "FROM est_x_envio AS es, envio AS e "
                . "WHERE es.exe_en_id = e.en_id AND es.td_id_men = " . $td_mens . " AND es.num_doc_men = " . $num_doc_mens . " "
                . "AND es.exe_ee_id = 5 AND es.exe_fec_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "' "
                . "UNION "
                . "SELECT ess.*, '' AS guia, cl.cli_nombre, s.os_direccion, s.os_observacion "
                . "FROM est_x_serv AS ess, clientes AS cl, orden_serv AS s "
                . "WHERE ess.os_id = s.os_id AND s.cli_td_id = cl.cli_td_id AND s.cli_num_doc = cl.cli_num_doc "
                . "AND ess.td_id_men = " . $td_mens . " AND ess.num_doc_men = " . $num_doc_mens . " "
                . "AND ess.es_id = 2 AND ess.exs_fecha_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "'"
                . "" . $fin_query . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
