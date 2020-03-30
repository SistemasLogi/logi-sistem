<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tipo_doc_VO
 *
 * @author Andres
 */
class Tipo_doc_VO {

    //put your code here

    private $cod_td;
    private $sigla;
    private $desc_td;

    function getCod_td() {
        return $this->cod_td;
    }

    function getSigla() {
        return $this->sigla;
    }

    function getDesc_td() {
        return $this->desc_td;
    }

    function setCod_td($cod_td) {
        $this->cod_td = $cod_td;
    }

    function setSigla($sigla) {
        $this->sigla = $sigla;
    }

    function setDesc_td($desc_td) {
        $this->desc_td = $desc_td;
    }

}
