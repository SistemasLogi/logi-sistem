<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tipo_serv_VO
 *
 * @author Andres
 */
class Tipo_serv_VO {

    //put your code here
    private $cod_serv;
    private $nom_serv;

    function getCod_serv() {
        return $this->cod_serv;
    }

    function getNom_serv() {
        return $this->nom_serv;
    }

    function setCod_serv($cod_serv) {
        $this->cod_serv = $cod_serv;
    }

    function setNom_serv($nom_serv) {
        $this->nom_serv = $nom_serv;
    }

}
