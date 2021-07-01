<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use App\Models\Cliente;
use GraphQL\Type\Definition\Type;

$sucursalQuerys = [
    'cliente' => [
        'type' => Type::listOf($clienteType),
        'resolve' => function ($root, $args) {
            $clientes_list = Cliente::get()->toArray();
            return $clientes_list;
        }
    ]
];
