<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'vendor/autoload.php';
require_once 'auth.php';

if ($_POST) {
    $_GET['t'] = $_POST['token'];
    require "controllers/data.php";
} else {
    echo 'No se ha especificado un ingreso valido';
}
