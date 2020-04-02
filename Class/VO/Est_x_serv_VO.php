<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Est_x_serv_VO
 *
 * @author Andres
 */
class Est_x_serv_VO {

    //put your code here
    private $orden_id;
    private $ord_csc_id;
    private $estado_id;
    private $fecha_hora;
    private $novedad;

    function getOrden_id() {
        return $this->orden_id;
    }

    function getOrd_csc_id() {
        return $this->ord_csc_id;
    }

    function getEstado_id() {
        return $this->estado_id;
    }

    function getFecha_hora() {
        return $this->fecha_hora;
    }

    function getNovedad() {
        return $this->novedad;
    }

    function setOrden_id($orden_id) {
        $this->orden_id = $orden_id;
    }

    function setOrd_csc_id($ord_csc_id) {
        $this->ord_csc_id = $ord_csc_id;
    }

    function setEstado_id($estado_id) {
        $this->estado_id = $estado_id;
    }

    function setFecha_hora($fecha_hora) {
        $this->fecha_hora = $fecha_hora;
    }

    function setNovedad($novedad) {
        $this->novedad = $novedad;
    }

}
