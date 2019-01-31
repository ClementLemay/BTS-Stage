<?php
function callScript($device,$room,$state){

  switch ($room){
    case "Office":
      switch ($device) {
        case "Relais":
        if ($state == "true") {
          $log = shell_exec('python /var/www/html/src/main/python/toggle.py on 2>&1');
          $whoami = shell_exec('whoami');
          }
        if($state == "false") {
          $log = shell_exec('python /var/www/html/src/main/python/toggle.py off 2>&1');
          $whoami = shell_exec('whoami');
          }
          echo ($log);
          echo ($whoami);
          break;
        }
      break;
    }
  }
 ?>
