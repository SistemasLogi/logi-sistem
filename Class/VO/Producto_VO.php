<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Producto_VO
 *
 * @author Andres
 */
class Producto_VO {

    //put your code here
    private $suc_numero;
    private $cod_prod;
    private $sku_prod;
    private $descripcion;
    private $ubicacion;
    private $cant_ent;
    private $detalle;
    private $fecha;
    private $fecha_reg;

    function getFecha_reg() {
        return $this->fecha_reg;
    }

    function setFecha_reg($fecha_reg) {
        $this->fecha_reg = $fecha_reg;
    }

    function getFecha() {
        return $this->fecha;
    }

    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    function getCant_ent() {
        return $this->cant_ent;
    }

    function getDetalle() {
        return $this->detalle;
    }

    function setCant_ent($cant_ent) {
        $this->cant_ent = $cant_ent;
    }

    function setDetalle($detalle) {
        $this->detalle = $detalle;
    }

    function getSuc_numero() {
        return $this->suc_numero;
    }

    function getCod_prod() {
        return $this->cod_prod;
    }

    function getSku_prod() {
        return $this->sku_prod;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function getUbicacion() {
        return $this->ubicacion;
    }

    function setSuc_numero($suc_numero) {
        $this->suc_numero = $suc_numero;
    }

    function setCod_prod($cod_prod) {
        $this->cod_prod = $cod_prod;
    }

    function setSku_prod($sku_prod) {
        $this->sku_prod = $sku_prod;
    }

    function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    function setUbicacion($ubicacion) {
        $this->ubicacion = $ubicacion;
    }

}
