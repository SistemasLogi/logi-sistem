<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Usuario_pass_VO
 *
 * @author V&G ASESORIAS SAS
 */
class Usuario_pass_VO {

    //put your code here
    private $tipo_doc;
    private $num_doc;
    private $tipo_usu;
    private $usuario;
    private $password;

    function getTipo_doc() {
        return $this->tipo_doc;
    }

    function getNum_doc() {
        return $this->num_doc;
    }

    function getTipo_usu() {
        return $this->tipo_usu;
    }

    function getUsuario() {
        return $this->usuario;
    }

    function getPassword() {
        return $this->password;
    }

    function setTipo_doc($tipo_doc) {
        $this->tipo_doc = $tipo_doc;
    }

    function setNum_doc($num_doc) {
        $this->num_doc = $num_doc;
    }

    function setTipo_usu($tipo_usu) {
        $this->tipo_usu = $tipo_usu;
    }

    function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    function setPassword($password) {
        $this->password = $password;
    }

}
