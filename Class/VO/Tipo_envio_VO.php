<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tipo_envio_VO
 *
 * @author Andres
 */
class Tipo_envio_VO {

    //put your code here

    private $cod_env;
    private $env_desc;

    function getCod_env() {
        return $this->cod_env;
    }

    function getEnv_desc() {
        return $this->env_desc;
    }

    function setCod_env($cod_env) {
        $this->cod_env = $cod_env;
    }

    function setEnv_desc($env_desc) {
        $this->env_desc = $env_desc;
    }

}
