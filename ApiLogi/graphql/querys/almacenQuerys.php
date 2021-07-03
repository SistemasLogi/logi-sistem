<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use App\Models\Productos;
use App\Models\Stock;
use App\Models\Salida_producto;
use App\Models\Entrada_producto;
use GraphQL\Type\Definition\Type;

$almacenQuerys = [
    'productos' => [
        'type' => Type::listOf($productosType),
        'resolve' => function ($root, $args) {
            $productos_list = Productos::get()->toArray();
            return $productos_list;
        }
    ],
    'stock' => [
        'type' => Type::listOf($stockType),
//        'args' => [
//            'suc_num_id' => Type::int()
//        ],
        'resolve' => function ($root, $args) {
            $productos_list = Stock::where('suc_num_id', "=", $_SESSION['id_role'])->get()->toArray();
            return $productos_list;
        }
    ],
    'hist_salidas' => [
        'type' => Type::listOf($salida_productoType),
        'args' => [
            'suc_num_id' => Type::int()
        ],
        'resolve' => function ($root, $args) {
            $salidas_list = Salida_producto::where('suc_num_id', "=", $args["suc_num_id"])->get()->toArray();
            return $salidas_list;
        }
    ],
    'hist_entradas' => [
        'type' => Type::listOf($entrada_productoType),
        'args' => [
            'suc_num_id' => Type::int()
        ],
        'resolve' => function ($root, $args) {
            $entradas_list = Entrada_producto::where('suc_num_id', "=", $args["suc_num_id"])->get()->toArray();
            return $entradas_list;
        }
    ]
];
