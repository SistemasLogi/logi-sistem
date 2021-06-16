<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use App\Models\Empleado;
use App\Models\Empleado_pass;
use App\Models\Productos;
use App\Models\Stock;
use App\Models\Salida_producto;
use App\Models\Entrada_producto;
use App\Models\Sucursal;
use App\Models\Cliente;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

$rootQuery = new ObjectType([
    'name' => 'Query',
    'fields' => [
        'empleado' => [
            'type' => Type::listOf($empleadoType),
            'args' => [
                'emp_td_id' => Type::int(),
                'emp_num_doc' => Type::string()
            ],
            'resolve' => function ($root, $args) {
//                $empleado = Empleado::find($args["emp_td_id"], $args["emp_num_doc"])->toArray();
                $empleado = Empleado::where('emp_td_id', "=", $args["emp_td_id"])->where('emp_num_doc', "=", $args["emp_num_doc"])->get()->toArray();
                return $empleado;
            }
        ],
        'empleados' => [
            'type' => Type::listOf($empleadoType),
            'resolve' => function ($root, $args) {
                $empleados = Empleado::get()->toArray();
                return $empleados;
            }
        ],
        'emp_pass' => [
            'type' => Type::listOf($empleado_passType),
            'args' => [
                'usuario' => Type::string()
            ],
            'resolve' => function ($root, $args) {
                $empleados = Empleado_pass::where('ue_usuario', "=", $args['usuario'])->get()->toArray();
                return $empleados;
            }
        ],
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
                $productos_list = Stock::where('suc_num_id', "=", $args["suc_num_id"])->get()->toArray();
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
        ],
        'cliente_suc' => [
            'type' => Type::listOf($sucursalType),
            'resolve' => function ($root, $args) {
                $sucursales_list = Sucursal::get()->toArray();
                return $sucursales_list;
            }
        ],
        'cliente' => [
            'type' => Type::listOf($clienteType),
            'resolve' => function ($root, $args) {
                $clientes_list = Cliente::get()->toArray();
                return $clientes_list;
            }
        ]
    ]
        ]);
