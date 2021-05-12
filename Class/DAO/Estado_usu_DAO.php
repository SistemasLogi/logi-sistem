<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estado_usu_DAO
 *
 * @author TECNOLOGIA-LOGI
 */
class Estado_usu_DAO {

    //put your code here
    /**
     * Funcion que retorna los datos de tabla estado_usu
     * @param type $filtro
     * @return type
     */
    function consultaEmpleadosParam() {
        $sql = "SELECT * FROM estado_usu;";
        $BD = new MySQL();
        return $BD->query($sql);
    }

}
