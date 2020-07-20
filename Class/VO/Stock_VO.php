<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Stock_VO
 *
 * @author Andres
 */
class Stock_VO {

    //put your code here
    private $num_sucursal;
    private $cod_producto;
    private $fecha_stock;
    private $cantidad_stk;
    private $observ_stock;

    function getNum_sucursal() {
        return $this->num_sucursal;
    }

    function getCod_producto() {
        return $this->cod_producto;
    }

    function getFecha_stock() {
        return $this->fecha_stock;
    }

    function getCantidad_stk() {
        return $this->cantidad_stk;
    }

    function getObserv_stock() {
        return $this->observ_stock;
    }

    function setNum_sucursal($num_sucursal) {
        $this->num_sucursal = $num_sucursal;
    }

    function setCod_producto($cod_producto) {
        $this->cod_producto = $cod_producto;
    }

    function setFecha_stock($fecha_stock) {
        $this->fecha_stock = $fecha_stock;
    }

    function setCantidad_stk($cantidad_stk) {
        $this->cantidad_stk = $cantidad_stk;
    }

    function setObserv_stock($observ_stock) {
        $this->observ_stock = $observ_stock;
    }

}
