<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Est_x_aenv_VO
 *
 * @author Andres
 */
class Est_x_aenv_VO {

    //put your code here
    private $id_aenv;
    private $id_est_aenv;
    private $exae_fecha_hora;
    private $exae_novedad;

    function getId_aenv() {
        return $this->id_aenv;
    }

    function getId_est_aenv() {
        return $this->id_est_aenv;
    }

    function getExae_fecha_hora() {
        return $this->exae_fecha_hora;
    }

    function getExae_novedad() {
        return $this->exae_novedad;
    }

    function setId_aenv($id_aenv) {
        $this->id_aenv = $id_aenv;
    }

    function setId_est_aenv($id_est_aenv) {
        $this->id_est_aenv = $id_est_aenv;
    }

    function setExae_fecha_hora($exae_fecha_hora) {
        $this->exae_fecha_hora = $exae_fecha_hora;
    }

    function setExae_novedad($exae_novedad) {
        $this->exae_novedad = $exae_novedad;
    }

}
