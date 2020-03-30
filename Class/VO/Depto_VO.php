<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Depto_VO
 *
 * @author Andres
 */
class Depto_VO {

    //put your code here
    private $id_depto;
    private $desc_depto;

    function getId_depto() {
        return $this->id_depto;
    }

    function getDesc_depto() {
        return $this->desc_depto;
    }

    function setId_depto($id_depto) {
        $this->id_depto = $id_depto;
    }

    function setDesc_depto($desc_depto) {
        $this->desc_depto = $desc_depto;
    }

}
