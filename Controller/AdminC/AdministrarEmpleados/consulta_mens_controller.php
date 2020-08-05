<?php

if ($_POST) {
    require '../../../config.php';
    $empleado_dao = new Empleado_DAO();
    echo json_encode($empleado_dao->consultaEmpleadosParam("AND ue.car_id = 2"));
} else {
    header("location../");
}