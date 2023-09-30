<?php 

$bg = imagecreatefromjpeg('image.jpg');
$logo = imagecreatefrompng('logo.png');

$bgwidth = imagesx($bg);
$bgheight = imagesy($bg);

$scale = .6;
$logowidth = imagesx($logo) * $scale;
$logoheight = imagesy($logo) * $scale;
$logo = imagescale($logo, $logowidth, $logoheight);

$result = imagecreatetruecolor($bgwidth, $bgheight);
imagecopyresampled($result, $bg, 0, 0, 0, 0, $bgwidth, $bgheight, $bgwidth, $bgheight);
imagecopyresampled($result, $logo, $bgwidth - $logowidth - 10, 10, 0, 0, $logowidth, $logoheight, $logowidth, $logoheight);
imagepng($result, 'result.png');
header(
    "Content-type: image/png"
);
imagepng($result);
imagedestroy($result);