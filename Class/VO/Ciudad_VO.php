<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Ciudad_VO
 *
 * @author V&G ASESORIAS SAS
 */
class Ciudad_VO {
    //put your code here
    private $id_ciudad;
    private $nombre_ciu;
    
    function getId_ciudad() {
        return $this->id_ciudad;
    }

    function getNombre_ciu() {
        return $this->nombre_ciu;
    }

    function setId_ciudad($id_ciudad) {
        $this->id_ciudad = $id_ciudad;
    }

    function setNombre_ciu($nombre_ciu) {
        $this->nombre_ciu = $nombre_ciu;
    }


}
