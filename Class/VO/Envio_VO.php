<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Envio_VO
 *
 * @author Andres
 */
class Envio_VO {

    //put your code here
    private $id_envio;
    private $num_guia;
    private $num_oeden_serv;
    private $id_tipo_envio;
    private $peso_kg;
    private $alto_cm;
    private $ancho_cm;
    private $largo_cm;
    private $contenido;
    private $trayecto;
    private $direccion;
    private $telefono;
    private $ciudad_dest;
    private $depto_dest;
    private $direc_remite;
    private $ciud_remite;
    private $fec_programado;
    private $fec_bodega_orig;
    private $fec_via_ciu_dest;
    private $fec_bod_ciu_dest;
    private $fec_reparto;
    private $fec_entregado;
    private $novedad;
    private $fec_devolucion;
    private $fec_reenv_rep;
    private $fec_reenv_entreg;

    function getId_envio() {
        return $this->id_envio;
    }

    function getNum_guia() {
        return $this->num_guia;
    }

    function getNum_oeden_serv() {
        return $this->num_oeden_serv;
    }

    function getId_tipo_envio() {
        return $this->id_tipo_envio;
    }

    function getPeso_kg() {
        return $this->peso_kg;
    }

    function getAlto_cm() {
        return $this->alto_cm;
    }

    function getAncho_cm() {
        return $this->ancho_cm;
    }

    function getLargo_cm() {
        return $this->largo_cm;
    }

    function getContenido() {
        return $this->contenido;
    }

    function getTrayecto() {
        return $this->trayecto;
    }

    function getDireccion() {
        return $this->direccion;
    }

    function getTelefono() {
        return $this->telefono;
    }

    function getCiudad_dest() {
        return $this->ciudad_dest;
    }

    function getDepto_dest() {
        return $this->depto_dest;
    }

    function getDirec_remite() {
        return $this->direc_remite;
    }

    function getCiud_remite() {
        return $this->ciud_remite;
    }

    function setId_envio($id_envio) {
        $this->id_envio = $id_envio;
    }

    function setNum_guia($num_guia) {
        $this->num_guia = $num_guia;
    }

    function setNum_oeden_serv($num_oeden_serv) {
        $this->num_oeden_serv = $num_oeden_serv;
    }

    function setId_tipo_envio($id_tipo_envio) {
        $this->id_tipo_envio = $id_tipo_envio;
    }

    function setPeso_kg($peso_kg) {
        $this->peso_kg = $peso_kg;
    }

    function setAlto_cm($alto_cm) {
        $this->alto_cm = $alto_cm;
    }

    function setAncho_cm($ancho_cm) {
        $this->ancho_cm = $ancho_cm;
    }

    function setLargo_cm($largo_cm) {
        $this->largo_cm = $largo_cm;
    }

    function setContenido($contenido) {
        $this->contenido = $contenido;
    }

    function setTrayecto($trayecto) {
        $this->trayecto = $trayecto;
    }

    function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    function setCiudad_dest($ciudad_dest) {
        $this->ciudad_dest = $ciudad_dest;
    }

    function setDepto_dest($depto_dest) {
        $this->depto_dest = $depto_dest;
    }

    function setDirec_remite($direc_remite) {
        $this->direc_remite = $direc_remite;
    }

    function setCiud_remite($ciud_remite) {
        $this->ciud_remite = $ciud_remite;
    }

    function getFec_programado() {
        return $this->fec_programado;
    }

    function getFec_via_ciu_dest() {
        return $this->fec_via_ciu_dest;
    }

    function getFec_bod_ciu_dest() {
        return $this->fec_bod_ciu_dest;
    }

    function getFec_reparto() {
        return $this->fec_reparto;
    }

    function getFec_entregado() {
        return $this->fec_entregado;
    }

    function getNovedad() {
        return $this->novedad;
    }

    function getFec_devolucion() {
        return $this->fec_devolucion;
    }

    function getFec_reenv_rep() {
        return $this->fec_reenv_rep;
    }

    function getFec_reenv_entreg() {
        return $this->fec_reenv_entreg;
    }

    function setFec_programado($fec_programado) {
        $this->fec_programado = $fec_programado;
    }

    function setFec_via_ciu_dest($fec_via_ciu_dest) {
        $this->fec_via_ciu_dest = $fec_via_ciu_dest;
    }

    function setFec_bod_ciu_dest($fec_bod_ciu_dest) {
        $this->fec_bod_ciu_dest = $fec_bod_ciu_dest;
    }

    function setFec_reparto($fec_reparto) {
        $this->fec_reparto = $fec_reparto;
    }

    function setFec_entregado($fec_entregado) {
        $this->fec_entregado = $fec_entregado;
    }

    function setNovedad($novedad) {
        $this->novedad = $novedad;
    }

    function setFec_devolucion($fec_devolucion) {
        $this->fec_devolucion = $fec_devolucion;
    }

    function setFec_reenv_rep($fec_reenv_rep) {
        $this->fec_reenv_rep = $fec_reenv_rep;
    }

    function setFec_reenv_entreg($fec_reenv_entreg) {
        $this->fec_reenv_entreg = $fec_reenv_entreg;
    }

    function getFec_bodega_orig() {
        return $this->fec_bodega_orig;
    }

    function setFec_bodega_orig($fec_bodega_orig) {
        $this->fec_bodega_orig = $fec_bodega_orig;
    }

}
