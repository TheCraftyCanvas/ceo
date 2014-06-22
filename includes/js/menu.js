/* 
   Simple JQuery Accordion menu.
   HTML structure to use:

   <ul id="menu">
     <li><a href="#">Sub menu heading</a>
     <ul>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       ...
       ...
     </ul>
     <li><a href="#">Sub menu heading</a>
     <ul>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       <li><a href="http://site.com/">Link</a></li>
       ...
       ...
     </ul>
     ...
     ...
   </ul>

Copyright 2007 by Marco van Hylckama Vlieg

web: http://www.i-marco.nl/weblog/
email: marco@i-marco.nl

Free for non-commercial use
*/

function initMenu() {

  $('#menu ul').hide();
 
//  $('#menu ul:first').show();
  $('#menu li a').click(
    function() {
      var checkElement = $(this).next();
      if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
        return false;
        }
      if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
        $('#menu ul:visible').slideUp('normal');
        checkElement.slideDown('normal');
        return false;
        } // end if
      } //end function
    ); //end click handler

  var pathname = window.location.pathname;
  if(pathname.indexOf("services/") != -1)
	{ 
		//alert("service subpage detected"); 
		$('#services').show();
	}
  else if (pathname.indexOf("benefits/") != -1)
  	{ 
		//alert("benefit subpage detected"); 
		$('#benefits').show();
	}
  else if (pathname.indexOf("about/") != -1) 
    {
		//alert("about subpage detected"); 
		$('#about').show();
	}

  }
$(document).ready(function() {initMenu();});