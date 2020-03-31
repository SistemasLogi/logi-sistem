<?php session_start(); ?>
<div class="alert alert-dismissible alert-warning">
    <form id="formOrdenServ">
        <fieldset>
            <legend>Solicitar Recolección</legend>
            <div class="row">
                <div class="form-group col-lg-3" style="display: none">
                    <label for="inputNumOrd">N° Ord</label>
                    <input type="text" class="form-control" id="inputNumOrd" name="inputNumOrd" placeholder="N° Orden">
                </div>
                <div class="form-group col-lg-8">
                    <label for="inputDir">Dirección</label>
                    <input type="text" class="form-control" id="inputDir" name="inputDir" placeholder="Dirección Recolección" value="<?php echo $_SESSION["direccion_cli"]; ?>">
                </div>
                <div class="form-group col-lg-4">
                    <label for="selectCiudad">Ciudad</label>
                    <select class="form-control" id="selectCiudad" name="selectCiudad">

                    </select>
                </div>                                                                                                
            </div>                                           
            <div class="row">
                <div class="form-group col-lg-4">
                    <label for="inputPerContacto">Persona Contacto</label>
                    <input type="text" class="form-control" id="inputPerContacto" name="inputPerContacto" placeholder="Persona Contacto" value="<?php echo $_SESSION["per_contac"]; ?>">
                </div>
                <div class="form-group col-lg-3">
                    <label for="inputTele">Teléfono</label>
                    <input type="text" class="form-control" id="inputTele" name="inputTele" placeholder="Teléfono" value="<?php echo $_SESSION["telefono_cli"]; ?>">
                </div>                
                <div class="form-group col-lg-2">
                    <label for="inputCantidadEnv">Cantidad</label>
                    <input type="text" class="form-control" id="inputCantidadEnv" name="inputCantidadEnv" placeholder="Persona Contacto">
                </div>
                <div class="form-group col-lg-3">
                    <label for="selectTipEnvio">Tipo Envio</label>
                    <select class="form-control" id="selectTipEnvio" name="selectTipEnvio">

                    </select>
                </div>                
            </div> 
            <div class="row">
                <div class="form-group col-lg-3">
                    <button type="submit" class="btn btn-primary" id="btnGenOrdServ" name="btnGenOrdServ">Generar Orden Servicio</button>
                </div>
                <div class="form-group col-lg-2">
                    <button type="button" class="btn btn-dark" id="btnCancelarOrd" name="btnCancelarOrd">Cancelar</button>
                </div>
                <div class="form-group col-lg-3">
                    <button type="button" class="btn btn-secondary" id="btnAgreEnv" name="btnAgreEnv" disabled="">Agregar Envios</button>
                </div>
                <div id="divMensaje" class="col-lg-12">

                </div>                
            </div>
        </fieldset>
    </form>
    <div id="formEnvios">
        <form method="post" enctype="multipart/form-data" id="formMasEnvDoc" name="formMasEnvDoc">
            <fieldset> 
                <div class="row">
                    <div class="input-group col-lg-6">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inpFileMasEnvDoc" name="inpFileMasEnvDoc">
                            <label class="custom-file-label" for="inpFileMasEnvDoc" id="textMasEnvDoc">Archivo plano csv</label>
                        </div>
                    </div>                                                                
                    <div class="input-group col-lg-6">
                        <div class="custom-file">
                            <button type="submit" class="btn btn-primary" id="btnGMasEnvDoc" name="btnGMasEnvDoc">GUARDAR</button>
                        </div>
                    </div>
                </div>
                
            </fieldset>
        </form>
    </div>    
</div>