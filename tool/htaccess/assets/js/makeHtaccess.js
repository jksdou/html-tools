var writetext = "";

function doAll() {
    writetext = "<Files ~ \"^.(htaccess|htpasswd)$\">\n" + "deny from all\n" + "</Files>\n";
    denyFileList();
    basic();
    errorPage();
    unifyURL();
    defaultFile();
    redirect();
    blocking();
    MIME();
    Pic();
    window.document.htaccessform.htaccess.value = writetext;
    return false;
}

function denyFileList() {
    if (window.document.htaccessform.file_list.options[window.document.htaccessform.file_list.options.selectedIndex].value == "true") {
        writetext += "Options +Indexes\n"
    } else {
        if (window.document.htaccessform.file_list.options[window.document.htaccessform.file_list.options.selectedIndex].value == "false") {
            writetext += "Options -Indexes\n"
        }
    }
    if (window.document.htaccessform.Pic_cache.options[window.document.htaccessform.Pic_cache.options.selectedIndex].value == "t600") {
        writetext += "<FilesMatch \".(gif|jpg|jpeg|png|ico)$\">\n" + "Header set Cache-Control \"max-age=600\"\n" + "</FilesMatch>\n"
    }
    if (window.document.htaccessform.Pic_cache.options[window.document.htaccessform.Pic_cache.options.selectedIndex].value == "t3600") {
        writetext += "<FilesMatch \".(gif|jpg|jpeg|png|ico)$\">\n" + "Header set Cache-Control \"max-age=3600\"\n" + "</FilesMatch>\n"
    }
    if (window.document.htaccessform.Pic_cache.options[window.document.htaccessform.Pic_cache.options.selectedIndex].value == "t18000") {
        writetext += "<FilesMatch \".(gif|jpg|jpeg|png|ico)$\">\n" + "Header set Cache-Control \"max-age=18000\"\n" + "</FilesMatch>\n"
    }
    if (window.document.htaccessform.Pic_cache.options[window.document.htaccessform.Pic_cache.options.selectedIndex].value == "t86400") {
        writetext += "<FilesMatch \".(gif|jpg|jpeg|png|ico)$\">\n" + "Header set Cache-Control \"max-age=86400\"\n" + "</FilesMatch>\n"
    }
    if (window.document.htaccessform.Pic_cache.options[window.document.htaccessform.Pic_cache.options.selectedIndex].value == "t604800") {
        writetext += "<FilesMatch \".(gif|jpg|jpeg|png|ico)$\">\n" + "Header set Cache-Control \"max-age=604800\"\n" + "</FilesMatch>\n"
    }
    if (window.document.htaccessform.Pic_cache.options[window.document.htaccessform.Pic_cache.options.selectedIndex].value == "t2592000") {
        writetext += "<FilesMatch \".(gif|jpg|jpeg|png|ico)$\">\n" + "Header set Cache-Control \"max-age=2592000\"\n" + "</FilesMatch>\n"
    }
}

function basic() {
    if (window.document.htaccessform.sitePathPwd.value != "") {
        writetext += "AuthUserFile " + window.document.htaccessform.sitePathPwd.value + "\n" + "AuthGroupFile /dev/null\n" + "AuthName \"Please enter your ID and password\"\n" + "AuthType Basic\n" + "require valid-user \n";
    }
}

