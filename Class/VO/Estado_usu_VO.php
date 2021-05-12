<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_usu_VO
 *
 * @author TECNOLOGIA-LOGI
 */
class Estado_usu_VO {

    //put your code here
    private $est_id;
    private $estado;

    function getEst_id() {
        return $this->est_id;
    }

    function getEstado() {
        return $this->estado;
    }

    function setEst_id($est_id) {
        $this->est_id = $est_id;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

}
