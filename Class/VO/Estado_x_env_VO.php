<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_x_env_VO
 *
 * @author Andres
 */
class Estado_x_env_VO {

    //put your code here
    private $envio_id;
    private $est_env_id;
    private $fecha_hora;
    private $novedad;
    private $td_mensajero;
    private $num_doc_men;

    function getEnvio_id() {
        return $this->envio_id;
    }

    function getEst_env_id() {
        return $this->est_env_id;
    }

    function getFecha_hora() {
        return $this->fecha_hora;
    }

    function getNovedad() {
        return $this->novedad;
    }

    function getTd_mensajero() {
        return $this->td_mensajero;
    }

    function getNum_doc_men() {
        return $this->num_doc_men;
    }

    function setEnvio_id($envio_id) {
        $this->envio_id = $envio_id;
    }

    function setEst_env_id($est_env_id) {
        $this->est_env_id = $est_env_id;
    }

    function setFecha_hora($fecha_hora) {
        $this->fecha_hora = $fecha_hora;
    }

    function setNovedad($novedad) {
        $this->novedad = $novedad;
    }

    function setTd_mensajero($td_mensajero) {
        $this->td_mensajero = $td_mensajero;
    }

    function setNum_doc_men($num_doc_men) {
        $this->num_doc_men = $num_doc_men;
    }

}
