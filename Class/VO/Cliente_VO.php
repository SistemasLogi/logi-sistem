<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Cliente_VO
 *
 * @author V&G ASESORIAS SAS
 */
class Cliente_VO {

    //put your code here

    private $tipo_doc;
    private $num_doc;
    private $nombre;
    private $telefono;
    private $celular;
    private $direccion;
    private $pcontac;

    function getTipo_doc() {
        return $this->tipo_doc;
    }

    function getNum_doc() {
        return $this->num_doc;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getTelefono() {
        return $this->telefono;
    }

    function getCelular() {
        return $this->celular;
    }

    function getDireccion() {
        return $this->direccion;
    }

    function setTipo_doc($tipo_doc) {
        $this->tipo_doc = $tipo_doc;
    }

    function setNum_doc($num_doc) {
        $this->num_doc = $num_doc;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    function setCelular($celular) {
        $this->celular = $celular;
    }

    function setDireccion($direccion) {
        $this->direccion = $direccion;
    }
    function getPcontac() {
        return $this->pcontac;
    }

    function setPcontac($pcontac) {
        $this->pcontac = $pcontac;
    }


}
