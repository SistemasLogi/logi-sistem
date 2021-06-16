<?php

if (!isset($_GET['t']))
    die('Debe especificar el token');

$token = $_GET['t'];

$datos = Auth::GetData(
                $token
);

echo $datos->role;
