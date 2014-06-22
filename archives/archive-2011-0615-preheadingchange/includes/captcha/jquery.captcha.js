// JavaScript Document<script language="JavaScript">
var url = '../includes/captcha/captcha.php';
var captchaOK = 2; // 2 - not yet checked, 1 - correct, 0 - failed
var required;
var fielderror;
var captcha_value;


;(function( $ ){
	$.fn.captcha = function(options){


	var defaults = {
	   borderColor: "",
	   captchaDir: "includes/captcha",
	   url: "includes/captcha/captcha.php",
	   formId: "contactForm",
	   text: "Verify that you are a human,<br />drag <span>scissors</span> into the circle.",
	   items: Array("pencil", "scissors", "clock", "heart", "note")
	  };

	var options = $.extend(defaults, options);


	$(this).html("<b class='ajax-fc-rtop'><b class='ajax-fc-r1'></b> <b class='ajax-fc-r2'></b> <b class='ajax-fc-r3'></b> <b class='ajax-fc-r4'></b></b><img class='ajax-fc-border' id='ajax-fc-left' src='" + options.captchaDir + "/imgs/border-left.png' /><img class='ajax-fc-border' id='ajax-fc-right' src='" + options.captchaDir + "/imgs/border-right.png' /><div id='ajax-fc-content'><div id='ajax-fc-left'><p id='ajax-fc-task'>" + options.text + "</p><ul id='ajax-fc-task'><li class='ajax-fc-0'><img src='" + options.captchaDir + "/imgs/item-none.png' alt='' /></li><li class='ajax-fc-1'><img src='" + options.captchaDir + "/imgs/item-none.png' alt='' /></li><li class='ajax-fc-2'><img src='" + options.captchaDir + "/imgs/item-none.png' alt='' /></li><li class='ajax-fc-3'><img src='" + options.captchaDir + "/imgs/item-none.png' alt='' /></li><li class='ajax-fc-4'><img src='" + options.captchaDir + "/imgs/item-none.png' alt='' /></li></ul></div><div id='ajax-fc-right'><p id='ajax-fc-circle'></p></div></div><div id='ajax-fc-corner-spacer'></div><b class='ajax-fc-rbottom'><b class='ajax-fc-r4'></b> <b class='ajax-fc-r3'></b> <b class='ajax-fc-r2'></b> <b class='ajax-fc-r1'></b></b>");
	var rand = $.ajax({ url: options.url,async: false }).responseText;
//      alert("options.url is " + options.url + ", rand value initialized as " + rand);

//  captcha_value = 10;

	var pic = randomNumber();
	$(".ajax-fc-" + rand).html( "<img src=\"" + options.captchaDir +"/imgs/item-" + options.items[pic] + ".png\" alt=\"\" />");
	$("p#ajax-fc-task span").html(options.items[pic]);
	$(".ajax-fc-" + rand).addClass('ajax-fc-highlighted');
	$(".ajax-fc-" + rand).draggable({ containment: '#ajax-fc-content' });
	var used = Array();
	for(var i=0;i<5;i++){
		if(i != rand && i != pic)
		{
			$(".ajax-fc-" +i).html( "<img src=\"" + options.captchaDir +"/imgs/item-" + options.items[i] + ".png\" alt=\"\" />");
			used[i] = options.items[i];
		}
	}
	$(".ajax-fc-container, .ajax-fc-rtop *, .ajax-fc-rbottom *").css("background-color", options.borderColor);
	$("#ajax-fc-circle").droppable({
		drop: function(event, ui) {
			$(".ajax-fc-" + rand).draggable("disable");
			$("#" + options.formId).append("<input type=\"hidden\" style=\"display: none;\" id=\"captchahidden\" name=\"captcha\" value=\"" + rand + "\">");
//      alert("captcha value previously was " + captcha_value);
			captcha_value = rand;
//      alert("rand value is " + rand);
//      alert("captcha value is now " + captcha_value);
			},
		tolerance: 'touch'
	});
	};

})( jQuery );

function randomNumber() {
	var chars = "01234";
	chars += ".";
	var size = 1;
	var i = 1;
	var ret = "";
		while ( i <= size ) {
			$max = chars.length-1;
			$num = Math.floor(Math.random()*$max);
			$temp = chars.substr($num, 1);
			ret += $temp;
			i++;
		}
	return ret;
}




