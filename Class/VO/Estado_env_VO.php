<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_env_VO
 *
 * @author Andres
 */
class Estado_env_VO {

    //put your code here
    private $cod_es_env;
    private $desc_es_env;

    function getCod_es_env() {
        return $this->cod_es_env;
    }

    function getDesc_es_env() {
        return $this->desc_es_env;
    }

    function setCod_es_env($cod_es_env) {
        $this->cod_es_env = $cod_es_env;
    }

    function setDesc_es_env($desc_es_env) {
        $this->desc_es_env = $desc_es_env;
    }

}