function errorPage() {
    if (window.document.htaccessform.error400.value != "") {
        writetext += "ErrorDocument 400 " + window.document.htaccessform.error400.value + "\n";
    }
    if (window.document.htaccessform.error401.value != "") {
        writetext += "ErrorDocument 401 " + window.document.htaccessform.error401.value + "\n";
    }
    if (window.document.htaccessform.error402.value != "") {
        writetext += "ErrorDocument 402 " + window.document.htaccessform.error402.value + "\n";
    }
    if (window.document.htaccessform.error403.value != "") {
        writetext += "ErrorDocument 403 " + window.document.htaccessform.error403.value + "\n";
    }
    if (window.document.htaccessform.error404.value != "") {
        writetext += "ErrorDocument 404 " + window.document.htaccessform.error404.value + "\n";
    }
    if (window.document.htaccessform.error405.value != "") {
        writetext += "ErrorDocument 405 " + window.document.htaccessform.error405.value + "\n";
    }
    if (window.document.htaccessform.error406.value != "") {
        writetext += "ErrorDocument 406 " + window.document.htaccessform.error406.value + "\n";
    }
    if (window.document.htaccessform.error407.value != "") {
        writetext += "ErrorDocument 407 " + window.document.htaccessform.error407.value + "\n";
    }
    if (window.document.htaccessform.error408.value != "") {
        writetext += "ErrorDocument 408 " + window.document.htaccessform.error408.value + "\n";
    }
    if (window.document.htaccessform.error409.value != "") {
        writetext += "ErrorDocument 409 " + window.document.htaccessform.error409.value + "\n";
    }
    if (window.document.htaccessform.error410.value != "") {
        writetext += "ErrorDocument 410 " + window.document.htaccessform.error410.value + "\n";
    }
    if (window.document.htaccessform.error411.value != "") {
        writetext += "ErrorDocument 411 " + window.document.htaccessform.error411.value + "\n";
    }
    if (window.document.htaccessform.error412.value != "") {
        writetext += "ErrorDocument 412 " + window.document.htaccessform.error412.value + "\n";
    }
    if (window.document.htaccessform.error413.value != "") {
        writetext += "ErrorDocument 413 " + window.document.htaccessform.error413.value + "\n";
    }
    if (window.document.htaccessform.error414.value != "") {
        writetext += "ErrorDocument 414 " + window.document.htaccessform.error414.value + "\n";
    }
    if (window.document.htaccessform.error500.value != "") {
        writetext += "ErrorDocument 500 " + window.document.htaccessform.error500.value + "\n";
    }
    if (window.document.htaccessform.error501.value != "") {
        writetext += "ErrorDocument 501 " + window.document.htaccessform.error501.value + "\n";
    }
    if (window.document.htaccessform.error502.value != "") {
        writetext += "ErrorDocument 502 " + window.document.htaccessform.error502.value + "\n";
    }
    if (window.document.htaccessform.error503.value != "") {
        writetext += "ErrorDocument 503 " + window.document.htaccessform.error503.value + "\n";
    }
    if (window.document.htaccessform.error504.value != "") {
        writetext += "ErrorDocument 504 " + window.document.htaccessform.error504.value + "\n";
    }
    if (window.document.htaccessform.error505.value != "") {
        writetext += "ErrorDocument 505 " + window.document.htaccessform.error505.value + "\n";
    }
}

function defaultFile() {
    if (window.document.htaccessform.extension1.value != "") {
        writetext += "DirectoryIndex " +
            window.document.htaccessform.extension1.value + " " +
            window.document.htaccessform.extension2.value + " " +
            window.document.htaccessform.extension3.value + " " +
            window.document.htaccessform.extension4.value + " " +
            window.document.htaccessform.extension5.value + " " +
            window.document.htaccessform.extension6.value + " " +
            window.document.htaccessform.extension7.value + " " +
            window.document.htaccessform.extension8.value + "\n";
    }
}

function unifyURL() {
    if (!window.document.htaccessform.unifiedURL.value.match(/^http\:\/\/$/)) {
        if (window.document.htaccessform.unifiedURL.value != "") {
            var unifiedURLEndWithSlash;
            var unifiedURL;
            var domain;
            if (window.document.htaccessform.unifiedURL.value.match(/^h.+\/$/)) {
                unifiedURLEndWithSlash = window.document.htaccessform.unifiedURL.value;
                unifiedURL = unifiedURLEndWithSlash.substring(0, unifiedURLEndWithSlash.length - 1);
            } else {
                unifiedURL = window.document.htaccessform.unifiedURL.value;
                unifiedURLEndWithSlash = unifiedURL + "/";
            }
            domain = unifiedURL.substring(unifiedURL.indexOf("//") + 2, unifiedURL.length);
            if (window.document.htaccessform.unifiedURL.value.match(/^http\:\/\/www|^https\:\/\/www/)) {
                domain = domain.substring(4, domain.length);
                domain = domain.split("\.");
                domain = domain.join("\\\.");
                writetext += "RewriteEngine on\n" + "RewriteCond %{HTTP_HOST} ^(" + domain + ")(:80)? [NC]\n" + "RewriteRule ^(.*) " + unifiedURLEndWithSlash + "$1 [R=301,L]\n";
            } else {
                domain = "www." + domain;
                domain = domain.split("\.");
                domain = domain.join("\\\.");
                writetext += "RewriteEngine on\n" + "RewriteCond %{HTTP_HOST} ^(" + domain + ")(:80)? [NC]\n" + "RewriteRule ^(.*) " + unifiedURLEndWithSlash + "$1 [R=301,L]\n";
            }
        }
    }
}

