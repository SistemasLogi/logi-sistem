<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

session_start();
if (isset($_SESSION["adminlogi"])) {
    header("location:admin_logi.php");
} elseif (isset($_SESSION["cliente_a"])) {
    header("location:cliente_logi.php");
} elseif (isset($_SESSION["cliente_b"])) {
    header("location:cliente.php");
} elseif (isset($_SESSION["sucursal"])) {
    header("location:area_control_clientes.php");
} elseif (isset($_SESSION["mensajero_logi"])) {
    header("location:mensajero_logi.php");
}
