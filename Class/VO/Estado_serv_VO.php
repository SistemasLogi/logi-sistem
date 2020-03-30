<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_serv_VO
 *
 * @author Andres
 */
class Estado_serv_VO {

    //put your code here

    private $cod_estado_serv;
    private $desc_estado_serv;

    function getCod_estado_serv() {
        return $this->cod_estado_serv;
    }

    function getDesc_estado_serv() {
        return $this->desc_estado_serv;
    }

    function setCod_estado_serv($cod_estado_serv) {
        $this->cod_estado_serv = $cod_estado_serv;
    }

    function setDesc_estado_serv($desc_estado_serv) {
        $this->desc_estado_serv = $desc_estado_serv;
    }

}
