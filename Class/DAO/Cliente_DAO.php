<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Cliente_DAO
 *
 * @author V&G ASESORIAS SAS
 */
class Cliente_DAO {

    //put your code here
    /**
     * Funcion que retorna los datos de tipos de usuario del sistema
     * @return type
     */
    function consultaCliente($documento) {
        $sql = "SELECT T1.*, T2.* FROM "
                . "(SELECT * FROM clientes WHERE cli_num_doc = " . $documento . " )AS T1 "
                . "LEFT JOIN(SELECT u.us_td_id, u.us_num_doc, u.tu_id, d.td_sigla, d.td_desc, t.tu_tipo "
                . "FROM usuario_pass AS u, tipo_doc AS d, tipo_usuario t "
                . "WHERE u.us_td_id = d.td_id AND u.tu_id = t.tu_id "
                . "AND u.us_num_doc = " . $documento . ") AS T2 ON T1.cli_td_id = T2.us_td_id "
                . "AND T1.cli_num_doc = T2.us_num_doc;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * Funcion que inserta un registro en tabla clientes
     * @param type $cliente_vo
     */
    function insertarCliente($cliente_vo) {
        $sql = "INSERT INTO clientes VALUES (" . $cliente_vo->getTipo_doc() . ", " . $cliente_vo->getNum_doc() . ", "
                . "'" . $cliente_vo->getNombre() . "', '" . $cliente_vo->getTelefono() . "', '" . $cliente_vo->getCelular() . "', "
                . "'" . $cliente_vo->getDireccion() . "','" . $cliente_vo->getPcontac() . "')";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que actualiza un registro en tabla clientes
     * @param type $cliente_vo
     */
    function actualizarCliente($cliente_vo) {
        $sql = "UPDATE clientes SET cli_nombre = '" . $cliente_vo->getNombre() . "', "
                . "cli_tel = '" . $cliente_vo->getTelefono() . "', cli_cel = '" . $cliente_vo->getCelular() . "',"
                . "cli_direccion = '" . $cliente_vo->getDireccion() . "', cli_per_cont = '" . $cliente_vo->getPcontac() . "' "
                . "WHERE cli_td_id = " . $cliente_vo->getTipo_doc() . " AND cli_num_doc = " . $cliente_vo->getNum_doc() . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que consulta los clientes activos
     * @param type $cliente_vo
     */
    function consultarClientesActivos() {
        $sql = "SELECT c.*, u.tu_id, t.tu_tipo, d.td_sigla "
                . "FROM clientes AS c, usuario_pass AS u, tipo_doc AS d, tipo_usuario AS t "
                . "WHERE c.cli_td_id = u.us_td_id AND c.cli_num_doc = u.us_num_doc "
                . "AND c.cli_td_id = d.td_id AND u.tu_id = t.tu_id AND u.tu_id != 3 "
                . "ORDER BY c.cli_nombre ASC;";
        $BD = new MySQL();
//        return $sql;
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta datos de cliente por parametro
     * @param type $td_id
     * @param type $num_doc
     * @return type
     */
    function consultarCliente_x_ident($td_id, $num_doc) {
        $sql = "SELECT * FROM clientes WHERE cli_td_id = " . $td_id . " AND cli_num_doc = " . $num_doc . ";";
        $BD = new MySQL();
//        return $sql;
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta los envios segun estado para un cliente en un rango de fechas
     * @param type $est_env
     * @param type $fech_ini
     * @param type $fech_fin
     * @param type $td_cli
     * @param type $num_doc_cli
     * @param type $parametro
     * @return type
     */
    function consulta_hist_env_cliente($est_env, $fech_ini, $fech_fin, $td_cli, $num_doc_cli, $parametro) {
        $sql = "SELECT TS.*, TD.os_id AS os_id_suc, TD.suc_num_id, TD.suc_nombre FROM "
                . "(SELECT es.*, e.en_guia, e.en_nombre, e.en_direccion, e.en_novedad, e.os_id, os.cli_td_id, cl.cli_nombre, "
                . "os.cli_num_doc, os.ts_id, ts.ts_desc, os.te_id, te.te_desc "
                . "FROM est_x_envio AS es, envio AS e, orden_serv AS os, tipo_serv AS ts, tipo_envio AS te, clientes AS cl "
                . "WHERE es.exe_en_id = e.en_id AND e.os_id = os.os_id AND os.ts_id = ts.ts_id AND os.te_id = te.te_id "
                . "AND os.cli_td_id = cl.cli_td_id AND os.cli_num_doc = cl.cli_num_doc "
                . "AND os.cli_td_id = " . $td_cli . " AND os.cli_num_doc = " . $num_doc_cli . " "
                . "AND es.exe_ee_id = " . $est_env . " AND es.exe_fec_hora BETWEEN '" . $fech_ini . "' AND '" . $fech_fin . "' "
                . "ORDER BY es.exe_fec_hora ASC) AS TS "
                . "LEFT JOIN "
                . "(SELECT osu.*, suc.suc_nombre "
                . "FROM os_x_suc AS osu, sucursales AS suc "
                . "WHERE osu.suc_num_id = suc.suc_num_id) AS TD ON TS.os_id = TD.os_id" . $parametro . "";
        $BD = new MySQL();
//        return $sql;
        return $BD->query($sql);
    }

    /**
     * Funcion que consulta los envios procesados para facturacion de cliente en un rango de fechas
     * @param type $fech_ini
     * @param type $fech_fin
     * @param type $td_cli
     * @param type $num_doc_cli
     * @return type
     */
    function consulta_hist_env_cliente_fact($fech_ini, $fech_fin, $td_cli, $num_doc_cli) {
        $sql = "SELECT TP.*, TS.suc_num_id, TS.suc_nombre FROM "
                . "(SELECT TM.*, e.en_guia, e.os_id, e.en_cantidad, e.en_peso, e.en_alto, e.en_ancho, e.en_largo, e.en_nombre, e.en_direccion, e.en_telefono, "
                . "e.en_ciudad, e.en_departamento, e.en_contiene, e.en_valor_decl, em.emp_nombre, es.ee_desc, "
                . "o.ts_id, ts.ts_desc, o.te_id, te.te_desc, o.cli_td_id, o.cli_num_doc, cl.cli_nombre "
                . "FROM (SELECT TE1.exe_en_id, TE2.exe_ee_id, TE2.exe_fec_hora, TE2.exe_novedad, TE2.td_id_men, TE2.num_doc_men FROM("
                . "SELECT TU1.* FROM est_x_envio AS TU1 WHERE TU1.exe_fec_hora = (SELECT MAX(TU2.exe_fec_hora) "
                . "FROM est_x_envio AS TU2 WHERE TU1.exe_en_id = TU2.exe_en_id)AND TU1.exe_ee_id !=12 "
                . "GROUP BY TU1.exe_en_id ORDER BY TU1.exe_fec_hora DESC) AS TE1 "
                . "LEFT JOIN (SELECT TP1.* FROM est_x_envio AS TP1 WHERE TP1.exe_fec_hora = (SELECT MIN(TP2.exe_fec_hora) "
                . "FROM est_x_envio AS TP2 WHERE TP1.exe_en_id = TP2.exe_en_id) "
                . "GROUP BY TP1.exe_en_id ORDER BY TP1.exe_fec_hora DESC)AS TE2 ON TE1.exe_en_id = TE2.exe_en_id) AS TM, envio AS e, empleados AS em, estado_env AS es, "
                . "orden_serv AS o, tipo_serv AS ts, tipo_envio AS te, clientes AS cl "
                . "WHERE TM.exe_en_id = e.en_id AND em.emp_td_id = TM.td_id_men AND em.emp_num_doc = TM.num_doc_men AND TM.exe_ee_id = es.ee_id AND e.os_id = o.os_id "
                . "AND o.ts_id = ts.ts_id AND o.te_id = te.te_id "
                . "AND cl.cli_td_id = o.cli_td_id AND cl.cli_num_doc = o.cli_num_doc AND te.te_id != 4 "
                . "AND cl.cli_td_id = " . $td_cli . " AND cl.cli_num_doc = " . $num_doc_cli . " AND TM.exe_fec_hora BETWEEN '" . $fech_ini . "' AND '" . $fech_fin . "') AS TP "
                . "LEFT JOIN (SELECT oxs.*, suc.suc_nombre FROM os_x_suc AS oxs, sucursales AS suc WHERE oxs.suc_num_id = suc.suc_num_id) AS TS "
                . "ON TP.os_id = TS.os_id ORDER BY TP.exe_fec_hora;";
        $BD = new MySQL();
//        return $sql;
        return $BD->query($sql);
    }

}
