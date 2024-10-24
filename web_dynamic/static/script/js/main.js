 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() {
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}



		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();


	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:false,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');
				}

				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();



	var counter = function() {

		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-causes').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});

			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });





})(jQuery);


const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const churchProgramPage = document.getElementById('churchProgramPage');

let currentPage = 1;

// Sample church program data (replace with your actual data)
const churchProgramData = [
	{
	"image": "../static/images/sermon-1.png"
	},
	{
	"program": [
		{ "sn": "1", "event": `Processional Hymn - ${hymn.procesional}` },
		{ "sn": "2", "event": "The Preparation" },
		{ "sn": "3", "event": "Ministry of the word" },
		{ "sn": "4", "event": `Epistle - ${reading.epistle}` },
		{ "sn": "4", "event": `Gradual Hymn - ${hymn.gradual}` },
		{ "sn": "4", "event": `Gospel - ${reading.gospel}` },
		{ "sn": "4", "event": "Sermon" },
		{ "sn": "4", "event": "Nicene Creed, Intercessory Prayers To Peace" },
		{ "sn": "4", "event": "Eucaristic Prayer and Concencration of Elemnets" },
		{ "sn": "4", "event": `Communion Proper - ${hymn.communion}`  },
		{ "sn": "4", "event": "Post Comunion Prayers" },
		{ "sn": "4", "event": "Return of Tithe" },
		{ "sn": "4", "event": `Church Offering (General, Welfare/Building Collection)` },
		{ "sn": "4", "event": `Special Thanksgiving - (i) Covennt Seed of Faith (ii)${Aob.family_havest}` },
		{ "sn": "4", "event": "Prayer For" },
		{ "sn": "4", "event": "Notice" },
		{ "sn": "4", "event": `Ressesional Hymn - ${hymn.ressesional}` },
	]
	},
	{
	"program": [
		{ "sn": "1", "event": "Prayer Meeting" },
		{ "sn": "2", "event": "Bible Study" }
	]
	}
];
const prayerData = [
	{
	  'prayer': "God Guide and protect us from harm today"
	}
]

// Function to display the program based on currentPage
function displayProgramPage() {
	const data = churchProgramData[currentPage - 1];
	churchProgramPage.innerHTML = ''; // Clear previous content

	if (data.image) {
	churchProgramPage.innerHTML += `
		<div class="image-container">
		<img src="${data.image}" alt="Church Image" class="img-fluid">
		</div>
	`;
	}

	if (data.program) {
	churchProgramPage.innerHTML += `
		<ul class="church-program-list">
		${data.program.map(item => `<li>${item.sn} - ${item.event}</li>`).join('')}
		</ul>
	`;
	}

	// Update button states based on current page
	prevButton.disabled = currentPage === 1;
	nextButton.disabled = currentPage === churchProgramData.length;
}

// Event listeners for buttons
nextButton.addEventListener('click', () => {
	currentPage++;
	displayProgramPage();
});

prevButton.addEventListener('click', () => {
	currentPage--;
	displayProgramPage();
});

// Initial display
displayProgramPage();

function displayPrayer() {
	const prayerPage = document.getElementById('prayerPage');
	prayerPage.innerHTML = '';
	prayerPage.innerHTML += `
	<p>${prayerData[0].prayer}</p>
	`;
}


const meditation = [
	{
		'Topic': "Working For The Master's Reward",
		'Text': 'Luke 19: 11 - 26; 2Cor. 5:10',
		'message': 'The Lord is my shepherd, I will not want anyone to disown me. I will not want anyone to turn away from me. I will not want anyone to turn away from me.'
	}
]

fetch('/latest_service')
.then(response => response.json())
.then(data => {
	fetch(`/meditation/${data.id}`)
	.then(response => response.json())
	.then(meditationData => {
		meditation[0].message = meditationData.prayer_note
		meditation[0].Topic = meditationData.prayer_topic
		meditation[0].Text = meditationData.prayer_text
	})
})




function displayMeditation() {
	const meditationPage = document.getElementById('meditationPage');
	meditationPage.innerHTML = '';
	meditationPage.innerHTML += `
	<h2 style="color: aliceblue;">${meditation[0].Topic}</h2>
	<h3 style="color: aliceblue;">${meditation[0].Text}</h3>
	<p>${meditation[0].message}</p>
	`;
}

const wedding = [
	{
		'topic': '',
		'text': '',
		'message': ' I hereby publish the banns of marriage between <b>Oburo Anthony Chukwubuikem</b> and <b>Amatobi ifunanya Mercy</b>. if any one knows any reason why these persons should not marry each other he/she should declare it now. '
	},
	{
		'topic': '',
		'text': '<b>This is the Third time of asking</b>',
		'message': ' I hereby publish the banns of marriage between <b>Odibei Adimabua James</b> and <b>Ezeigwe Amechi Mary</b>. if any one knows any reason why these persons should not marry each other he/she should declare it now. '
	}
]

fetch('/latest_service')
	.then(response => response.json())
	.then(data => {
		fetch(`/wedding_notice/${data.id}`)
		.then(response => response.json())
		.then(weddingData => {
			wedding[0].message = weddingData.message
			wedding[0].text = weddingData.text

		})
	})


function displayWedding(){
	const weddingPage = document.getElementById('weddingPage');
	weddingPage.innerHTML = '';
	wedding.forEach(weddingItem => {
		weddingPage.innerHTML += `
		<h2 style="color: aliceblue;">${weddingItem.topic}</h2>
		<h3 style="color: aliceblue;">${weddingItem.text}</h3>
		<p>${weddingItem.message}</p>
		`;
	})
}
document.addEventListener('DOMContentLoaded', function() {
    const options = {
        strings: ['following Jesus whereever he goes.', "Jesus Christ Said:", "16 For God so loved the world", "that he gave his only begotten Son", "that whosoever believeth in him should not perish, but have everlasting life."],
        typeSpeed: 150,
        backSpeed: 50,
        backDelay: 3000,
        loop: true
    };

    const multiTextElement = document.querySelector('.multi-text');
    let currentTextIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function type() {
        const fullText = options.strings[currentTextIndex];
        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
        }
        multiTextElement.textContent = currentText;
        let typeSpeed = options.typeSpeed;
        if(isDeleting) {
            typeSpeed /= 2;
        }
        if (!isDeleting && currentText === fullText) {
            typeSpeed = options.backDelay;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % options.strings.length;
        }
        setTimeout(type, typeSpeed);
    }
    type();
});