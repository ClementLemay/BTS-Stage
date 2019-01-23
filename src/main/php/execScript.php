<?php
function callScript($device,$room,$state){
  switch ($room){
    case "Office":
      switch ($device) {
        case "Relais":
        if ($state == "true") {
          $log = shell_exec('python /var/www/html/src/main/python/toggle.py on 2>&1');
          echo ("on");
        }
        if($state == "false") {
          $log = shell_exec('python /var/www/html/src/main/python/toggle.py off 2>&1');
          echo ("off");
          }
          echo ($log);
          break;
        }
      break;
    }
  }
 ?>
