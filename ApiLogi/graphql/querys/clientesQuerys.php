<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use App\Models\Sucursal;
use GraphQL\Type\Definition\Type;

$clienteQuerys = [
    'cliente_suc' => [
        'type' => Type::listOf($sucursalType),
        'resolve' => function ($root, $args) {
            $sucursales_list = Sucursal::get()->toArray();
            return $sucursales_list;
        }
    ]
];
