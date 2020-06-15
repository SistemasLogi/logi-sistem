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
    private $estado_id;
    private $fecha_hora;
    private $novedad;
    private $td_mensajero;
    private $num_doc_mensajero;

    function getOrden_id() {
        return $this->orden_id;
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

    function getTd_mensajero() {
        return $this->td_mensajero;
    }

    function getNum_doc_mensajero() {
        return $this->num_doc_mensajero;
    }

    function setOrden_id($orden_id) {
        $this->orden_id = $orden_id;
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

    function setTd_mensajero($td_mensajero) {
        $this->td_mensajero = $td_mensajero;
    }

    function setNum_doc_mensajero($num_doc_mensajero) {
        $this->num_doc_mensajero = $num_doc_mensajero;
    }

}
