<?php

class Datos {

    private $hostname = '127.0.0.1';
    private $usuario = 'logiadmin';
    private $clave = '4dm1n1str4d0rl0g12020';
    private $db = 'logi';
    
    public function getPre(){
        return $this->pre;
    } 

//    public function Datos() {
//        
//    }

    public function get_hostname() {
        return $this->hostname;
    }

    public function get_usuario() {
        return $this->usuario;
    }

    public function get_clave() {
        return $this->clave;
    }

    public function get_DB() {
        return $this->db;
    }

}
