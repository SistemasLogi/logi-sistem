<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $empleado = new Empleado_DAO();
    echo json_encode($empleado->consultarEmpleadosUsuarios());
} else {
    header("location../");
}