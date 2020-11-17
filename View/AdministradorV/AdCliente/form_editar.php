<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">BUSCADOR</strong>

    </div>
    <div class="toast-body">
        <div class="alert alert-dismissible alert-primary">
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


            <nav class="navbar navbar-expand-lg navbar-light bg-light" style="border-radius: 0.8rem;">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarColor03">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link enlace" id="vistaFormEditCli">Editar Cliente</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link enlace" id="vistaFormCrearSuc">Crear Sucursal</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link enlace" id="vistaFormEditSuc">Editar Sucursal</a>
                        </li>                        
                    </ul>
                </div>
            </nav>
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