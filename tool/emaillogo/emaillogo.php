<?php

$dirurl = "/"; // 程序所在目录加上"/"
$picdir = "data"; // 图片存储目录

function read_from_file($file)
{
    $fp = fopen($file, "r");
    if (!$fp) {
        return (false);
    }
    flock($fp, LOCK_SH);
    $data = fread($fp, filesize($file));
    fclose($fp);
    return ($data);
}

// 16进制颜色转RGB颜色
function hexrgb($hexstr, $rgb)
{
    $int = hexdec(str_replace("#", '', $hexstr));
    switch ($rgb) {
        case "r":
            return 0xFF & $int >> 0x10;
            break;
        case "g":
            return 0xFF & ($int >> 0x8);
            break;
        case "b":
            return 0xFF & $int;
            break;
        default:
            return array(
                "r" => 0xFF & $int >> 0x10,
                "g" => 0xFF & ($int >> 0x8),
                "b" => 0xFF & $int,
            );
            break;
    }
}
$res = array();

if ($_GET["action"] == "show" && isset($_GET['file'])) {
    $picname = $_GET['file'];
    $res['filename'] = $picdir . "/" . date("ymd", $picname) . "/" . $picname . ".png";
    $res['type'] = 2;
} elseif ($_GET["action"] == "download" && isset($_GET["file"])) {
    $filename = $_GET["file"];
    header("Content-type: command");
    header("Content-Disposition: attachment; filename=emaillogo.png");
    readfile($picdir . "/" . date("ymd", $filename) . "/" . $filename . ".png");
    exit;
} elseif ($_GET["action"] == "mkpic") {
    $username = trim($_GET['name']); // 邮件地址
    if (ereg("^[0-9a-zA-Z\_@.]*$", $username) && $username) {
        $host = $_GET['maillogo']; // 邮件HOST
        $srcUrl = "assets/logo/" . $host . ".gif"; //Email图片URL
        $back_c = "#ffffff"; // 背景颜色
        $border_c = $_GET['bordercolor']; // 边框颜色
        $font_c = $_GET['color']; //文字颜色
        $font_size = $_GET['size']; //字体大小
        $font_url = "assets/fonts/" . $_GET['mailfont'] . ".ttf"; // 字体URL
        if ($_GET['border'] == "true") {
            $is_border = 1;
        } else {
            $is_border = 0;
        }
        //是否有边框 0没有 非0有
        if ($host) {
            $is_logo = 1;
        } else {
            $is_logo = 0;
        }
        //是否有邮箱图标 0没有 非0有
        $srcWidth = 0;
        $srcHeight = 0;
        $str_pos = imagettfbbox($font_size, 0, $font_url, $username);
        $str_width = intval($str_pos[2]); //文字字符宽度
        $str_height = intval(str_replace("-", "", $str_pos[5])); //文字字符高度
        if ($is_logo) {
            $origImg = ImageCreateFromGIF($srcUrl);
            $srcWidth = intval(imagesx($origImg)); //Email图像宽度
            $srcHeight = intval(imagesy($origImg)); //Email图像高度
        }
        $newWidth = $str_width + 15 + $srcWidth; //LOGO总宽度
        $newHeight = ($srcHeight > $str_height) ? $srcHeight + 2 : $str_height + 8;
        $image = imagecreatetruecolor($newWidth, $newHeight); //创建图片
        $back_color = hexrgb($back_c, "rgb"); //取背景颜色
        $back = imagecolorallocate($image, $back_color['r'], $back_color['g'], $back_color['b']); //背景颜色 白色
        imagefilledrectangle($image, 0, 0, $newWidth - 1, $newHeight - 1, $back); //背景填充
        if ($is_border) {
            $border_color = hexrgb($border_c, "rgb"); //取边框颜色
            $border = imagecolorallocate($image, $border_color['r'], $border_color['g'], $border_color['b']); //边框颜色
            imagerectangle($image, 0, 0, $newWidth - 1, $newHeight - 1, $border); //画边框
        }
        if ($is_logo) {
            $srcX = $str_width + 10; //Email图片X轴位置
            $srcY = ($newHeight - $srcHeight) / 2; //Email图片Y轴位置
            ImageCopy($image, $origImg, $srcX, $srcY, 0, 0, $srcWidth, $srcHeight); //将Email图片复制到LOGO上
        }
        $font_color = hexrgb($font_c, "rgb"); //取字体颜色
        $color = imagecolorallocate($image, $font_color['r'], $font_color['g'], $font_color['b']); //字体颜色
        $str_x = $str_height + ($newHeight - $str_height) / 2;
        if (!$is_logo) {
            $str_x -= 2;
        }
        //字体高度修正
        imagettftext($image, $font_size, 0, 6, $str_x, $color, $font_url, $username); //将文字写到图片上
        //输出图片
        $time = time();
        $filedir = date("ymd", $time);
        if (!file_exists($picdir . "/" . $filedir)) { //生成图片存储目录，按月份分开存储
            mkdir($picdir . "/" . $filedir);
        }
        header("Content-type: image/png");
        imagepng($image, $picdir . "/" . $filedir . "/" . $time . ".png"); //如果要将图片存在本地，打开此选项
        imagedestroy($image);
        // header("location: ?show=" . $time);
        $res['type'] = 2;
        $res['time'] = $time;
        $res['filename'] = $picdir . "/" . $filedir . "/" . $time . ".png";
        $res['picurl'] = "//" . $_SERVER['SERVER_NAME'] . dirname($_SERVER["REQUEST_URI"]) . "/" . $res["filename"];
    } elseif ($username == "") {
        $res['filename'] = "./assets/images/error.png";
        $res['type'] = 4;
    } else {
        $res['filename'] = "./assets/images/error.png";
        $res['type'] = 4;
    }
} else {
    $res['filename'] = "./assets/images/sample.png";
    $res['type'] = 4;
}
header("Content-type: application/json");

echo json_encode($res);
