<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top image-fondo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <img id="inicio" src="img/logos/LOGO-ESTILO-154x61.png" alt=""/>
    <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <a class="nav-link" href="index.php" id="volver">INICIO <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link ancla" href="index.php #services" data-ancla="services">SERVICIOS</a>
            </li>
            <li class="nav-item">
                <a class="nav-link ancla" href="index.php #call-to-action" data-ancla="call-to-action">NOSOTROS</a>
            </li>
            <?php
            if (isset($_SESSION["adminlogi"]) || isset($_SESSION["cliente_a"]) || isset($_SESSION["cliente_b"])) {
                if (isset($_SESSION["adminlogi"])) {
                    ?>  
                    <li class = "nav-item">
                        <a class = "nav-link" href = "administrador.php">ADMINISTRADOR</a>
                    </li>
                    <?php
                } elseif (isset($_SESSION["cliente_a"])|| isset($_SESSION["cliente_b"])) {
                    ?>
                    <li class = "nav-item">
                        <a class = "nav-link" href = "cliente.php">AREA CLIENTE</a>
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
    </div>
</nav>
