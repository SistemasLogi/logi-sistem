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
        $sql = "SELECT * FROM usuario_pass WHERE us_num_doc = " . $num_usu . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion de uso exclusivo para el primer administrador ingresado a la base de datos
     * necesaria para encriptar la contraseña y permitir el ingreso
     * @param type $usu_pass_vo
     */
    function actualizarClaveAdmin($usu_pass_vo) {
        $sql = "UPDATE usuario_pass SET us_password = '" . $usu_pass_vo->getPassword() . "' "
                . "WHERE us_num_doc = " . $usu_pass_vo->getNum_doc() . ";";
        $BD = new MySQL();
        echo $BD->execute_query($sql);
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

}
