<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../config.php';
    $os_dao = new Orden_serv_DAO();
    echo json_encode($os_dao->consulta_id_UltimaOS());
} else {
    header("location../");
}
