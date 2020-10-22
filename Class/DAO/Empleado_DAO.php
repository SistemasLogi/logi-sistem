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

}
