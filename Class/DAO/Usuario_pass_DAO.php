<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Usuario_pass_DAO
 *
 * @author V&G ASESORIAS SAS
 */
class Usuario_pass_DAO {

//put your code here
    /**
     * Funcion que retorna los datos de un usuario_pass
     * @param type $num_usu
     * @return type
     */
    function consultaAdmin($num_usu) {
        $sql = "SELECT * FROM usuario_emp_pass WHERE ue_num_doc = " . $num_usu . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion de uso exclusivo para el primer administrador ingresado a la base de datos
     * necesaria para encriptar la contraseña y permitir el ingreso
     * @param type $usu_pass_vo
     */
    function actualizarClaveAdmin($usu_pass_vo) {
        $sql = "UPDATE usuario_emp_pass SET ue_password = '" . $usu_pass_vo->getPassword() . "' "
                . "WHERE ue_num_doc = " . $usu_pass_vo->getNum_doc() . ";";
        $BD = new MySQL();
        echo $BD->execute_query($sql);
    }

    /**
     * Funcion que actualiza las credenciales de acdeso de un cliente
     * @param type $usu_pass_vo
     */
    function actualizarUsuarioCliente($usu_pass_vo) {
        $sql = "UPDATE usuario_pass SET us_usuario = '" . $usu_pass_vo->getUsuario() . "', us_password = '" . $usu_pass_vo->getPassword() . "' "
                . "WHERE us_td_id = " . $usu_pass_vo->getTipo_doc() . " AND us_num_doc = " . $usu_pass_vo->getNum_doc() . ";";
        $BD = new MySQL();
        echo $BD->execute_query($sql);
    }

    /**
     * Funcion que actualiza las credenciales de acdeso de un empleado
     * @param type $usu_pass_vo
     */
    function actualizarUsuarioEmpleado($usu_pass_vo) {
        $sql = "UPDATE usuario_emp_pass SET ue_usuario = '" . $usu_pass_vo->getUsuario() . "', ue_password = '" . $usu_pass_vo->getPassword() . "' "
                . "WHERE ue_td_id = " . $usu_pass_vo->getTipo_doc() . " AND ue_num_doc = " . $usu_pass_vo->getNum_doc() . ";";
        $BD = new MySQL();
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que actualiza el estado de un empleado
     * @param type $usu_pass_vo
     * @param type $estado
     */
    function actualizarEstadoEmpleado($usu_pass_vo, $estado) {
        $sql = "UPDATE empleados SET esu_id = " . $estado . " WHERE emp_td_id = " . $usu_pass_vo->getTipo_doc() . " AND emp_num_doc = " . $usu_pass_vo->getNum_doc() . ";";
        $BD = new MySQL();
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna los datos de un usuario_pass en el login
     * @param type $usuario
     * @return type
     */
    function consultaLogin($usuario) {
        $sql = "SELECT c.*, u.tu_id, u.us_usuario, u.us_password, d.td_sigla, t.tu_tipo "
                . "FROM clientes AS c, usuario_pass AS u, tipo_doc AS d, tipo_usuario AS t "
                . "WHERE c.cli_td_id = u.us_td_id  AND c.cli_num_doc = u.us_num_doc "
                . "AND c.cli_td_id = d.td_id AND u.tu_id = t.tu_id "
                . "AND u.us_usuario = '" . $usuario . "';";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna los datos de un usuario_pass en el login
     * @param type $usuario
     * @return type
     */
    function consultaLoginEmp($usuario) {
        $sql = "SELECT e.*, ue.car_id, ue.ue_usuario, ue.ue_password, d.td_sigla, c.car_nombre "
                . "FROM empleados AS e, usuario_emp_pass AS ue, tipo_doc AS d, cargo AS c "
                . "WHERE e.emp_td_id = ue.ue_td_id  AND e.emp_num_doc = ue.ue_num_doc "
                . "AND e.emp_td_id = d.td_id AND ue.car_id = c.car_id AND e.esu_id = 1 "
                . "AND ue.ue_usuario =  '" . $usuario . "';";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna los datos de una sucursal log
     * @param type $usuario
     * @return type
     */
    function consultaSucLogin($usuario) {
        $sql = "SELECT su.*, cl.cli_nombre FROM sucursales AS su, clientes AS cl "
                . "WHERE su.cli_td_id = cl.cli_td_id AND su.cli_num_doc = cl.cli_num_doc AND su.suc_usuario = '" . $usuario . "';";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna los datos de tipos de usuario del sistema
     * @return type
     */
    function consultaTipoUs() {
        $sql = "SELECT * FROM tipo_usuario;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que realiza un insert o update en tabla usuario_pass
     * @param type $usu_pass_vo
     */
    function insertarActualUsuPass($usu_pass_vo) {
        $sql = "INSERT INTO usuario_pass VALUES (" . $usu_pass_vo->getTipo_doc() . ", " . $usu_pass_vo->getNum_doc() . ", "
                . "" . $usu_pass_vo->getTipo_usu() . ", '" . $usu_pass_vo->getUsuario() . "', '" . $usu_pass_vo->getPassword() . "')"
                . "ON DUPLICATE KEY UPDATE tu_id = " . $usu_pass_vo->getTipo_usu() . ", "
                . "us_usuario = '" . $usu_pass_vo->getUsuario() . "', us_password = '" . $usu_pass_vo->getPassword() . "';";
        $BD = new MySQL();
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que realiza un insert o update en tabla usuario_emp_pass
     * @param type $usu_pass_vo
     */
    function insertarActualEmpPass($usu_pass_vo) {
        $sql = "INSERT INTO usuario_emp_pass VALUES (" . $usu_pass_vo->getTipo_doc() . ", " . $usu_pass_vo->getNum_doc() . ", "
                . "" . $usu_pass_vo->getTipo_usu() . ", '" . $usu_pass_vo->getUsuario() . "', '" . $usu_pass_vo->getPassword() . "')"
                . "ON DUPLICATE KEY UPDATE car_id = " . $usu_pass_vo->getTipo_usu() . ", "
                . "ue_usuario = '" . $usu_pass_vo->getUsuario() . "', ue_password = '" . $usu_pass_vo->getPassword() . "';";
        $BD = new MySQL();
        return $BD->execute_query($sql);
    }

}
