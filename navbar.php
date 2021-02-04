<ul class="navbar-nav ml-auto">
    <li class="nav-item active">
        <a class="nav-link" href="index.php" id="volver">INICIO <span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
        <a class="nav-link ancla" href="index.php#featured-services" data-ancla="featured-services">SERVICIOS</a>
    </li>
    <li class="nav-item">
        <a class="nav-link ancla" href="index.php#call-to-action" data-ancla="call-to-action">NOSOTROS</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="rastreo_envio.php">RASTREO ENVIO</a>
    </li>
    <li class="nav-item">
        <a class="nav-link ancla" href="index.php#contact" data-ancla="contact">CONTACTENOS</a>
    </li>
    <?php
    if (isset($_SESSION["adminlogi"]) || isset($_SESSION["cliente_a"]) || isset($_SESSION["cliente_b"]) || isset($_SESSION["mensajero_logi"]) || isset($_SESSION["sucursal"])) {
        if (isset($_SESSION["adminlogi"])) {
            ?>  
            <li class = "nav-item">
                <a class = "nav-link" href = "admin_logi.php">ADMINISTRADOR</a>
            </li>
            <?php
        } elseif (isset($_SESSION["cliente_a"]) || isset($_SESSION["cliente_b"])) {
            ?>
            <li class = "nav-item">
                <a class = "nav-link" href = "cliente_logi.php">AREA CLIENTE</a>
            </li>
            <?php
        } elseif (isset($_SESSION["sucursal"])) {
            ?>
            <li class = "nav-item">
                <a class = "nav-link" href = "area_control_clientes.php">AREA CLIENTE</a>
            </li>
            <?php
        } elseif (isset($_SESSION["mensajero_logi"])) {
            ?>
            <li class = "nav-item">
                <a class = "nav-link" href = "mensajero_logi.php">MENSAJERO</a>
            </li>
            <?php
        }
        ?>
        <li class = "nav-item">
            <a class = "nav-link" href = "Controller/Login_General/log_aut_control.php">CERRAR SESION</a>
        </li>
        <?php
    } else {
        ?>
        <li class = "nav-item">
            <a class = "nav-link" href = "inicio_sesion.php">ACCESO CLIENTES</a>
        </li>
        <?php
    }
    ?>

</ul>