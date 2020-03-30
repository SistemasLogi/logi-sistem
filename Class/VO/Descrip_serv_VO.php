<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Descrip_serv_VO
 *
 * @author Andres
 */
class Descrip_serv_VO {

    //put your code here
    private $os_id;
    private $csc;
    private $ts_id;
    private $cantidad_env;
    private $contenido;

    function getOs_id() {
        return $this->os_id;
    }

    function getCsc() {
        return $this->csc;
    }

    function getTs_id() {
        return $this->ts_id;
    }

    function getCantidad_env() {
        return $this->cantidad_env;
    }

    function getContenido() {
        return $this->contenido;
    }

    function setOs_id($os_id) {
        $this->os_id = $os_id;
    }

    function setCsc($csc) {
        $this->csc = $csc;
    }

    function setTs_id($ts_id) {
        $this->ts_id = $ts_id;
    }

    function setCantidad_env($cantidad_env) {
        $this->cantidad_env = $cantidad_env;
    }

    function setContenido($contenido) {
        $this->contenido = $contenido;
    }

}
