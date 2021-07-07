<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use GraphQL\Type\Definition\ObjectType;

require ('querys/clientesQuerys.php');
require ('querys/empleadoQuerys.php');
require ('querys/loginQuerys.php');
require ('querys/sucursalQuerys.php');
require ('querys/adminQuerys.php');

$queryes = array();
$queryes += $empleadoQuerys;
$queryes += $adminQuerys;
$queryes += $loginQuerys;
$queryes += $clienteQuerys;
$queryes += $sucursalQuerys;

$rootQuery = new ObjectType([
    'name' => 'Query',
    'fields' => $queryes
        ]);
