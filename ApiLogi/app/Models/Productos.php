<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Productos
 *
 * @author ANDRES
 */
class Productos extends Model {

    //put your code here
    protected $table = "productos";
    public $timestamp = false;
    protected $fillable = ['suc_num_id', 'pro_cod', 'pro_sku', 'pro_desc', 'pro_ubicacion', 'pro_fech_registro', 'pro_costo_unitario'];
    protected $primary_key = ['suc_num_id', 'pro_cod'];
    public $incrementing = false;

    public function stock() {
        return $this->hasMany(Stock::class, ['suc_num_id', 'pro_cod']);
    }
    
    public function salida() {
        return $this->hasMany(Salida_producto::class, ['suc_num_id', 'pro_cod']);
    }

}
