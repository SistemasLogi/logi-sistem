<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

session_start();
if (!isset($_SESSION["adminlogi"])) {
    header("location:../../index.php");
} elseif (!isset($_SESSION["cliente_a"])) {
    header("location:../../index.php");
} elseif (!isset($_SESSION["cliente_b"])) {
    header("location:../../index.php");
} elseif (!isset($_SESSION["sucursal"])) {
    header("location:../../ingreso_clientes.php");
} elseif (!isset($_SESSION["mensajero_logi"])) {
    header("location:../../index.php");
}

session_unset();
session_destroy();
header("location:../../index.php");
