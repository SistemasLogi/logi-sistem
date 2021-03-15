<?php

//$imagefile = '../../img/pruebas_entrega/13649.jpg';

/**
 * Opens new image
 *
 * @param $filename
 */
function icreate($filename) {
    $isize = getimagesize($filename);
    if ($isize['mime'] == 'image/jpeg')
        return imagecreatefromjpeg($filename);
    elseif ($isize['mime'] == 'image/png')
        return imagecreatefrompng($filename);
    /* Add as many formats as you can */
}

/**
 * Resize image maintaining aspect ratio, occuping
 * as much as possible with width and height inside
 * params.
 *
 * @param $image
 * @param $width
 * @param $height
 */
function resizeMax($image, $width, $height) {
    /* Original dimensions */
    $origw = imagesx($image);
    $origh = imagesy($image);

    $ratiow = $width / $origw;
    $ratioh = $height / $origh;
    $ratio = min($ratioh, $ratiow);

    $neww = $origw * $ratio;
    $newh = $origh * $ratio;

    $new = imageCreateTrueColor($neww, $newh);

    imagecopyresampled($new, $image, 0, 0, 0, 0, $neww, $newh, $origw, $origh);
    return $new;
}

$imgh = icreate($imagefile);
$imgr = resizeMax($imgh, 1020, 700);

//header('Content-type: image/jpeg');
imagejpeg($imgr, $imagefile);
