<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


if ($_POST) {
    require '../../../config.php';
    $cargo_dao = new Cargo_DAO();
    echo json_encode($cargo_dao->consultaCargos());
} else {
    header("location../");
}