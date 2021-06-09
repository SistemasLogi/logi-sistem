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
class Entrada_producto extends Model {

    //put your code here
    protected $table = "entrada_prod";
    public $timestamp = false;
    protected $fillable = ['ent_fecha', 'suc_num_id', 'pro_cod', 'ent_cantidad', 'ent_detalle'];
    protected $primary_key = ['ent_fecha', 'suc_num_id', 'pro_cod'];
    public $incrementing = false;

    public function producto_sal() {
        return $this->belongsTo(Productos::class, ['suc_num_id', 'pro_cod'], ['suc_num_id', 'pro_cod']);
    }

}
