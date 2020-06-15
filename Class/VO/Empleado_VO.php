<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Empleado_VO
 *
 * @author Andres
 */
class Empleado_VO {

    //put your code here
    private $emp_tipo_doc;
    private $emp_numero_doc;
    private $emp_nombre;
    private $emp_telefono;
    private $emp_celular;
    private $emp_direccion;
    private $emp_correo;

    function getEmp_tipo_doc() {
        return $this->emp_tipo_doc;
    }

    function getEmp_numero_doc() {
        return $this->emp_numero_doc;
    }

    function getEmp_nombre() {
        return $this->emp_nombre;
    }

    function getEmp_telefono() {
        return $this->emp_telefono;
    }

    function getEmp_celular() {
        return $this->emp_celular;
    }

    function getEmp_direccion() {
        return $this->emp_direccion;
    }

    function getEmp_correo() {
        return $this->emp_correo;
    }

    function setEmp_tipo_doc($emp_tipo_doc) {
        $this->emp_tipo_doc = $emp_tipo_doc;
    }

    function setEmp_numero_doc($emp_numero_doc) {
        $this->emp_numero_doc = $emp_numero_doc;
    }

    function setEmp_nombre($emp_nombre) {
        $this->emp_nombre = $emp_nombre;
    }

    function setEmp_telefono($emp_telefono) {
        $this->emp_telefono = $emp_telefono;
    }

    function setEmp_celular($emp_celular) {
        $this->emp_celular = $emp_celular;
    }

    function setEmp_direccion($emp_direccion) {
        $this->emp_direccion = $emp_direccion;
    }

    function setEmp_correo($emp_correo) {
        $this->emp_correo = $emp_correo;
    }

}
