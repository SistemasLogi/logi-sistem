<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">ENTRADAS INVENTARIO</strong>
    </div>
    <div class="toast-body">
        <form method="post" enctype="multipart/form-data" id="formEntInvXlsx" name="formEntInvXlsx">
            <fieldset> 
                <div class="row">
                    <input type="text" class="form-control" id="inputSucNumId" name="inputSucNumId" readonly="" style="display: none;">
                    <div class="input-group col-lg-6 margen_top">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input is-valid" id="inpFileMasInventario" name="inpFileMasInventario">
                            <label class="custom-file-label" for="inpFileMasInventario" id="textNameInv">Archivo Excel</label>
                        </div>                            
                    </div>
                    <div class="margen_top" id="errorTxt" style="color: #761c19;"></div> 
                    <div class="input-group col-lg-2 margen_top">
                        <div class="custom-file">
                            <button type="submit" class="btn btn-success" id="btnGuardarInv" name="btnGuardarInv">GUARDAR</button>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
        <div class="row mt-5" id="changeEntradas">

        </div>
    </div>
</div>
