<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">BUSCADOR</strong>

    </div>
    <div class="toast-body">
        <div class="alert alert-dismissible alert-warning">
            <div class="row">
                <div class="col-lg-7">
                    <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarCli" name="formBuscarCli">                                    
                        <b>Buscar Documento :</b>
                        <input class="form-control form-control-sm mr-sm-2" type="text" id="inpBuscaDocCli" name="inpBuscaDocCli" placeholder="Buscar Doc.">
                        <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaCli" name="btnBuscaCli">BUSCAR</button>    
                    </form>
                </div>
                <div class="col-lg-5" id="menCliNoAccess">

                </div>                
            </div>
            <legend>Cliente: <span id="labelNombreCli"></span></legend>
            <legend>ID Nº: <span id="labelNumeroCli"></span></legend>
            <div class="btn-group btn-group-toggle" data-toggle="buttons" id="menuEditClient">
                <label class="btn btn-light active" id="vistaFormEditCli">
                    <input type="radio" name="options" id="option1" autocomplete="off" checked="">Editar Cliente
                </label>
                <label class="btn btn-primary" id="vistaFormCrearSuc">
                    <input type="radio" name="options" id="option2" autocomplete="off">Crear Sucursal
                </label>
                <label class="btn btn-light">
                    <input type="radio" name="options" id="option3" autocomplete="off">Editar Sucursal
                </label>
            </div>
            <div id="contenFormEdit">
                
            </div>
            
        </div>
    </div>
</div>
<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">TABLA GENERAL</strong>

    </div>
    <div class="toast-body">

        <div id="tablaCliAct">

        </div>
    </div>
</div>