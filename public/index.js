$(document).ready(function () {
	$("#popular-slider").owlCarousel({
		loop: true,
		margin: 0,
		autoplay: true,
		autoplayTimeout: 2500,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	});
	
	$("#image-slider").owlCarousel({
		loop: true,
		margin: 0,
		autoplay: true,
		autoplayTimeout: 2500,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 2
			}
		}
	});
	
	$('.owl-nav').remove();
	
	$('.next-btn').click(function () {
		$('.owl-carousel').trigger('next.owl.carousel');
	});
	
	$('.prev-btn').click(function () {
		$('.owl-carousel').trigger('prev.owl.carousel', [300]);
	});
	
	$('.box, .box-v2').focusin(function(){
		$(this).css("border","2px solid #7868E6");
	})
	
	$('.box, .box-v2').focusout(function(){
		if(($(this).val())){
			$(this).css("border","2px solid #7868E6");
		}
		else{
			$(this).css("border","1px solid black");
		}
	});
	
	function sticky(){
		let scrolled = $(window).scrollTop();
		let nav = $('nav');
		if(scrolled > nav.outerHeight()){
			nav.css("position","fixed");
			nav.css("background-color","#EDEEF7");
			nav.css("box-shadow","0px 1px 20px #474A56");
		}
		else{
			nav.css("position","absolute");
			nav.css("background-color","#EDEEF799");
			nav.css("box-shadow","none");
		}
	}
	
	if($('.lists').length != 1){
		var func = setInterval(sticky, 100);
	}
	else{
		clearInterval(func);
		window.onfocus = $(window).scrollTop(0);
		let nav = $('nav');
		nav.css({
			"position":"fixed",
			"background-color":"#EDEEF7",
			"box-shadow":"0px 1px 20px #474A56"
		});
	}
	
	$('.cell').hover(function () {
			$(this).children().first().css("display", "none");
			$(this).children().last().css({
				"position":"absolute",
				"top":"20px",
				"left":"0px",
				"color":"#7868E6",
				"background-color":"#EDEEF7CC",
				"padding": "2px 20px",
				"font-size": "1.7vw"
			});
		},
		function () {
			$(this).children().first().css("display", "inline-block");
			$(this).children().last().css({
				"position":"relative",
				"left":"",
				"top":"",
				"font-size": "",
				"color":"#88FFF7",
				"background-color":"transparent"
			});
		});
	
	$('.items').hover(function(){
		if($(this).find('.hidden-map').length == 1){
			let src = $(this).find('.hidden-map').text();
			$('.map-notify').css({
				'display':'none'
			});
			$('.map-image').css({
				'background-image':'url("images/'+src+'")'
			});
			
			$('#map-url').attr('href',$(this).find('.hidden-url').text());
		}
	})
});
