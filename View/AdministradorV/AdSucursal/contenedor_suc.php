<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">BUSCADOR</strong>
    </div>
    <div class="toast-body">
        <div class="row">
            <div class="alert alert-dismissible alert-info col-lg-9">
                <form class="form-inline my-2 my-lg-0 form-group-sm"id="formBuscarSuc" name="formBuscarSuc">                                    
                    <b>Buscar Cliente :</b>
                    <select class="form-control form-control-sm mr-sm-2 col-6" id="selectSucursal" name="selectSucursal">

                    </select>
                    <button type="button" class="btn btn-outline-primary btn-sm" id="btnSelectSuc" name="btnSelectSuc">BUSCAR</button>    
                </form>
            </div>
        </div>
        <div class="row">
            <div class="form-group form-group-sm col-lg-2">
                <label for="inputNumCliAc">N° de Cliente</label>
                <input type="text" class="form-control form-control-sm" id="inputNumCliAc" name="inputNumCliAc" readonly=""> 
            </div> 
            <div class="form-group form-group-sm col-lg-4">
                <label for="inputNombreCliAc">Cliente</label>
                <input type="text" class="form-control form-control-sm" id="inputNombreCliAc" name="inputNombreCliAc" readonly=""> 
            </div> 
            <div class="form-group form-group-sm col-lg-2">
                <label for="inputSucId">Suc ID</label>
                <input type="text" class="form-control form-control-sm" id="inputSucId" name="inputSucId" readonly=""> 
            </div> 
            <div class="form-group form-group-sm col-lg-4">
                <label for="inputSucNombre">Nombre Sucursal</label>
                <input type="text" class="form-control form-control-sm" id="inputSucNombre" name="inputSucNombre" readonly=""> 
            </div> 
        </div>

        <div id="contenSucSelected">

        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style="border-radius: 0.8rem;">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link enlace" id="formNuevoProd">Nuevo Producto</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link enlace" id="formIngInvXlsx">Ingreso Inventario</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                </ul>
                <div id="imageSucursal">
                    
                </div>
            </div>
        </nav>
    </div>
</div>
<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" id="contenidoInvent" style="max-width: 100%; border-radius: 0.5rem;">

</div>