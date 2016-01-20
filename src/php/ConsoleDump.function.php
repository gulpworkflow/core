<?php
// Dump PHP objects/variables/results to the Javascript console
// so you don't have to mess with stupid var_dump shyt in the browser
function console_dump($data) {
  //if($debug) {
     //echo "yes";
    echo "<script>";
    echo "console.log(" . json_encode($data) .");";
    echo "</script>";
 // }
}
