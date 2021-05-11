<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AEnvio_VO
 *
 * @author Andres
 */
class AEnvio_VO {

    //put your code here

    private $aenv_id;
    private $aenv_guia;
    private $aenv_venta;
    private $aenv_os_id;
    private $aenv_operador_id;
    private $aenv_cantidad;
    private $aenv_nombre;
    private $aenv_direccion;
    private $aenv_telefono;
    private $aenv_ciudad;
    private $aenv_depto;
    private $aenv_observacion;
    private $aenv_valor_flet;

    function getAenv_venta() {
        return $this->aenv_venta;
    }

    function setAenv_venta($aenv_venta) {
        $this->aenv_venta = $aenv_venta;
    }

    function getAenv_id() {
        return $this->aenv_id;
    }

    function getAenv_guia() {
        return $this->aenv_guia;
    }

    function getAenv_os_id() {
        return $this->aenv_os_id;
    }

    function getAenv_operador_id() {
        return $this->aenv_operador_id;
    }

    function getAenv_cantidad() {
        return $this->aenv_cantidad;
    }

    function getAenv_nombre() {
        return $this->aenv_nombre;
    }

    function getAenv_direccion() {
        return $this->aenv_direccion;
    }

    function getAenv_telefono() {
        return $this->aenv_telefono;
    }

    function getAenv_ciudad() {
        return $this->aenv_ciudad;
    }

    function getAenv_depto() {
        return $this->aenv_depto;
    }

    function getAenv_observacion() {
        return $this->aenv_observacion;
    }

    function getAenv_valor_flet() {
        return $this->aenv_valor_flet;
    }

    function setAenv_id($aenv_id) {
        $this->aenv_id = $aenv_id;
    }

    function setAenv_guia($aenv_guia) {
        $this->aenv_guia = $aenv_guia;
    }

    function setAenv_os_id($aenv_os_id) {
        $this->aenv_os_id = $aenv_os_id;
    }

    function setAenv_operador_id($aenv_operador_id) {
        $this->aenv_operador_id = $aenv_operador_id;
    }

    function setAenv_cantidad($aenv_cantidad) {
        $this->aenv_cantidad = $aenv_cantidad;
    }

    function setAenv_nombre($aenv_nombre) {
        $this->aenv_nombre = $aenv_nombre;
    }

    function setAenv_direccion($aenv_direccion) {
        $this->aenv_direccion = $aenv_direccion;
    }

    function setAenv_telefono($aenv_telefono) {
        $this->aenv_telefono = $aenv_telefono;
    }

    function setAenv_ciudad($aenv_ciudad) {
        $this->aenv_ciudad = $aenv_ciudad;
    }

    function setAenv_depto($aenv_depto) {
        $this->aenv_depto = $aenv_depto;
    }

    function setAenv_observacion($aenv_observacion) {
        $this->aenv_observacion = $aenv_observacion;
    }

    function setAenv_valor_flet($aenv_valor_flet) {
        $this->aenv_valor_flet = $aenv_valor_flet;
    }

}
