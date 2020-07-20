<?php
session_start();
?>
<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">HISTORIAL OS</strong>

    </div>

    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">
            <?php
            if (isset($_SESSION["adminlogi"])) {
                ?>    
                <div class="row">
                    <div class="alert alert-dismissible alert-info col-lg-6">
                        <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarCliNom" name="formBuscarCliNom">                                    
                            <b>Buscar Cliente :</b>
                            <select class="form-control form-control-sm mr-sm-2 col-6" id="selectCliente">

                            </select>
                            <button type="button" class="btn btn-outline-primary btn-sm" id="btnSelect" name="btnSelect">BUSCAR</button>    
                        </form>
                    </div>
                    <div class="alert alert-dismissible alert-info col-lg-6" id="blqFinalizado">
                        <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarCliNumero" name="formBuscarCliNumero">                                    
                            <b>Buscar N° Cliente :</b>
                            <input class="form-control form-control-sm mr-sm-2" type="number" id="inpBuscaDocCli" name="inpBuscaDocCli" placeholder="Buscar N°">
                            <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaCliNum" name="btnBuscaCliNum">BUSCAR</button>    
                        </form>
                    </div>
                </div>
                <?php
            } else {
                ?>
                <div class="alert alert-dismissible alert-info col-lg-6" id="blqFinalizado">
                    <strong>Listado Total de Ordenes solicitadas</strong>
                </div>
                <?php
            }
            ?>   

            <div class="row" id="tablaOS_cli">

            </div>

        </div>
    </div>

</div>