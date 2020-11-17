<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast show border-light col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
        <div class="toast-header">
            <strong class="mr-auto">NUEVO PRODUCTO</strong>

        </div>
        <div class="toast-body">
            <form id="formProducto">
                <fieldset>       
                    <div class="row">
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputCodProd">Código</label>
                            <input type="text" class="form-control form-control-sm" id="inputNumSuc" name="inputNumSuc" readonly="" style="display: none;"> 
                            <input type="text" class="form-control form-control-sm" id="inputCodProd" name="inputCodProd" placeholder="Código"> 
                        </div>
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputSku">SKU</label>
                            <input type="text" class="form-control form-control-sm" id="inputSku" name="inputSku" placeholder="SKU">
                        </div>
                        <div class="form-group form-group-sm col-lg-4">
                            <label for="inputNomProd">Nombre / Descripción</label>
                            <input type="text" class="form-control form-control-sm" id="inputNomProd" name="inputNomProd" placeholder="Nombre">
                        </div>
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputUbProd">Ubicación</label>
                            <input type="text" class="form-control form-control-sm" id="inputUbProd" name="inputUbProd" placeholder="Ubicación">
                        </div>
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputCantProd">Cantidad</label>
                            <input type="text" class="form-control form-control-sm" id="inputCantProd" name="inputCantProd" placeholder="Cantidad">
                        </div>
                    </div> 
                    <div class="row">
                        <div class="form-group mb-2 col-lg-2">
                            <button type="submit" class="btn btn-info" id="btnGuardaProd" name="btnGuardaProd">GUARDAR</button> 
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="button" class="btn btn-dark" id="btnCancelarProd" name="btnCancelarProd">CANCELAR</button>                   
                        </div>
                    </div>

                </fieldset>
            </form>
        </div>
    </div>
</div>
