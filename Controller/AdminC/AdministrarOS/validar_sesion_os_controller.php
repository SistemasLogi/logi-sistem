<?php

session_start();

if (isset($_SESSION['variable_sesion'])) {
    echo "La sesión existe ...";
} else {
    echo "No existe";
}