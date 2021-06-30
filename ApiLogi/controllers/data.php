<?php

require_once '../vendor/autoload.php';
require_once '../auth.php';

$token = $header_token;

$datos = Auth::GetData(
                $token
);

echo $datos->id_role . '<br>';
echo $datos->role . '<br>';
echo $datos->num_doc . '<br>';
echo $datos->id_doc;
