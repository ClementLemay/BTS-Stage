<?php
function callScript($device,$room,$state){
  $urlPython = "/var/www/html/src/main/python/";

  switch ($room){
    case "Office":
      switch ($device) {
        case "Relais":
        if ($state == "true") {
          $log = shell_exec('python '+ $url +'toggle.py on 2>&1');
          echo ("on");
        }
        if($state == "false") {
          $log = shell_exec('python '+ $url +'toggle.py off 2>&1');
          echo ("off");
          }
          echo ($log);
          break;
        }
      break;
    }
  }
 ?>