function redirect() {
    if (window.document.htaccessform.redirectFrom1.value != "" && window.document.htaccessform.redirectTo1.value != "") {
        writetext += "Redirect permanent " + window.document.htaccessform.redirectFrom1.value + " " + window.document.htaccessform.redirectTo1.value + "\n";
    }
    if (window.document.htaccessform.redirectFrom2.value != "" && window.document.htaccessform.redirectTo2.value != "") {
        writetext += "Redirect permanent " + window.document.htaccessform.redirectFrom2.value + " " + window.document.htaccessform.redirectTo2.value + "\n";
    }
    if (window.document.htaccessform.redirectFrom3.value != "" && window.document.htaccessform.redirectTo3.value != "") {
        writetext += "Redirect permanent " + window.document.htaccessform.redirectFrom3.value + " " + window.document.htaccessform.redirectTo3.value + "\n";
    }
    if (window.document.htaccessform.redirectFrom4.value != "" && window.document.htaccessform.redirectTo4.value != "") {
        writetext += "Redirect permanent " + window.document.htaccessform.redirectFrom4.value + " " + window.document.htaccessform.redirectTo4.value + "\n";
    }
    if (window.document.htaccessform.redirectFrom5.value != "" && window.document.htaccessform.redirectTo5.value != "") {
        writetext += "Redirect permanent " + window.document.htaccessform.redirectFrom5.value + " " + window.document.htaccessform.redirectTo5.value + "\n";
    }
    if (window.document.htaccessform.redirectFrom6.value != "" && window.document.htaccessform.redirectTo6.value != "") {
        writetext += "Redirect permanent " + window.document.htaccessform.redirectFrom6.value + " " + window.document.htaccessform.redirectTo6.value + "\n";
    }
    if (window.document.htaccessform.redirectFrom7.value != "" && window.document.htaccessform.redirectTo7.value != "") {
        writetext += "Redirect permanent " + window.document.htaccessform.redirectFrom7.value + " " + window.document.htaccessform.redirectTo7.value + "\n";
    }
    if (window.document.htaccessform.redirectFrom8.value != "" && window.document.htaccessform.redirectTo8.value != "") {
        writetext += "Redirect permanent " + window.document.htaccessform.redirectFrom8.value + " " + window.document.htaccessform.redirectTo8.value + "\n";
    }

    if (window.document.htaccessform.redirect302From1.value != "" && window.document.htaccessform.redirect302To1.value != "") {
        writetext += "Redirect temp " + window.document.htaccessform.redirect302From1.value + " " + window.document.htaccessform.redirect302To1.value + "\n";
    }
    if (window.document.htaccessform.redirect302From2.value != "" && window.document.htaccessform.redirect302To2.value != "") {
        writetext += "Redirect temp " + window.document.htaccessform.redirect302From2.value + " " + window.document.htaccessform.redirect302To2.value + "\n";
    }
    if (window.document.htaccessform.redirect302From3.value != "" && window.document.htaccessform.redirect302To3.value != "") {
        writetext += "Redirect temp " + window.document.htaccessform.redirect302From3.value + " " + window.document.htaccessform.redirect302To3.value + "\n";
    }
    if (window.document.htaccessform.redirect302From4.value != "" && window.document.htaccessform.redirect302To4.value != "") {
        writetext += "Redirect temp " + window.document.htaccessform.redirect302From4.value + " " + window.document.htaccessform.redirect302To4.value + "\n";
    }
    if (window.document.htaccessform.redirect302From5.value != "" && window.document.htaccessform.redirect302To5.value != "") {
        writetext += "Redirect temp " + window.document.htaccessform.redirect302From5.value + " " + window.document.htaccessform.redirect302To5.value + "\n";
    }
    if (window.document.htaccessform.redirect302From6.value != "" && window.document.htaccessform.redirect302To6.value != "") {
        writetext += "Redirect temp " + window.document.htaccessform.redirect302From6.value + " " + window.document.htaccessform.redirect302To6.value + "\n";
    }
    if (window.document.htaccessform.redirect302From7.value != "" && window.document.htaccessform.redirect302To7.value != "") {
        writetext += "Redirect temp " + window.document.htaccessform.redirect302From7.value + " " + window.document.htaccessform.redirect302To7.value + "\n";
    }
    if (window.document.htaccessform.redirect302From8.value != "" && window.document.htaccessform.redirect302To8.value != "") {
        writetext += "Redirect temp " + window.document.htaccessform.redirect302From8.value + " " + window.document.htaccessform.redirect302To8.value + "\n";
    }
}

