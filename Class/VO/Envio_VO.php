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
    private $num_orden_serv;
    private $cantidad;
    private $peso_kg;
    private $alto_cm;
    private $ancho_cm;
    private $largo_cm;
    private $trayecto;
    private $nombre;
    private $direccion;
    private $telefono;
    private $ciudad_dest;
    private $depto_dest;
    private $direc_remite;
    private $ciud_remite;
    private $novedad;
    private $contenido;
    private $valor_declarado;

    function getValor_declarado() {
        return $this->valor_declarado;
    }

    function setValor_declarado($valor_declarado) {
        $this->valor_declarado = $valor_declarado;
    }

    function getNombre() {
        return $this->nombre;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function getId_envio() {
        return $this->id_envio;
    }

    function getNum_guia() {
        return $this->num_guia;
    }

    function getNum_orden_serv() {
        return $this->num_orden_serv;
    }

    function getCantidad() {
        return $this->cantidad;
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

    function getNovedad() {
        return $this->novedad;
    }

    function getContenido() {
        return $this->contenido;
    }

    function setId_envio($id_envio) {
        $this->id_envio = $id_envio;
    }

    function setNum_guia($num_guia) {
        $this->num_guia = $num_guia;
    }

    function setNum_orden_serv($num_orden_serv) {
        $this->num_orden_serv = $num_orden_serv;
    }

    function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
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

    function setNovedad($novedad) {
        $this->novedad = $novedad;
    }

    function setContenido($contenido) {
        $this->contenido = $contenido;
    }

}
