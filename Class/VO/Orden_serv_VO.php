<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Orden_serv_VO
 *
 * @author Andres
 */
class Orden_serv_VO {

    //put your code here
    private $numero;
    private $cli_id;
    private $cli_docum;
    private $cod_ciudad;
    private $direccion;
    private $per_contacto;
    private $telefono;
    private $tipo_serv_id;
    private $tipo_env_id;
    private $observacion;

    function getObservacion() {
        return $this->observacion;
    }

    function setObservacion($observacion) {
        $this->observacion = $observacion;
    }

    function getTipo_serv_id() {
        return $this->tipo_serv_id;
    }

    function getTipo_env_id() {
        return $this->tipo_env_id;
    }

    function setTipo_serv_id($tipo_serv_id) {
        $this->tipo_serv_id = $tipo_serv_id;
    }

    function setTipo_env_id($tipo_env_id) {
        $this->tipo_env_id = $tipo_env_id;
    }

    function getNumero() {
        return $this->numero;
    }

    function getCli_id() {
        return $this->cli_id;
    }

    function getCli_docum() {
        return $this->cli_docum;
    }

    function getCod_ciudad() {
        return $this->cod_ciudad;
    }

    function getDireccion() {
        return $this->direccion;
    }

    function getPer_contacto() {
        return $this->per_contacto;
    }

    function getTelefono() {
        return $this->telefono;
    }

    function setNumero($numero) {
        $this->numero = $numero;
    }

    function setCli_id($cli_id) {
        $this->cli_id = $cli_id;
    }

    function setCli_docum($cli_docum) {
        $this->cli_docum = $cli_docum;
    }

    function setCod_ciudad($cod_ciudad) {
        $this->cod_ciudad = $cod_ciudad;
    }

    function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    function setPer_contacto($per_contacto) {
        $this->per_contacto = $per_contacto;
    }

    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

}