function getHTTPObject()
{
	try {
	req = new XMLHttpRequest();
		} catch (err1) {
		try {
			req = new ActiveXObject("Msxml12.XMLHTTP");
			} catch (err2) {
			try {
				req = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (err3) { req = false; }
			}
		}
	return req;
}

var http = getHTTPObject(); // We create the HTTP Object

function handleHttpResponse() {
if (http.readyState == 4) {
	captchaOK = http.responseText;
//	alert('The response text from server was: ' + captchaOK);
	if(captchaOK != 8) {
		alert('Please authenticate by completing the requested action before clicking submit.');
    $(function() {
      $(".ajax-fc-container").captcha({
        borderColor: "silver",
        text: "Verify that you are a human,<br />drag <span>scissors</span> into the circle."
      });
    });
		$('#alt_captcha_div').focus();
		return false;
		}
//	alert('The authentication code was a match.  Click ok to submit form.');
	document.InquiryForm.submit();
	}
}

function checkcode(captcha_value) {

	var params = "captcha=" + captcha_value;

//  alert("Captcha value being passed for validation is: " + captcha_value);
	http.open("POST",url,true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = handleHttpResponse;

	http.send(params);
}

function checkinquiryform() {
// First the normal form validation
//	alert('checkform function instantiated');
	fielderror = document.getElementById('fieldmissing');

	required = document.getElementById('inquiryfield');
	if(document.InquiryForm.inquiry.value=='') {
		alert('The "Inquiry" field is blank, please provide a brief description of the types of services / consultation you seek. Be sure to include the best method and time to contact you to discuss your needs.');
		required.style.cssText = 'color:#990000;background:#ffccff;font-weight:bold;';
		fielderror.style.display= 'block';
		document.InquiryForm.inquiry.focus();
		return false;
	}
	else {
		required.style.cssText = 'color:#000000;font-weight:normal;';
		fielderror.style.display = 'none';
	}

	required = document.getElementById('first');
	if(document.InquiryForm.first_name.value=='') {
		alert('The "name" field is required, please input your name and resubmit.');
		required.style.cssText = 'color:#990000;background:#ffccff;font-weight:bold;';
		fielderror.style.display= 'block';
		document.InquiryForm.first_name.focus();
		return false;
	}
	else {
		required.style.cssText = 'color:#000000;font-weight:normal;';
		fielderror.style.display = 'none';
	}

	required = document.getElementById('mail');
	if(document.InquiryForm.email.value=='') {
		alert('The "email" field is required, please input your email and resubmit.');
		required.style.cssText = 'color:#990000;background:#ffccff;font-weight:bold;';
		fielderror.style.display= 'block';
		document.InquiryForm.email.focus();
		return false;
	}
	else {
		required.style.cssText = 'color:#000000;font-weight:normal;';
		fielderror.style.display = 'none';
	}

	if(captcha_value=='10') {
		alert('Please authenticate by completing the requested action before clicking submit.');

    $(function() {
      $(".ajax-fc-container").captcha({
        borderColor: "silver",
        text: "Verify that you are a human,<br />drag <span>scissors</span> into the circle."
      });
    });
		return false;
	}
	else {
		checkcode(captcha_value);
	}
	return false;
}


function resetinquiryform() {
//	alert('resetform function instantiated');
	fielderror = document.getElementById('fieldmissing');

	required = document.getElementById('inquiryfield');
	document.InquiryForm.inquiry.value='';
	required.style.cssText = 'color:#000000;font-weight:normal;';

	required = document.getElementById('first');
	document.InquiryForm.first_name.value='';
	required.style.cssText = 'color:#000000;font-weight:normal;';

	required = document.getElementById('mail');
     document.InquiryForm.email.value=='';
	required.style.cssText = 'color:#000000;font-weight:normal;';

  $(function() {
    $(".ajax-fc-container").captcha({
      borderColor: "silver",
      text: "Verify that you are a human,<br />drag <span>scissors</span> into the circle."
    });
  });

	document.InquiryForm.inquiry.focus();
	fielderror.style.display = 'none';

}