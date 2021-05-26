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
     * funcion que retorna la informacion de envios por numero de orden de servicio cliente y estado
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
     * funcion que retorna la informacion de envios por numero de orden de servicio
     * @param type $num_os
     * @return type
     */
    function consultaInfoEnviosOS($num_os) {
        $sql = "SELECT e.*, o.*, c.*, es.exe_fec_hora, ee.ee_desc, ee.ee_id, cd.ciu_nombre, d.*, dt.*, ts.ts_desc, te.te_desc "
                . "FROM envio AS e, orden_serv AS o, clientes AS c, est_x_envio "
                . "AS es, estado_env AS ee, ciudad AS cd, departamento AS d, detalle_envios AS dt, tipo_serv AS ts, tipo_envio AS te "
                . "WHERE e.os_id = o.os_id AND o.cli_td_id = c.cli_td_id "
                . "AND o.cli_num_doc = c.cli_num_doc AND o.os_id = " . $num_os . " AND es.exe_en_id = e.en_id "
                . "AND es.exe_ee_id = ee.ee_id AND cd.ciu_id = o.ciu_id AND cd.dep_id = d.dep_id AND dt.en_id = e.en_id AND o.ts_id = ts.ts_id AND o.te_id = te.te_id AND ee.ee_id = 1;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

    /**
     * funcion que retorna los envios en estado 1 para imprimir guia
     * @param type $td_id_cl
     * @param type $num_doc_cl
     * @param type $suc_num
     * @return type
     */
    function consulta_env_reimp_guias($td_id_cl, $num_doc_cl, $suc_num) {
        $sql = "SELECT TP.*, TS.suc_num_id, TS.suc_nombre FROM "
                . "(SELECT TM.*, e.en_guia, e.en_novedad, o.os_id, e.en_cantidad, e.en_nombre, e.en_direccion, e.en_telefono, "
                . "e.en_ciudad, e.en_departamento, e.en_contiene, e.en_valor_decl, em.emp_nombre, es.ee_desc, "
                . "o.ts_id, ts.ts_desc, o.te_id, te.te_desc, o.cli_td_id, o.cli_num_doc, cl.cli_nombre, ess.exs_fecha_hora, ess.es_id "
                . "FROM "
                . "(SELECT T1.* FROM est_x_envio AS T1 WHERE T1.exe_fec_hora = (SELECT MAX(T2.exe_fec_hora) "
                . "FROM est_x_envio AS T2 WHERE T1.exe_en_id = T2.exe_en_id ) "
                . "ORDER BY T1.exe_fec_hora DESC) AS TM, envio AS e, empleados AS em, estado_env AS es, "
                . "orden_serv AS o, est_x_serv AS ess, tipo_serv AS ts, tipo_envio AS te, clientes AS cl "
                . "WHERE TM.exe_en_id = e.en_id AND em.emp_td_id = TM.td_id_men "
                . "AND em.emp_num_doc = TM.num_doc_men AND TM.exe_ee_id = es.ee_id AND e.os_id = o.os_id "
                . "AND o.ts_id = ts.ts_id AND o.te_id = te.te_id "
                . "AND cl.cli_td_id = o.cli_td_id AND cl.cli_num_doc = o.cli_num_doc AND o.os_id = ess.os_id "
                . "AND TM.exe_ee_id = 1  AND cl.cli_td_id = " . $td_id_cl . " AND cl.cli_num_doc = " . $num_doc_cl . ") AS TP "
                . "JOIN "
                . "(SELECT oxs.*, suc.suc_nombre FROM os_x_suc AS oxs, sucursales AS suc WHERE oxs.suc_num_id = suc.suc_num_id AND oxs.suc_num_id = " . $suc_num . ") AS TS "
                . "ON TP.os_id = TS.os_id GROUP BY TP.exe_en_id DESC;";
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
                . "'" . $obj_env_vo->getNovedad() . "','" . $obj_env_vo->getContenido() . "'," . $obj_env_vo->getValor_declarado() . ","
                . "" . $obj_env_vo->getNum_venta() . ", " . $obj_env_vo->getRecaudo() . ", " . $obj_env_vo->getTipo_pag_id() . ", "
                . "" . $obj_env_vo->getValor_pago() . ")";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que inserta un bloque de registros en tabla detalle_envio
     * @param type $sql
     */
    function insertarBloqueEnTablaDetalle($sql) {

        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que inserta un registro en tabla envio a partir de una consulta
     * @param type $num_os
     * @param type $num_venta
     * @return type
     */
    function insertarEnvio_from_select($num_os, $num_venta) {
        $sql = "INSERT INTO envio "
                . "SELECT null AS id, t_sal_guia_num, " . $num_os . " AS os, t_sal_cant_env, t_sal_peso, t_sal_alto, t_sal_ancho, "
                . "t_sal_largo, 'URBANO' AS trayecto, t_sal_nom_dest, t_sal_direc_dest, t_sal_tel_destino, "
                . "t_sal_ciudad, t_sal_depto, t_sal_observ_env, t_sal_contiene, t_sal_val_decl, t_sal_num_venta, t_sal_recaudo_en, "
                . "t_sal_tpa_id, t_sal_val_pago "
                . "FROM salidas_prod_temp  WHERE t_sal_num_venta = " . $num_venta . " GROUP BY t_sal_num_venta;";
        $BD = new MySQL();
//        return $sql;
        return $BD->execute_query($sql);
    }

    /**
     * Funcion que retorna el ultimo id generado en envio por os
     * @param type $os
     * @return type
     */
    function consulta_max_id_x_os($os) {
        $sql = "SELECT MAX(en_id) AS id_env FROM envio WHERE os_id = " . $os . ";";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
