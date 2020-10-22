<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Cargo_VO
 *
 * @author TECNOLOGIA-LOGI
 */
class Cargo_VO {

    //put your code here
    private $cod_cargo;
    private $nombre_cargo;

    function getCod_cargo() {
        return $this->cod_cargo;
    }

    function getNombre_cargo() {
        return $this->nombre_cargo;
    }

    function setCod_cargo($cod_cargo) {
        $this->cod_cargo = $cod_cargo;
    }

    function setNombre_cargo($nombre_cargo) {
        $this->nombre_cargo = $nombre_cargo;
    }

}
