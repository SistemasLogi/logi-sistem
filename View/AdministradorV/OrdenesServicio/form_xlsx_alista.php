<div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">DATOS DE ORDEN CREADA</strong>
    </div>
    <div class="toast-body row">
        <div class="alert alert-dismissible alert-primary col-lg-12">
            <div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
                <div id="divMensaje">

                </div>                
            </div>
        </div>
    </div>
</div>
<div class="toast show border-primary" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">DESCRIPCIÓN DE ENVIOS PARA ALISTAMIENTO</strong>
    </div>
    <div class="alert alert-dismissible alert-info col-lg-12 border-light" id="blqCargaExcel" style="border-radius: 0.5rem;">
        <form method="post" enctype="multipart/form-data" id="formMasAlistamiento" name="formMasAlistamiento">
            <fieldset>
                <legend id="nombreCliSuc"></legend>
                <div class="row">
                    <div class="form-group row margen_top col-lg-4">
                        <label for="inputDateAlist" class="col-2 col-form-label">Fecha:</label>
                        <div class="col-10">
                            <input class="form-control" type="datetime-local" id="inputDateAlist" name="inputDateAlist">
                        </div>
                    </div>
                    <div class="margen_top" id="errorTxtDate" style="color: #761c19;"></div>
                    <div class="input-group col-lg-4 margen_top">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input is-valid" id="inpFileMasAlist" name="inpFileMasAlist">
                            <label class="custom-file-label" for="inpFileMasAlist" id="textMasAlist">Archivo Excel Alistamiento</label>
                        </div>                            
                    </div>
                    <div class="margen_top" id="errorTxt" style="color: #761c19;"></div> 
                    <div class="input-group col-lg-2 margen_top">
                        <div class="custom-file">
                            <button type="submit" class="btn btn-info" id="btnGMasAlist" name="btnGMasAlist">GUARDAR</button>
                        </div>
                    </div>               
                    <div class="input-group col-lg-2 margen_top">
                        <div class="custom-file">
                            <a id="enlPlantillaAlist" href="Files/Plantillas/Plantilla_Alistamiento.xlsx">Descargue <strong>Aqui </strong> la plantilla Excel</a>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
        <div id="changeAlistEnvios">

        </div>        
    </div>
    <div id="bloques">

    </div>
</div>