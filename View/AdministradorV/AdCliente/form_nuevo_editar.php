<div class="row">
    <div class="col-lg-7">
        <form class="form-inline my-2 my-lg-0" id="formBuscarCli" name="formBuscarCli">                                    
            <b>Buscar Documento :</b>
            <input class="form-control mr-sm-2" type="text" id="inpBuscaDocCli" name="inpBuscaDocCli" placeholder="Buscar Doc.">
            <button type="submit" class="btn btn-outline-primary" id="btnBuscaCli" name="btnBuscaCli">BUSCAR</button>    
        </form>
    </div>
    <div class="col-lg-5" id="menCliNoAccess">

    </div>

</div>

<form id="formCliente">
    <fieldset>
        <legend>Cliente</legend>        
        <div class="row">
            <div class="form-group col-lg-5">
                <label for="inputNomCli">Nombre Cliente</label>
                <input type="text" class="form-control" id="inputNomCli" name="inputNomCli" placeholder="Nombre Cliente">
            </div>
            <div class="form-group col-lg-2">
                <label for="selectTipDoc">Tipo Doc.</label>
                <select class="form-control" id="selectTipDoc" name="selectTipDoc">

                </select>
            </div>
            <div class="form-group col-lg-3">
                <label for="inputNumCli">N° Doc.</label>
                <input type="text" class="form-control" id="inputNumCli" name="inputNumCli" placeholder="N° Documento"> 
            </div>
            <div class="form-group col-lg-2">
                <label for="inputTelCli">Teléfono</label>
                <input type="text" class="form-control" id="inputTelCli" name="inputTelCli" placeholder="N° Tel. Fijo">
            </div>
        </div>                                           
        <div class="row">
            <div class="form-group col-lg-2">
                <label for="inputCelCli">Celular</label>
                <input type="text" class="form-control" id="inputCelCli" name="inputCelCli" placeholder="N° Celular">
            </div>
            <div class="form-group col-lg-4">
                <label for="inputDirCli">Dirección</label>
                <input type="text" class="form-control" id="inputDirCli" name="inputDirCli" placeholder="Dirección">
            </div>
            <div class="form-group col-lg-3">
                <label for="inputPerCont">P. Contacto</label>
                <input type="text" class="form-control" id="inputPerCont" name="inputPerCont" placeholder="Contacto">
            </div>
            <div class="form-group col-lg-3">
                <label for="selectTipUs">Tipo Usuario</label>
                <select class="form-control" id="selectTipUs" name="selectTipUs">

                </select>
            </div>
        </div> 
        <div class="row">
            <div class="form-group mb-2 col-lg-2">
                <button type="submit" class="btn btn-primary" id="btnGuardaCli" name="btnGuardaCli">GUARDAR</button> 
            </div>
            <div class="form-group mb-2 col-lg-2">
                <button type="button" class="btn btn-dark" id="btnCancelarCli" name="btnCancelarCli">Cancelar</button>                   
            </div>
        </div>

    </fieldset>
</form>