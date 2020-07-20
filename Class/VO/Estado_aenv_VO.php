<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_aenv_VO
 *
 * @author Andres
 */
class Estado_aenv_VO {

    //put your code here
    private $est_aenv_id;
    private $est_aenv_desc;

    function getEst_aenv_id() {
        return $this->est_aenv_id;
    }

    function getEst_aenv_desc() {
        return $this->est_aenv_desc;
    }

    function setEst_aenv_id($est_aenv_id) {
        $this->est_aenv_id = $est_aenv_id;
    }

    function setEst_aenv_desc($est_aenv_desc) {
        $this->est_aenv_desc = $est_aenv_desc;
    }

}
