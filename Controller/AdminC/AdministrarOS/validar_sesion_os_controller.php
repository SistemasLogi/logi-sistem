<?php

session_start();

$_SESSION['variable_sesion'] = 232;
if (isset($_SESSION['variable_sesion'])) {
    echo $_SESSION['variable_sesion'];
} else {
    echo "No existe";
}