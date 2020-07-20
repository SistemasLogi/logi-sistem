<?php

if ($_POST) {
    require '../../../config.php';
    $operador_dao = new Operadores_DAO();
    echo json_encode($operador_dao->consultaOperadores());
} else {
    header("location../");
}