function blocking() {
    var isBlockNull;
    isBlockNull = false;
    writetext += "order deny,allow" + "\n";
    if (window.document.htaccessform.blockOK1.value != "") {
        writetext += "allow from " + window.document.htaccessform.blockOK1.value + "\n";
        if (window.document.htaccessform.blockNG1.value == "") {
            isBlockNull = true;
        }
    }
    if (window.document.htaccessform.blockOK2.value != "") {
        writetext += "allow from " + window.document.htaccessform.blockOK2.value + "\n";
        if (window.document.htaccessform.blockNG2.value == "") {
            isBlockNull = true;
        }
    }
    if (window.document.htaccessform.blockOK3.value != "") {
        writetext += "allow from " + window.document.htaccessform.blockOK3.value + "\n";
        if (window.document.htaccessform.blockNG3.value == "") {
            isBlockNull = true;
        }
    }
    if (window.document.htaccessform.blockOK4.value != "") {
        writetext += "allow from " + window.document.htaccessform.blockOK4.value + "\n";
        if (window.document.htaccessform.blockNG4.value == "") {
            isBlockNull = true;
        }
    }
    if (window.document.htaccessform.blockOK5.value != "") {
        writetext += "allow from " + window.document.htaccessform.blockOK5.value + "\n";
        if (window.document.htaccessform.blockNG5.value == "") {
            isBlockNull = true;
        }
    }
    if (window.document.htaccessform.blockOK6.value != "") {
        writetext += "allow from " + window.document.htaccessform.blockOK6.value + "\n";
        if (window.document.htaccessform.blockNG6.value == "") {
            isBlockNull = true;
        }
    }
    if (window.document.htaccessform.blockOK7.value != "") {
        writetext += "allow from " + window.document.htaccessform.blockOK7.value + "\n";
        if (window.document.htaccessform.blockNG7.value == "") {
            isBlockNull = true;
        }
    }
    if (window.document.htaccessform.blockOK8.value != "") {
        writetext += "allow from " + window.document.htaccessform.blockOK8.value + "\n";
        if (window.document.htaccessform.blockNG8.value == "") {
            isBlockNull = true;
        }
    }
    if (isBlockNull != false) {
        writetext += "deny from all \n";
    }
    if (window.document.htaccessform.blockNG1.value != "") {
        writetext += "deny from " + window.document.htaccessform.blockNG1.value + "\n";
    }
    if (window.document.htaccessform.blockNG2.value != "") {
        writetext += "deny from " + window.document.htaccessform.blockNG2.value + "\n";
    }
    if (window.document.htaccessform.blockNG3.value != "") {
        writetext += "deny from " + window.document.htaccessform.blockNG3.value + "\n";
    }
    if (window.document.htaccessform.blockNG4.value != "") {
        writetext += "deny from " + window.document.htaccessform.blockNG4.value + "\n";
    }
    if (window.document.htaccessform.blockNG5.value != "") {
        writetext += "deny from " + window.document.htaccessform.blockNG5.value + "\n";
    }
    if (window.document.htaccessform.blockNG6.value != "") {
        writetext += "deny from " + window.document.htaccessform.blockNG6.value + "\n";
    }
    if (window.document.htaccessform.blockNG7.value != "") {
        writetext += "deny from " + window.document.htaccessform.blockNG7.value + "\n";
    }
    if (window.document.htaccessform.blockNG8.value != "") {
        writetext += "deny from " + window.document.htaccessform.blockNG8.value + "\n";
    }
}

