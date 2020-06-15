<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $est_os = new Est_x_serv_DAO();
    echo json_encode($est_os->consultaUltimoEstadoOS(" AND TM.exs_fecha_hora >= CURDATE();"));
} else {
    header("location../");
}
