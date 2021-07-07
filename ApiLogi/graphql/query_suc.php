<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use GraphQL\Type\Definition\ObjectType;

require ('querys/almacenQuerys.php');

$queryes = array();
$queryes += $almacenQuerys;

$rootQuerySuc = new ObjectType([
    'name' => 'Query',
    'fields' => $queryes
        ]);