function MIME() {
    if (window.document.htaccessform.MIMEForm1.value != "" && window.document.htaccessform.MIME1.value != "") {
        writetext += "AddType " + window.document.htaccessform.MIME1.value + " " + window.document.htaccessform.MIMEForm1.value + "\n";
    }
    if (window.document.htaccessform.MIMEForm2.value != "" && window.document.htaccessform.MIME2.value != "") {
        writetext += "AddType " + window.document.htaccessform.MIME2.value + " " + window.document.htaccessform.MIMEForm2.value + "\n";
    }
    if (window.document.htaccessform.MIMEForm3.value != "" && window.document.htaccessform.MIME3.value != "") {
        writetext += "AddType " + window.document.htaccessform.MIME3.value + " " + window.document.htaccessform.MIMEForm3.value + "\n";
    }
    if (window.document.htaccessform.MIMEForm4.value != "" && window.document.htaccessform.MIME4.value != "") {
        writetext += "AddType " + window.document.htaccessform.MIME4.value + " " + window.document.htaccessform.MIMEForm4.value + "\n";
    }
    if (window.document.htaccessform.MIMEForm5.value != "" && window.document.htaccessform.MIME5.value != "") {
        writetext += "AddType " + window.document.htaccessform.MIME5.value + " " + window.document.htaccessform.MIMEForm5.value + "\n";
    }
    if (window.document.htaccessform.MIMEForm6.value != "" && window.document.htaccessform.MIME6.value != "") {
        writetext += "AddType " + window.document.htaccessform.MIME6.value + " " + window.document.htaccessform.MIMEForm6.value + "\n";
    }
}

function Pic() {
    if (window.document.htaccessform.Pic1.value != "") {
        writetext += "RewriteEngine on" + "\n" + "RewriteCond %{HTTP_REFERER} !^$" + "\n";
    }
    if (window.document.htaccessform.PicForm1.value != "" && window.document.htaccessform.Pic1.value != "") {
        writetext += "RewriteCond %{HTTP_REFERER} !^http://(www\\.)?" + window.document.htaccessform.PicForm1.value + "(/)?.*$     [NC]\n";
    }
    if (window.document.htaccessform.PicForm2.value != "" && window.document.htaccessform.Pic1.value != "") {
        writetext += "RewriteCond %{HTTP_REFERER} !^http://(www\\.)?" + window.document.htaccessform.PicForm2.value + "(/)?.*$     [NC]\n";
    }
    if (window.document.htaccessform.PicForm3.value != "" && window.document.htaccessform.Pic1.value != "") {
        writetext += "RewriteCond %{HTTP_REFERER} !^http://(www\\.)?" + window.document.htaccessform.PicForm3.value + "(/)?.*$     [NC]\n";
    }
    if (window.document.htaccessform.PicForm4.value != "" && window.document.htaccessform.Pic1.value != "") {
        writetext += "RewriteCond %{HTTP_REFERER} !^http://(www\\.)?" + window.document.htaccessform.PicForm4.value + "(/)?.*$     [NC]\n";
    }
    if (window.document.htaccessform.Pic1.value != "") {
        writetext += "RewriteRule .*\\.(gif|jpg|jpeg|bmp|png)$ " + window.document.htaccessform.Pic1.value + " [R,NC,L]\n";
    }
}