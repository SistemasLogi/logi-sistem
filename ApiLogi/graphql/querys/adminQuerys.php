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
use App\Models\Aenvio;
use App\Models\Orden_servicio;
use GraphQL\Type\Definition\Type;

$adminQuerys = [
    'productos' => [
        'type' => Type::listOf($productosType),
        'resolve' => function ($root, $args) {
            $productos_list = Productos::get()->toArray();
            return $productos_list;
        }
    ],
    'stock' => [
        'type' => Type::listOf($stockType),
        'args' => [
            'suc_num_id' => Type::int()
        ],
        'resolve' => function ($root, $args) {
            $productos_list = Stock::where('suc_num_id', "=", $args['suc_num_id'])->get()->toArray();
            return $productos_list;
        }
    ],
    'hist_salidas' => [
        'type' => Type::listOf($salida_productoType),
        'args' => [
            'suc_num_id' => Type::int()
        ],
        'resolve' => function ($root, $args) {
            $salidas_list = Salida_producto::where('suc_num_id', "=", $args['suc_num_id'])->get()->toArray();
            return $salidas_list;
        }
    ],
    'hist_entradas' => [
        'type' => Type::listOf($entrada_productoType),
        'args' => [
            'suc_num_id' => Type::int()
        ],
        'resolve' => function ($root, $args) {
            $entradas_list = Entrada_producto::where('suc_num_id', "=", $args['suc_num_id'])->get()->toArray();
            return $entradas_list;
        }
    ],
    'alist_envios' => [
        'type' => Type::listOf($aenvioType),
        'resolve' => function ($root, $args) {
            $aenvio_list = Aenvio::get()->toArray();
            return $aenvio_list;
        }
    ],
    'ordenes_servicio' => [
        'type' => Type::listOf($osType),
        'resolve' => function ($root, $args) {
            $aenvio_list = Orden_servicio::get()->toArray();
            return $aenvio_list;
        }
    ]
];
