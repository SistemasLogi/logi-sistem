<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Empleado
 *
 * @author LOGI
 */
class Sucursal extends Model {

    //put your code here
    //put your code here
    protected $table = "sucursales";
    public $timestamp = false;
    protected $fillable = [
        'suc_num_id',
        'cli_td_id',
        'cli_num_doc',
        'suc_nombre',
        'suc_direccion',
        'suc_ciudad',
        'suc_tel',
        'suc_usuario',
        'suc_password'
    ];
    protected $primary_key = ['suc_num_id'];
    public $incrementing = false;

    public function cliente_titular() {
//        return $this->belongsTo(Est_x_envio::class, ['td_id_men', 'num_doc_men']);//el segundo parametro es la llave foranea en la tabla de la relacion
    }

}
