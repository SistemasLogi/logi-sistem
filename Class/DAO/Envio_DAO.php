<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Envio_DAO
 *
 * @author Andres
 */
class Envio_DAO {

    //put your code here
    /**
     * funcion que retorna la informacion de envios por numero de orden de servicio
     * @param type $num_os
     * @param type $td_id
     * @param type $num_doc
     * @param type $exe
     * @return type
     */
    function consultaEnvIng_x_os($num_os, $td_id, $num_doc, $exe) {
        $sql = "SELECT e.*, o.*, c.*, es.exe_fec_hora, ee.ee_desc, ee.ee_id, cd.ciu_nombre, d.* "
                . "FROM envio AS e, orden_serv AS o, clientes AS c, est_x_envio "
                . "AS es, estado_env AS ee, ciudad AS cd, departamento AS d "
                . "WHERE e.os_id = o.os_id AND o.cli_td_id = c.cli_td_id "
                . "AND o.cli_num_doc = c.cli_num_doc AND o.os_id = " . $num_os . " AND es.exe_en_id = e.en_id "
                . "AND es.exe_ee_id = ee.ee_id AND cd.ciu_id = o.ciu_id AND cd.dep_id = d.dep_id "
                . "AND es.exe_ee_id = " . $exe . " AND c.cli_td_id = " . $td_id . " AND c.cli_num_doc = " . $num_doc . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta un registro en tabla envio
     * @param type $obj_env_vo
     */
    function insertarEnvio($obj_env_vo) {
        $sql = "INSERT INTO envio VALUES (null,'" . $obj_env_vo->getNum_guia() . "'," . $obj_env_vo->getNum_orden_serv() . ","
                . "" . $obj_env_vo->getCantidad() . "," . $obj_env_vo->getPeso_kg() . "," . $obj_env_vo->getAlto_cm() . ","
                . "" . $obj_env_vo->getAncho_cm() . "," . $obj_env_vo->getLargo_cm() . ",'" . $obj_env_vo->getTrayecto() . "',"
                . "'" . $obj_env_vo->getNombre() . "','" . $obj_env_vo->getDireccion() . "','" . $obj_env_vo->getTelefono() . "',"
                . "'" . $obj_env_vo->getCiudad_dest() . "','" . $obj_env_vo->getDepto_dest() . "',"
                . "'" . $obj_env_vo->getNovedad() . "','" . $obj_env_vo->getContenido() . "'," . $obj_env_vo->getValor_declarado() . ")";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

}
