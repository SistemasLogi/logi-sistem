<?php

if ($_POST) {
    require '../../../config.php';
    $empleado_dao = new Empleado_DAO();
    echo json_encode($empleado_dao->consultaEmpleados());
} else {
    header("location../");
}
