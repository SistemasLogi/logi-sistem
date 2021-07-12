<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use App\Models\Est_x_envio;
use App\Models\Stock;
use App\Models\Productos;
use App\Models\Salida_producto;
use Illuminate\Support\Facades\DB;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

$empleadoType = new ObjectType([
    'name' => 'empleado',
    'description' => 'tipo de dato empleado',
    'fields' => function ()use(&$est_x_envioType) {
        return [
            'emp_td_id' => Type::int(),
            'emp_num_doc' => Type::string(),
            'emp_nombre' => Type::string(),
            'emp_tel' => Type::string(),
            'emp_cel' => Type::string(),
            'emp_direccion' => Type::string(),
            'emp_email' => Type::string(),
            'esu_id' => Type::int(),
            'est_reparto' => [
                "type" => Type::listOf($est_x_envioType),
                "resolve" => function ($root, $args) {
//                $empleadoId = [$root['emp_td_id'],$root['emp_num_doc']];
                    $emp_est_env = Est_x_envio::where('td_id_men', "=", $root['emp_td_id'])->where('num_doc_men', "=", $root['emp_num_doc'])->where('exe_ee_id', "=", '5')->get()->toArray();
                    return $emp_est_env;
                }
            ],
            'est_entregado' => [
                "type" => Type::listOf($est_x_envioType),
                "resolve" => function ($root, $args) {
//                $empleadoId = [$root['emp_td_id'],$root['emp_num_doc']];
                    $emp_est_env = Est_x_envio::where('td_id_men', "=", $root['emp_td_id'])->where('num_doc_men', "=", $root['emp_num_doc'])->where('exe_ee_id', "=", '6')->get()->toArray();
                    return $emp_est_env;
                }
            ],
            'est_novedad' => [
                "type" => Type::listOf($est_x_envioType),
                "resolve" => function ($root, $args) {
//                $empleadoId = [$root['emp_td_id'],$root['emp_num_doc']];
                    $emp_est_env = Est_x_envio::where('td_id_men', "=", $root['emp_td_id'])->where('num_doc_men', "=", $root['emp_num_doc'])->where('exe_ee_id', "=", '8')->get()->toArray();
                    return $emp_est_env;
                }
            ]
        ];
    }
        ]);

$est_x_envioType = new ObjectType([
    'name' => 'est_x_envio',
    'description' => 'tipo de dato estado por envio',
    'fields' => [
        'exe_en_id' => Type::string(),
        'exe_ee_id' => Type::int(),
        'exe_fec_hora' => Type::string(),
        'exe_novedad' => Type::string(),
        'td_id_men' => Type::int(),
        'num_doc_men' => Type::string()
    ]
        ]);

$stockType = new ObjectType([
    'name' => 'stock',
    'description' => 'tipo de dato stock productos',
    'fields' => function ()use(&$productosType, &$salida_productoType) {
        return [
            'suc_num_id' => Type::int(),
            'pro_cod' => Type::string(),
            'stk_fecha' => Type::string(),
            'stk_cantidad' => Type::int(),
            'stk_observaciones' => Type::string(),
            'producto' => [
                'type' => Type::listOf($productosType),
                'resolve' => function ($root, $args) {
                    $producto = Productos::where('suc_num_id', "=", $root['suc_num_id'])->where('pro_cod', "=", $root['pro_cod'])->get()->toArray();
                    return $producto;
                }
            ],
            'salidas' => [
                'type' => Type::listOf($salida_productoType),
                'resolve' => function ($root, $args) {
                    $stock_prod = Salida_producto::selectRaw('*, (' . $root['stk_cantidad'] . ' - IFNULL(sum(sal_cantidad),0)) as total_stock')->where('suc_num_id', "=", $root['suc_num_id'])
                                    ->where('pro_cod', "=", $root['pro_cod'])
                                    ->where('sal_fecha', ">", $root['stk_fecha'])
                                    ->get()->toArray();
                    return $stock_prod;
                }
            ]
        ];
    }
        ]);

$salida_productoType = new ObjectType([
    'name' => 'salida_prod',
    'description' => 'tipo de dato salida productos',
    'fields' => [
        'sal_fecha' => Type::string(),
        'suc_num_id' => Type::int(),
        'pro_cod' => Type::string(),
        'sal_num_venta' => Type::string(),
        'sal_num_guia' => Type::string(),
        'sal_cantidad' => Type::int(),
        'sal_observaciones' => Type::string(),
        'total_stock' => Type::int(),
        'stock' => [
            'type' => Type::listOf($stockType),
            'resolve' => function ($root, $args) {
                $stock_prod = Stock::where('pro_cod', "=", $root['pro_cod'])
                                ->get()->toArray();
                return $stock_prod;
            }
        ]
    ]
        ]);

$entrada_productoType = new ObjectType([
    'name' => 'entrada_prod',
    'description' => 'tipo de dato entrada productos',
    'fields' => [
        'ent_fecha' => Type::string(),
        'suc_num_id' => Type::int(),
        'pro_cod' => Type::string(),
        'ent_cantidad' => Type::int(),
        'ent_detalle' => Type::string()
    ]
        ]);

$productosType = new ObjectType([
    'name' => 'productos',
    'description' => 'tipo de dato productos',
    'fields' => function ()use(&$stockType) {
        return[
            'suc_num_id' => Type::int(),
            'pro_cod' => Type::string(),
            'pro_sku' => Type::string(),
            'pro_desc' => Type::string(),
            'pro_ubicacion' => Type::string(),
            'pro_fech_registro' => Type::string(),
            'pro_costo_unitario' => Type::int(),
            'stock' => [
                'type' => Type::listOf($stockType),
                'resolve' => function ($root, $args) {
                    $stock_prod = Stock::where('suc_num_id', "=", $root['suc_num_id'])->where('pro_cod', "=", $root['pro_cod'])->get()->toArray();
                    return $stock_prod;
                }
            ]
        ];
    }
        ]);

$sucursalType = new ObjectType([
    'name' => 'sucursales',
    'description' => 'tipo de dato sucursales cliente',
    'fields' => [
        'suc_num_id' => Type::int(),
        'cli_td_id' => Type::int(),
        'cli_num_doc' => Type::string(),
        'suc_nombre' => Type::string(),
        'suc_direccion' => Type::string(),
        'suc_ciudad' => Type::string(),
        'suc_tel' => Type::string(),
        'suc_usuario' => Type::string(),
        'suc_password' => Type::string(),
        'token' => Type::string()
    ]
        ]);


$clienteType = new ObjectType([
    'name' => 'clientes',
    'description' => 'tipo de dato cliente',
    'fields' => [
        'cli_td_id' => Type::int(),
        'cli_num_doc' => Type::string(),
        'cli_nombre' => Type::string(),
        'cli_tel' => Type::string(),
        'cli_cel' => Type::string(),
        'cli_direccion' => Type::string(),
        'cli_per_cont' => Type::string()
    ]
        ]);


$empleado_passType = new ObjectType([
    'name' => 'usuario_emp_pass',
    'description' => 'tipo de dato empleado password',
    'fields' => [
        'ue_td_id' => Type::int(),
        'ue_num_doc' => Type::string(),
        'car_id' => Type::int(),
        'ue_usuario' => Type::string(),
        'ue_password' => Type::string(),
        'token' => Type::string()
    ]
        ]);
