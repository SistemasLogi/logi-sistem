<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Stock
 *
 * @author ANDRES
 */
class Stock extends Model {

    //put your code here
    protected $table = "stock";
    public $timestamp = false;
    protected $fillable = ['suc_num_id', 'pro_cod', 'stk_fecha', 'stk_cantidad', 'stk_observaciones'];
    protected $primary_key = ['suc_num_id', 'pro_cod'];
    public $incrementing = false;

    public function productos() {
        return $this->belongsTo(Productos::class, ['suc_num_id', 'pro_cod'], ['suc_num_id', 'pro_cod']);
    }

}
