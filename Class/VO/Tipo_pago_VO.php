<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tipo_pago_VO
 *
 * @author TECNOLOGIA-LOGI
 */
class Tipo_pago_VO {

    //put your code here
    private $id_pago;
    private $nombre_pago;

    function getId_pago() {
        return $this->id_pago;
    }

    function getNombre_pago() {
        return $this->nombre_pago;
    }

    function setId_pago($id_pago) {
        $this->id_pago = $id_pago;
    }

    function setNombre_pago($nombre_pago) {
        $this->nombre_pago = $nombre_pago;
    }

}
