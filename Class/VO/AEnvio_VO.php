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
    private $aenv_os_id;
    private $aenv_operador_id;
    private $aenv_cantidad;

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

}
