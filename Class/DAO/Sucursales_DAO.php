<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Sucursales_DAO
 *
 * @author Andres
 */
class Sucursales_DAO {

    /**
     * Funcion que inserta un registro en tabla sucursales
     * @param type $sucursal_vo
     */
    function insertarSucursal($sucursal_vo) {
        $sql = "INSERT INTO sucursales VALUES (null, " . $sucursal_vo->getTd_cliente() . ", "
                . "" . $sucursal_vo->getNum_doc_cliente() . ", '" . $sucursal_vo->getNombre_suc() . "', '" . $sucursal_vo->getDireccion_suc() . "', "
                . "'" . $sucursal_vo->getCiudad_suc() . "','" . $sucursal_vo->getTel_suc() . "', "
                . "'" . $sucursal_vo->getUsuario_suc() . "', '" . $sucursal_vo->getPass_suc() . "')";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que actualiza las credenciales de acdeso de una sucursal
     * @param type $sucursal_vo
     */
    function actualizarUsuarioSucursal($sucursal_vo) {
        $sql = "UPDATE sucursales SET suc_usuario = '" . $sucursal_vo->getUsuario_suc() . "', suc_password = '" . $sucursal_vo->getPass_suc() . "' "
                . "WHERE suc_num_id = " . $sucursal_vo->getNum_suc() . ";";
        $BD = new MySQL();
        echo $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna los datos de las sucursales registradas
     * @return type
     */
    function consultaGeneral_suc() {
        $sql = "SELECT su.*, cl.cli_nombre FROM sucursales AS su, clientes AS cl "
                . "WHERE su.cli_td_id = cl.cli_td_id AND su.cli_num_doc = cl.cli_num_doc;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna los datos de una sucursal
     * @param type $suc_id
     * @return type
     */
    function consultaGeneral_suc_param($suc_id) {
        $sql = "SELECT su.*, cl.cli_nombre FROM sucursales AS su, clientes AS cl "
                . "WHERE su.cli_td_id = cl.cli_td_id AND su.cli_num_doc = cl.cli_num_doc "
                . "AND su.suc_num_id = " . $suc_id . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna los datos de la sucursal consultada por numero id
     * @return type
     */
    function consultaSuc_x_num($num_suc) {
        $sql = "SELECT * FROM sucursales WHERE suc_num_id = " . $num_suc . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que retorna los datos de la sucursal consultada por numero de cliente
     * @param type $num_cli
     * @param type $td_cli
     * @return type
     */
    function consultaSuc_x_num_cli($num_cli, $td_cli) {
        $sql = "SELECT * FROM sucursales WHERE cli_td_id = " . $td_cli . " AND  cli_num_doc = " . $num_cli . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
