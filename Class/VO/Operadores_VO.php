<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Operadores_VO
 *
 * @author Andres
 */
class Operadores_VO {

    //put your code here

    private $oper_id;
    private $opera_nombre;

    function getOper_id() {
        return $this->oper_id;
    }

    function getOpera_nombre() {
        return $this->opera_nombre;
    }

    function setOper_id($oper_id) {
        $this->oper_id = $oper_id;
    }

    function setOpera_nombre($opera_nombre) {
        $this->opera_nombre = $opera_nombre;
    }

}
