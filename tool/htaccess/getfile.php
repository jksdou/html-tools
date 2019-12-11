<?php

$file = fopen("htaccess", "wb");
fwrite($file, stripslashes($_POST["htaccess"]));
$filename = ".htaccess";
$encoded_filename = urlencode($filename);
$encoded_filename = str_replace("+", "%20", $encoded_filename);
$ua = $_SERVER["HTTP_USER_AGENT"];
header('Content-Type: application/octet-stream');
if (preg_match("/MSIE/", $ua)) {
    header('Content-Disposition: attachment; filename="' . $encoded_filename . '"');
} else if (preg_match("/Firefox/", $ua)) {
    header('Content-Disposition: attachment; filename*="utf8/' / '' . $filename . '"');
} else {
    header('Content-Disposition: attachment; filename="' . $filename . '"');
}
readfile("htaccess");
