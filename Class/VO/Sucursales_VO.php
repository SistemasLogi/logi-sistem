<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Sucursales_VO
 *
 * @author Andres
 */
class Sucursales_VO {

    //put your code here
    private $num_suc;
    private $td_cliente;
    private $num_doc_cliente;
    private $nombre_suc;
    private $direccion_suc;
    private $ciudad_suc;
    private $tel_suc;
    private $usuario_suc;
    private $pass_suc;

    function getUsuario_suc() {
        return $this->usuario_suc;
    }

    function getPass_suc() {
        return $this->pass_suc;
    }

    function setUsuario_suc($usuario_suc) {
        $this->usuario_suc = $usuario_suc;
    }

    function setPass_suc($pass_suc) {
        $this->pass_suc = $pass_suc;
    }

    function getNum_suc() {
        return $this->num_suc;
    }

    function getTd_cliente() {
        return $this->td_cliente;
    }

    function getNum_doc_cliente() {
        return $this->num_doc_cliente;
    }

    function getNombre_suc() {
        return $this->nombre_suc;
    }

    function getDireccion_suc() {
        return $this->direccion_suc;
    }

    function getCiudad_suc() {
        return $this->ciudad_suc;
    }

    function getTel_suc() {
        return $this->tel_suc;
    }

    function setNum_suc($num_suc) {
        $this->num_suc = $num_suc;
    }

    function setTd_cliente($td_cliente) {
        $this->td_cliente = $td_cliente;
    }

    function setNum_doc_cliente($num_doc_cliente) {
        $this->num_doc_cliente = $num_doc_cliente;
    }

    function setNombre_suc($nombre_suc) {
        $this->nombre_suc = $nombre_suc;
    }

    function setDireccion_suc($direccion_suc) {
        $this->direccion_suc = $direccion_suc;
    }

    function setCiudad_suc($ciudad_suc) {
        $this->ciudad_suc = $ciudad_suc;
    }

    function setTel_suc($tel_suc) {
        $this->tel_suc = $tel_suc;
    }

}
