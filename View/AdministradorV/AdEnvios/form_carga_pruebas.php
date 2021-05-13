<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">CARGA PRUEBAS DE ENTREGA</strong>
    </div>
    <div class="toast-body">
        <form method="post" enctype="multipart/form-data" id="formCargaPruebas" name="formCargaPruebas">
            <fieldset> 
                <div class="row">
                    <div class="input-group col-lg-6 margen_top">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inpFileMasPruebas" name="inpFileMasPruebas[]" multiple="">
                            <label class="custom-file-label" for="inpFileMasPruebas" id="textFileMasPruebas">No se han seleccionado archivos...</label>
                        </div>                            
                    </div>
                    <div class="margen_top" id="errorTxt" style="color: #761c19;"></div> 
                    <div class="input-group col-lg-2 margen_top">
                        <div class="custom-file">
                            <button type="submit" class="btn btn-primary" id="btnGuardarPruebas" name="btnGuardarPruebas">GUARDAR</button>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
        <div class="row mt-5" id="changePruebasEntrega">

        </div>
    </div>
</div>