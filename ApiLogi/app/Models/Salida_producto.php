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
class Salida_producto extends Model {

    //put your code here
    protected $table = "salida_prod";
    public $timestamp = false;
    protected $fillable = ['sal_fecha', 'suc_num_id', 'pro_cod', 'sal_num_venta', 'sal_num_guia', 'sal_cantidad', 'sal_observaciones'];
    protected $primary_key = ['sal_fecha', 'suc_num_id', 'pro_cod', 'sal_num_venta'];
    public $incrementing = false;

    public function producto_sal() {
        return $this->belongsTo(Productos::class, ['suc_num_id', 'pro_cod'], ['suc_num_id', 'pro_cod']);
    }

}
