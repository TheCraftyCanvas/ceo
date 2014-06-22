<?php
function ReturnDeepNav() {
	 $pageURL = 'http';
	 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
	 $pageURL .= "://";
	 if ($_SERVER["SERVER_PORT"] != "80") {
	  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	 } else {
	  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	 }
	 
	 $i = strpos($pageURL,".com/");
	 $pageURL = substr($pageURL, $i+5);
	 
	 if(strpos($pageURL,"test/")===false) {
	 }
	 else {
	 $j = strpos($pageURL,"test/");
	 $pageURL = substr($pageURL, $j+5);
	 }
	 
	 $j = strpos($pageURL,"/");
	 
	 if($j===false) {
	 }
	 else {
	   echo "../" ; 
	 }
 }
?>  