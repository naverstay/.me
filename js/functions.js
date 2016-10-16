// JavaScript Functions

var sliderDots = [];

$(document).ready(function(){

	var viewPort = $('.folio_viewport'),
			frameFolio = $('.folio_iframe'),
			frameFolioLink = $('#external_link'),
			superSlides = $('#slides'),
			superSlidesImg = superSlides.find('img'),
			imgLoaded = 0,
			viewportClose = $('.viewport_close'),
			portFolio = $('#portfolioContent'),
			mainImg = [
				'./rubik.gif',
				'./img/marker_n.png',
				'./i/logo_strekoza.png',
				'./i/skype_icon.png',
				'./i/email_icon.png'
			];
	
	/* --- NiceScroll --- */
	$(".section").eq(0).niceScroll();

	/* --- Slider --- */

	/*	for(var i = 0; i < mainImg.length; i++){
	 var imageObj = new Image();
	 imageObj.src = mainImg[i];
	 imageObj.onload = (function(i){
	 return function(){
	 //				console.log(i, mainImg[i], 'loaded');
	 imgLoaded++;
	 loadSuperSlide();
	 }
	 })(i);
	 }*/

	//var header = $('.header'), doc = $(document),
	//		browserWindow = $(window);
	//
	//browserWindow.on('scroll', function(){
	//	var scrollLeft = doc.scrollLeft();
	//	header.css({'marginLeft': (scrollLeft > 0 ? -scrollLeft : 0), 'marginRight': (scrollLeft > 0 ? scrollLeft : 0)});
	//});
	//
	//$('#control_panel').text('b h ' + browserWindow.height() + ' b w ' + browserWindow.width() + ' gl w ' + $('.gl_wrapper').width());
	//
	//console.log('b h', browserWindow.height(), 'b w', browserWindow.width());

	function loadSuperSlide(){

		if(imgLoaded == mainImg.length){
//			console.log('loadSuperSlide');
			superSlidesImg.imagesLoaded(function(){
				$('#slides').on('init.slides', function(){
//					console.log('superSlide init');

					$('#homePreloader').fadeOut(1000);
					loadMason();
				});

				superSlides.superslides({
					slide_easing: 'easeInOutCubic',
					slide_speed : 1500,
					play        : 8000,
					pagination  : true,
					hashchange  : false,
					scrollable  : true
				});
			});

		}

	}

	superSlidesImg.imagesLoaded(function(){

		var pt = $('<span class="timer_holder"><span class="timer_wrapper"><span class="timer_l"></span></span><span class="timer_wrapper mod_right"><span class="timer_r"></span></span></span>'), my_slider = $('#slides'), pager, navigation, new_slide = 0;

		my_slider.on('init.slides', function(){
			pager = $('.slides-pagination');
			navigation = $('.slides-navigation');

			pager.find('a').each(function(ind){
				var firedEl = $(this);

				firedEl.append(pt.clone());
				sliderDots.push(firedEl[0]);
			});

			runCircle(sliderDots[new_slide], my_slider);

			$('#homePreloader').fadeOut(200);
			
			loadMason();
			
		}).on('animating.slides', function(q, w){

			var circles = $('.timer_r, .timer_l', pager);

			snabbt(circles, 'stop');

			new_slide = w.upcoming_slide;

			setTimeout(function(){
				circles.removeAttr('style');
			}, 200);
		}).on('animated.slides', function(){
			runCircle(sliderDots[new_slide], my_slider);
		}).swipe({
			excludedElements: "label, button, input, select, textarea, a:not(.slide_link), .noSwipe",
			swipeLeft       : function(event, direction, distance, duration, fingerCount){
				navigation.find('.next').click();
			},
			swipeRight      : function(event, direction, distance, duration, fingerCount){
				navigation.find('.prev').click();
			}
		});

		superSlides.superslides({
			slide_easing: 'easeInOutCubic',
			slide_speed : 1500,
			pagination  : true,
			hashchange  : false,
			scrollable  : true
		});
	});

	function animateOnce(el, addClass, removeClass){
		el.addClass(addClass + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass(addClass + ' ' + removeClass);
		});
	}

	$('.hover_animate').on('mouseenter', function(){
		animateOnce($(this), 'tada');
	});

	/* --- Sidebar Menu --- */
	$(".pageLink, .btn-goto").click(function(e){

		var firedEl = $(this);

		if(!firedEl.hasClass('activeLink')){

			$(".pageLink, .btn-goto").removeClass('activeLink');

			firedEl.addClass('activeLink');

			var newSection = $("#" + $(this).data("refid")), sections = $(".section");

			sections.removeClass("section-animate");

			newSection.toggleClass("section-animate");

			for(var i = 0; i < sections.length; i++){
				sections.eq(i).getNiceScroll().remove();
			}

			if(!newSection.hasClass('no_nice_scroll'))  newSection.niceScroll();

		}

	});

	$(".close-sidebar-menu").click(function(){
		$(".sidebar-menu").toggleClass("sidebar-menu-left");
	});

	function loadMason(){

//		console.log('loadMason start');

		/* --- Masonry --- */
		var $container = $('#isotope').show();

		$container.imagesLoaded(function(){
//			console.log('loadMason done');

			$('#isotope .item').show();

			$container.isotope({
				itemSelector: '.item'
			});

			$('#filters').removeClass('disable_mod').find('a').click(function(){
				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector
				});

			});

			$('#isotopPreloader').fadeOut(1200);

			$('.showFolioItem').on('click', function(){
				var firedEl = $(this);

				var loc = (window.location.href).slice(0, (window.location.href).lastIndexOf('/'));

				$('#iframePreloader').fadeIn(1);

//		console.log(loc + firedEl.attr('href'));

				frameFolio.attr('src', loc + firedEl.attr('href'));

				portFolio.parent().addClass('no_nice_scroll').getNiceScroll().remove();

				portFolio.fadeOut(500, function(){
					viewPort.fadeIn(500);
				});

				return false;
			});

			frameFolio.on('load', function(){
//				console.log( 'frameFolio', frameFolio.attr('src'));
				frameFolioLink.attr('href', frameFolio.attr('src'));
				setTimeout(function(){
					$('#iframePreloader').fadeOut(1000);
				}, 500);
			});

			viewportClose.on('click', function(){
				$('#iframePreloader').fadeIn(1);
				viewPort.fadeOut(1000, function(){
					portFolio.fadeIn(500, function(){
						setTimeout(function(){
							portFolio.parent().removeClass('no_nice_scroll').niceScroll();
						}, 1000);
					});
				});
				return false;
			});

			/* --- Fancybox --- */
			$(".view-fancybox").fancybox({
				openEffect : 'elastic',
				closeEffect: 'elastic',
				next       : 'left',
				prev       : 'right'
			});

			/* --- Opacity Effect --- */
			$('.thumbnails li, #isotope .item')
					.mouseover(function(){
						$(this).siblings().css({
							opacity: 0.2
						})
					})
					.mouseout(function(){
						$(this).siblings().css({
							opacity: 1
						})
					});

			/* --- Active Filter Menu --- */
			$(".products-filter a").click(function(e){
				$(".products-filter a").removeClass("active");
				$(this).addClass("active");
				return false;
			});
//		return false;
		});

		/* --- Google Map --- */
/*		var mapOptions = {
			center   : new google.maps.LatLng(50.067587, 36.213729),
			zoom     : 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		var image = "img/marker_n.png";
		var marker = new google.maps.Marker({
			position: mapOptions.center,
			map     : map,
			icon    : image
		});*/

	}

});

function runCircle(pager_dot, slider){

	var circle_1 = $('.timer_r', pager_dot), circle_2 = $('.timer_l', pager_dot);

	circle_1.snabbt({
		fromRotation: [0, 0, Math.PI],
		rotation    : [0, 0, 0],
		duration    : 4000,
		callback    : function(){
			circle_2.snabbt({
				fromRotation: [0, 0, Math.PI],
				rotation    : [0, 0, 0],
				duration    : 4000,
				callback    : function(){
					$('.slides-navigation .next').click();
				}
			})
		}
	});
}