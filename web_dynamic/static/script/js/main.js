AOS.init({
  duration: 800,
  easing: "slide",
});

(function ($) {
  "use strict";

  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: "scroll",
  });

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  // loader
  var loader = function () {
    setTimeout(function () {
      if ($("#ftco-loader").length > 0) {
        $("#ftco-loader").removeClass("show");
      }
    }, 1);
  };
  loader();

  // Scrollax
  $.Scrollax();

  // Burger Menu
  var burgerMenu = function () {
    $("body").on("click", ".js-fh5co-nav-toggle", function (event) {
      event.preventDefault();

      if ($("#ftco-nav").is(":visible")) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }
    });
  };
  burgerMenu();

  var onePageClick = function () {
    $(document).on("click", '#ftco-nav a[href^="#"]', function (event) {
      event.preventDefault();

      var href = $.attr(this, "href");

      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top - 70,
        },
        500,
        function () {
          // window.location.hash = href;
        }
      );
    });
  };

  onePageClick();

  var carousel = function () {
    $(".home-slider").owlCarousel({
      loop: false,
      autoplay: true,
      margin: 0,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      nav: false,
      autoplayHoverPause: false,
      items: 1,
      navText: [
        "<span class='ion-md-arrow-back'></span>",
        "<span class='ion-chevron-right'></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  };
  carousel();

  $("nav .dropdown").hover(
    function () {
      var $this = $(this);
      // 	 timer;
      // clearTimeout(timer);
      $this.addClass("show");
      $this.find("> a").attr("aria-expanded", true);
      // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").addClass("show");
    },
    function () {
      var $this = $(this);
      // timer;
      // timer = setTimeout(function(){
      $this.removeClass("show");
      $this.find("> a").attr("aria-expanded", false);
      // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").removeClass("show");
      // }, 100);
    }
  );

  $("#dropdown04").on("show.bs.dropdown", function () {
    console.log("show");
  });

  // scroll
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $(".ftco_navbar"),
        sd = $(".js-scroll-wrap");

      if (st > 150) {
        if (!navbar.hasClass("scrolled")) {
          navbar.addClass("scrolled");
        }
      }
      if (st < 150) {
        if (navbar.hasClass("scrolled")) {
          navbar.removeClass("scrolled sleep");
        }
      }
      if (st > 350) {
        if (!navbar.hasClass("awake")) {
          navbar.addClass("awake");
        }

        if (sd.length > 0) {
          sd.addClass("sleep");
        }
      }
      if (st < 350) {
        if (navbar.hasClass("awake")) {
          navbar.removeClass("awake");
          navbar.addClass("sleep");
        }
        if (sd.length > 0) {
          sd.removeClass("sleep");
        }
      }
    });
  };
  scrollWindow();

  var counter = function () {
    $("#section-counter, .hero-wrap, .ftco-counter, .ftco-causes").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          var comma_separator_number_step =
            $.animateNumber.numberStepFactories.separator(",");
          $(".number").each(function () {
            var $this = $(this),
              num = $this.data("number");
            console.log(num);
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step,
              },
              7000
            );
          });
        }
      },
      { offset: "95%" }
    );
  };
  counter();

  var contentWayPoint = function () {
    var i = 0;
    $(".ftco-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .ftco-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn ftco-animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft ftco-animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight ftco-animated");
                  } else {
                    el.addClass("fadeInUp ftco-animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "95%" }
    );
  };
  contentWayPoint();

  // magnific popup
  $(".image-popup").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
    },
  });

  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });
})(jQuery);

let currentPage = 1;
const serviceDataCache = {}; // Cache to store data for each serviceId

// Function to fetch service and hymns data, returning the church program data and caching it
async function fetchAndUseService(serviceId) {
  if (serviceDataCache[serviceId]) {
    return serviceDataCache[serviceId];
  }

  try {
    const [
      serviceResponse,
      hymnsResponse,
      lessonResponse,
      ThanksgivingResponse,
      NoticesResponse,
      NoticeScheduleResponse,
      ChurchRescourceResponse,
      PrayerListResponse,
      MarriageBannResponse,
      meditationResponse,
      aobResponse,
    ] = await Promise.all([
      fetch(`/service/${serviceId}`),
      fetch("/hymns"),
      fetch("/reading_schedule"),
      fetch("/thanksgiving"),
      fetch("/notices"),
      fetch("/notice_schedule"),
      fetch("/church_resources"),
      fetch("/prayerlist"),
      fetch("/marriagebann"),
      fetch("/meditation"),
      fetch("/aob"),
    ]);

    const [
      service,
      hymns,
      lessons,
      thanksgivingList,
      notices,
      noticeSchedule,
      churchResources,
      prayerList,
      marriagebann,
      meditations,
      aobs,
    ] = await Promise.all([
      serviceResponse.json(),
      hymnsResponse.json(),
      lessonResponse.json(),
      ThanksgivingResponse.json(),
      NoticesResponse.json(),
      NoticeScheduleResponse.json(),
      ChurchRescourceResponse.json(),
      PrayerListResponse.json(),
      MarriageBannResponse.json(),
      meditationResponse.json(),
      aobResponse.json(),
    ]);

    // Process and structure data as before
    const meditation = meditations.find((m) => m.service_id === serviceId) || {};
    const hymn = hymns.find((h) => h.service_id === serviceId) || {};
    const lesson = lessons.find((l) => l.service_id === serviceId) || {};
    const marriages =
      marriagebann.filter((l) => l.service_id === serviceId) || {};
    // Check if any marriages were found
    // Create the wedding data entries for each marriage bann
    const marriageEntries = marriages.map((marriage, index) => {
      return {
        text: `<b>This is the ${marriage.bann_announcement_count} time of asking</b> \n I hereby publish the banns of marriage between <b>${marriage.groom_name}</b> and <b>${marriage.bride_name}</b>. If anyone knows any reason why these persons should not marry each other, he/she should declare it now.`, // Incremental sn starting from 1
      };
    });
    const thankgivings = thanksgivingList.filter(
      (t) => t.service_id === serviceId
    );
    const notice = notices.find((n) => n.service_id === serviceId) || {};
    const schedules = noticeSchedule
      .filter((ns) => ns.notice_id === notice.id)
      .map((s, i) => {
        const eventDate = new Date(s.event_day);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          weekday: 'long', 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric'
        }).format(eventDate);

        // Format the day with the appropriate suffix (st, nd, rd, th)
        const day = eventDate.getDate();
        const daySuffix = day % 10 === 1 && day !== 11 ? 'st' :
                          day % 10 === 2 && day !== 12 ? 'nd' :
                          day % 10 === 3 && day !== 13 ? 'rd' : 'th';

        return {
          sn: `${i + 1}`,
          event: `${formattedDate.replace(/\d+/, day + daySuffix)}: ${s.event_description}`,
        };
      });

    const resources = churchResources
      .filter((cr) => cr.notice_id === notice.id)
      .map((r, i) => ({ sn: `${i + 1}`, event: r.description }));
    const prayers = prayerList
      .filter((pl) => pl.notice_id === notice.id)
      .map((p, i) => ({ sn: `${i + 1}`, event: p.family_name }));
    const aob = (aobs.find(a => a.service_id === serviceId) || {}).aob1 || "";

    if (service.CombinedServiceStyle == "Eucharistic"){
      const churchProgramData = [
        { image: "" },
        {
          program: [
            { time: `${service.Csunday_time}AM` },
            { text: "Order of Eucharistic Service" },
            {
              sn: "1",
              event: `Processional Hymn - ${hymn.processional || "N/A"}`,
            },
            { sn: "2", event: "The Preparation" },
            { sn: "3", event: "Ministry of the word" },
            { sn: "4", event: `Old Testament Reading - ${lesson.OldTestament}` },
            { sn: "5", event: `Psalm  ${lesson.psalm || "N/A"}` },
            { sn: "6", event: `Epistle - ${lesson.espistle || "N/A"}` },
            { sn: "7", event: `Gradual Hymn - ${hymn.gradual || "N/A"}` },
            { sn: "8", event: `Gospel - ${lesson.gospel || "N/A"}` },
            { sn: "9", event: "Sermon" },
            { sn: "10", event: "Nicene Creed, Intercessory Prayers To Peace" },
            { sn: "11", event: "Eucharistic Prayer and Consecration of Elements" },
            { sn: "12", event: `Communion Proper - ${hymn.communion || "N/A"}` },
            { sn: "13", event: "Post Communion Prayers" },
            { sn: "14", event: "Return of Tithe" },
            {
              sn: "15",
              event: "Church Offering (General, Welfare/Building Collection)",
            },
            {
              sn: "16",
              event: `Special Thanksgiving - (i) Convenant Seed Of Faith ${
                thankgivings.map((t) => t.text).join(" & ") || "N/A"
              }`,
            },
            ...(aob ? [{ sn: "16.1", event: `${aob}` }] : []),
            { sn: "17", event: "Prayer For" },
            { sn: "18", event: "Notice" },
            {
              sn: "19",
              event: `Recessional Hymn - ${hymn.Recessional || "N/A"}`,
            },
          ],
        },
        {
          program: [
            { subheading: `COLLECT FOR ${notice.title}` },
            { text: `${notice.content}` },
            { subheading: "Notice" },
            {
              text: "We welcome all worshipers to this divine service, especially those worshiping with us for the first time",
            },
            ...schedules,
            ...resources,
            {
              text: "<b><u>PLEASE NOTE:</u></b> For tithe use <b>Access Bank</b>   {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>0057259382</b>}. For Harvest & Building Support use <b>Polaris Bank</b>  {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>1040502076</b>}. For all your sacrifice use <b>Eco Bank</b>  {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>4312025686</b>.} For <b>MISSION PARTNERSHIP</b> use <b>Polaris Bank</b>  {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>4091373646</b>.}",
            },
            {
              text: "<b><u>Bans of Marriage:</u></b>",
            },
            ...marriageEntries,
            {
              text: "Weekly Prayers: The Church should please pray for the following families",
            },
            ...prayers,
          ],
        },
        {
          program: [
            { text: "<b><u>Weekly Meditation:</u></b>" },
            { subheading: `TOPIC: ${meditation.topic}` },
            { text: `<b>TEXT: ${meditation.text}</b>` },
            { text: `<b><u>INTRODUCTION:</u></b> ${meditation.note}` },
          ],
        },
      ];
  
      if (service.liturgical_color == "green" || service.liturgical_color == "Green"){
        churchProgramData[0].image = "../static/images/sermon-1.png";
      } else if (service.liturgical_color == "red" || service.liturgical_color == "Red") {
        churchProgramData[0].image = "../static/images/red_Church_Program.png"
      } else if (service.liturgical_color == "Purple" || service.liturgical_color == "purple" || service.liturgical_color == "violet" || service.liturgical_color == "Violet") {
        churchProgramData[0].image = "../static/images/Purpule_Church_Program.png"
      } else if (service.liturgical_color == "gold" || service.liturgical_color == "Gold" || service.liturgical_color == "white" || service.liturgical_color == "White") {
        churchProgramData[0].image = "../static/images/Gold_Church_Program.png"}
  
      // Cache the data for future reference
      serviceDataCache[serviceId] = churchProgramData;
  
      return churchProgramData;
    } else {
      const churchProgramData = [
        { image: "" },
        {
          program: [
            { time: `${service.Csunday_time}AM` },
            { text: "Order of Service" },
            {
              sn: "1",
              event: `Processional Hymn - ${hymn.processional || "N/A"}`,
            },
            { sn: "2", event: "Call to Worship" },
            { sn: "3", event: `Psalm ${lesson.psalm}` },
            { sn: "4", event: `First Lesson - ${lesson.first_lesson || "N/A"}` },
            { sn: "5", event: `Gradual Hymn - ${hymn.gradual || "N/A"}` },
            { sn: "6", event: `Second Lesson - ${lesson.second_lesson || "N/A"}` },
            { sn: "7", event: `Hymn for Sermon - ${hymn.sermon}` },
            { sn: "8", event: "Sermon" },
            { sn: "9", event: "Apostles' Creed, Collect, Intercession to Grace" },
            { sn: "10", event: "Return of Tithe" },
            {
              sn: "11",
              event: "Church Offering (General, Welfare/Building Collection)",
            },
            {
              sn: "12",
              event: `Special Thanksgiving - (i) Convenant Seed Of Faith ${
                thankgivings.map((t) => t.text).join(" & ") || "N/A"
              }`,
            },
            ...(aob ? [{ sn: "12.1", event: `${aob}` }] : []),
            { sn: "13", event: "Prayer For" },
            { sn: "14", event: "Notice" },
            {
              sn: "15",
              event: `Recessional Hymn - ${hymn.Recessional || "N/A"}`,
            },
          ],
        },
        {
          program: [
            { subheading: `COLLECT FOR ${notice.title}` },
            { text: `${notice.content}` },
            { subheading: "Notice" },
            {
              text: "We welcome all worshipers to this divine service, especially those worshiping with us for the first time",
            },
            ...schedules,
            ...resources,
            {
              text: "<b><u>PLEASE NOTE:</u></b> For tithe use <b>Access Bank</b>   {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>0057259382</b>}. For Harvest & Building Support use <b>Polaris Bank</b>  {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>1040502076</b>}. For all your sacrifice use <b>Eco Bank</b>  {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>4312025686</b>.} For <b>MISSION PARTNERSHIP</b> use <b>Polaris Bank</b>  {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>4091373646</b>.}",
            },
            {
              text: "<b><u>Bans of Marriage:</u></b>",
            },
            ...marriageEntries,
            {
              text: "Weekly Prayers: The Church should please pray for the following families",
            },
            ...prayers,
          ],
        },
        {
          program: [
            { text: "<b><u>Weekly Meditation:</u></b>" },
            { subheading: `TOPIC: ${meditation.topic}` },
            { text: `<b>TEXT: ${meditation.text}</b>` },
            { text: `<b><u>INTRODUCTION:</u></b> ${meditation.note}` },
          ],
        },
      ];
  
      if (service.liturgical_color == "green" || service.liturgical_color == "Green"){
        churchProgramData[0].image = "../static/images/sermon-1.png";
      } else if (service.liturgical_color == "red" || service.liturgical_color == "Red") {
        churchProgramData[0].image = "../static/images/red_Church_Program.png"
      } else if (service.liturgical_color == "Purple" || service.liturgical_color == "purple" || service.liturgical_color == "violet" || service.liturgical_color == "Violet") {
        churchProgramData[0].image = "../static/images/Purpule_Church_Program.png"
      } else if (service.liturgical_color == "gold" || service.liturgical_color == "Gold" || service.liturgical_color == "white" || service.liturgical_color == "White") {
        churchProgramData[0].image = "../static/images/Gold_Church_Program.png"}
  
      // Cache the data for future reference
      serviceDataCache[serviceId] = churchProgramData;
  
      return churchProgramData;
    }
  } catch (error) {
    console.error("Error fetching service data:", error);
  }
}

async function DoubleService(serviceId) {
  if (serviceDataCache[serviceId]) {
    return serviceDataCache[serviceId];
  }

  try {
    const [
      serviceResponse,
      hymnsResponse,
      lessonResponse,
      ThanksgivingResponse,
      NoticesResponse,
      NoticeScheduleResponse,
      ChurchRescourceResponse,
      PrayerListResponse,
      MarriageBannResponse,
      aobResponse,
      meditationResponse,
    ] = await Promise.all([
      fetch(`/service/${serviceId}`),
      fetch("/hymns"),
      fetch("/reading_schedule"),
      fetch("/thanksgiving"),
      fetch("/notices"),
      fetch("/notice_schedule"),
      fetch("/church_resources"),
      fetch("/prayerlist"),
      fetch("/marriagebann"),
      fetch("/aob"),
      fetch("/meditation"),
    ]);

    const [
      service,
      hymns,
      lessons,
      thanksgivingList,
      notices,
      noticeSchedule,
      churchResources,
      prayerList,
      marriagebann,
      aob,
      meditations,
    ] = await Promise.all([
      serviceResponse.json(),
      hymnsResponse.json(),
      lessonResponse.json(),
      ThanksgivingResponse.json(),
      NoticesResponse.json(),
      NoticeScheduleResponse.json(),
      ChurchRescourceResponse.json(),
      PrayerListResponse.json(),
      MarriageBannResponse.json(),
      aobResponse.json(),
      meditationResponse.json(),
    ]);

    // Define service styles based on type
    const getServiceProgram = (serviceType, time, aob, hymn, lesson, thankgivings) => {
      const specialThanksgiving = thankgivings.map(t => t.text).join(" & ") || "N/A";
      const formattedAob = typeof aob === 'string' ? aob : JSON.stringify(aob);
      if (serviceType === "Eucharistic") {
        return [
          { time: `${time}AM` },
          { text: "Order of Eucharistic Service" },
          { sn: "1", event: `Processional Hymn - ${hymn.processional || "N/A"}` },
          { sn: "2", event: "The Preparation" },
          { sn: "3", event: "Ministry of the Word" },
          { sn: "4", event: `Old Testament Reading - ${lesson.OldTestament || "N/A"}` },
          { sn: "5", event: `Psalm ${lesson.psalm || "N/A"}` },
          { sn: "6", event: `Epistle - ${lesson.espistle || "N/A"}` },
          { sn: "7", event: `Gradual Hymn - ${hymn.gradual || "N/A"}` },
          { sn: "8", event: `Gospel - ${lesson.gospel || "N/A"}` },
          { sn: "9", event: "Sermon" },
          { sn: "10", event: "Nicene Creed, Intercessory Prayers To Peace" },
          { sn: "11", event: "Eucharistic Prayer and Consecration of Elements" },
          { sn: "12", event: `Communion Proper - ${hymn.communion || "N/A"}` },
          { sn: "13", event: "Post Communion Prayers" },
          { sn: "14", event: "Return of Tithe" },
          { sn: "15", event: "Church Offering (General, Welfare/Building Collection)" },
          { sn: "16", event: `Special Thanksgiving - (i) Covenant Seed Of Faith ${specialThanksgiving}` },
          ...(aob ? [{ sn: "16.1", event: `${aob}` }] : []),
          { sn: "17", event: "Prayer For" },
          { sn: "18", event: "Notice" },
          { sn: "19", event: `Recessional Hymn - ${hymn.Recessional || "N/A"}` },
        ];
      } else {
        return [
          { time: `${time}AM` },
          { text: "Order of Service" },
          { sn: "1", event: `Processional Hymn - ${hymn.processional || "N/A"}` },
          { sn: "2", event: "Call to Worship" },
          { sn: "3", event: `Psalm  ${lesson.psalm || "N/A"}` },
          { sn: "4", event: `First lesson - ${lesson.first_lesson || "N/A"}` },
          { sn: "5", event: `Gradual Hymn - ${hymn.gradual || "N/A"}` },
          { sn: "6", event: `Second Lesson - ${lesson.second_lesson || "N/A"}` },
          { sn: "7", event: `Hymn for Sermon - ${hymn.sermon}` },
          { sn: "8", event: "SERMON" },
          { sn: "9", event: "Apostle's Creed, Collects, Intercession to Grace" },
          { sn: "10", event: "Return of Tithe" },
          { sn: "11", event: "Church Offering (General, Welfare/Building Collection)" },
          { sn: "12", event: `Special Thanksgiving - (i) Convenant Seed Of Faith ${thankgivings.map(t => t.text).join(" & ") || "N/A"}` },
          ...(aob ? [{ sn: "12.1", event: aob }] : []),
          { sn: "13", event: "Prayer For" },
          { sn: "14", event: "Notice" },
          { sn: "15", event: `Recessional Hymn - ${hymn.Recessional || "N/A"}` },
        ];
      }
    };

    const serviceAob = (aob.find(a => a.service_id === serviceId) || {}).aob1 || "";
    const serviceAob2 = (aob.find(a => a.service_id === serviceId) || {}).aob2 || "";
    // Process data for each program
    const program1 = getServiceProgram(service.FirstServiceStyle, service.FirstServiceTime, serviceAob, hymns.find(h => h.service_id === serviceId) || {}, lessons.find(l => l.service_id === serviceId) || {}, thanksgivingList.filter(t => t.service_id === serviceId));
    const program2 = getServiceProgram(service.SecondServiceStyle, service.SecondServiceTime, serviceAob2, hymns.find(h => h.service_id === serviceId) || {}, lessons.find(l => l.service_id === serviceId) || {}, thanksgivingList.filter(t => t.service_id === serviceId));

    // Other program sections (notices, meditation,  resources, prayers, marriage banns)
    const meditation = meditations.find(m => m.service_id === serviceId) || {};
    const notice = notices.find(n => n.service_id === serviceId) || {};
    const schedules = noticeSchedule
      .filter((ns) => ns.notice_id === notice.id)
      .map((s, i) => {
        const eventDate = new Date(s.event_day);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          weekday: 'long', 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric'
        }).format(eventDate);

        // Format the day with the appropriate suffix (st, nd, rd, th)
        const day = eventDate.getDate();
        const daySuffix = day % 10 === 1 && day !== 11 ? 'st' :
                          day % 10 === 2 && day !== 12 ? 'nd' :
                          day % 10 === 3 && day !== 13 ? 'rd' : 'th';

        return {
          sn: `${i + 1}`,
          event: `${formattedDate.replace(/\d+/, day + daySuffix)}: ${s.event_description}`,
        };
      });
    const resources = churchResources.filter(cr => cr.notice_id === notice.id).map((r, i) => ({ sn: `${i + 1}`, event: r.description }));
    const prayers = prayerList.filter(pl => pl.notice_id === notice.id).map((p, i) => ({ sn: `${i + 1}`, event: p.family_name }));
    const marriageEntries = marriagebann.filter(l => l.service_id === serviceId).map((marriage) => ({
      text: `<b>This is the ${marriage.bann_announcement_count} time of asking</b> \n I hereby publish the banns of marriage between <b>${marriage.groom_name}</b> and <b>${marriage.bride_name}</b>. If anyone knows any reason why these persons should not marry each other, he/she should declare it now.`,
    }));

    const churchProgramData = [
      { image: "../static/images/sermon-1.png" },
      { program: program1 },
      { program: program2 },
      {
        program: [
          { subheading: `COLLECT FOR ${notice.title}` },
          { text: `${notice.content}` },
          { subheading: "Notice" },
          { text: "We welcome all worshipers to this divine service, especially those worshiping with us for the first time" },
          ...schedules,
          ...resources,
          {
            text: "<b><u>PLEASE NOTE:</u></b> For tithe use <b>Access Bank</b> {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>0057259382</b>}. For Harvest & Building Support use <b>Polaris Bank</b> {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>1040502076</b>}. For all your sacrifice use <b>Eco Bank</b> {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>4312025686</b>}. For <b>MISSION PARTNERSHIP</b> use <b>Polaris Bank</b> {Account Name: <b>St. Philip's Anglican Church Asaba</b>. Account Number: <b>4091373646</b>}.",
          },
          { text: "<b><u>Bans of Marriage:</u></b>" },
          ...marriageEntries,
          { text: "Weekly Prayers: The Church should please pray for the following families" },
          ...prayers,
        ],
      },
      {
        program: [
          { text: "<b><u>Weekly Meditation:</u></b>" },
          { subheading: `TOPIC: ${meditation.topic}` },
          { text: `<b>TEXT: ${meditation.text}</b>` },
          { text: `<b><u>INTRODUCTION:</u></b> ${meditation.note}` },
        ],
      },
    ];

    if (service.liturgical_color == "green" || service.liturgical_color == "Green"){
      churchProgramData[0].image = "../static/images/sermon-1.png";
    } else if (service.liturgical_color == "red" || service.liturgical_color == "Red") {
      churchProgramData[0].image = "../static/images/red_Church_Program.png"
    } else if (service.liturgical_color == "Purple" || service.liturgical_color == "purple" || service.liturgical_color == "violet" || service.liturgical_color == "Violet") {
      churchProgramData[0].image = "../static/images/Purpule_Church_Program.png"
    } else if (service.liturgical_color == "gold" || service.liturgical_color == "Gold" || service.liturgical_color == "white" || service.liturgical_color == "White") {
      churchProgramData[0].image = "../static/images/Gold_Church_Program.png"}

    // Cache the data for future reference
    serviceDataCache[serviceId] = churchProgramData;

    return churchProgramData;
  } catch (error) {
    console.error("Error fetching service data:", error);
  }
}



async function displayProgramPage(serviceId) {
  const churchProgramPage = document.getElementById(
    `churchProgramPage-${serviceId}`
  );
  const service = await fetch(`/service/${serviceId}`);
  const serviceData = await service.json();
  let churchProgramData = [];
  if (serviceData.service_name === "combined_service") {
    churchProgramData = await fetchAndUseService(serviceId);
  } else {
    churchProgramData = await DoubleService(serviceId);
  }
  const data = churchProgramData[currentPage - 1];

  // Clear previous content
  churchProgramPage.innerHTML = "";

  // Display the image if available
  if (data.image) {
    churchProgramPage.innerHTML += `
      <div class="image-container">
        <img src="${data.image}" alt="Church Image" class="img-fluid">
      </div>`;
  }

  // Display service time if available
  if (data.program && data.program[0]?.time) {
    churchProgramPage.innerHTML += `
      <div class="program-time">
        <h5 style="color: #c9b2c6;">Service Time: ${data.program[0].time}</h5>
      </div>`;
  }

  // Display the program list with checks for each item's properties
  if (data.program) {
    churchProgramPage.innerHTML += `<ul class="church-program-list">
      ${data.program
        .map((item) => {
          // Check for subheading, text, sn, and event in each program item
          if (item.subheading) {
            return `<li class="subheading"><h4 style="color: aliceblue;">${item.subheading}</h4></li>`;
          } else if (item.text) {
            return `<li class="program-text">${item.text}</li>`;
          } else if (item.text && item.event) {
            return `<li class="program-text">${item.text}</li>`;
          } else if (item.sn && item.event) {
            return `<li>${item.sn} - ${item.event}</li>`;
          } else {
            return ""; // Skip items without recognizable properties
          }
        })
        .join("")}
    </ul>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".view-bulletin-btn[data-service-id]")
    .forEach((button) => {
      displayProgramPage(button.getAttribute("data-service-id"));
    });
});

document.querySelectorAll(".btn-primary").forEach((button) => {
  button.addEventListener("click", function () {
    displayProgramPage(this.getAttribute("data-service-id"));
  });
});

// document.querySelectorAll('[id^="prevButton"]').forEach(prevButton => {
//   prevButton.addEventListener('click', function() {
//     console.log('Previous button clicked');
//     if (currentPage > 1) {
//       currentPage--;
//       displayProgramPage(this.getAttribute('data-service-id'));
//     }
//   });
// });

document.addEventListener("click", function (event) {
  const target = event.target;

  // Check if the next button was clicked
  if (target.matches(".btn-primary[data-service-id]")) {
    const serviceId = target.getAttribute("data-service-id");
    fetchAndUseService(serviceId).then((data) => {
      if (currentPage < data.length) {
        currentPage++;
        displayProgramPage(serviceId);
        document.getElementById(`prevButton-${serviceId}`).disabled = false; // Enable Previous button
      }
    });
  }

  if (target.matches(".btn-secondary[data-service-id]")) {
    console.log("Previous button clicked");
    const serviceId = target.getAttribute("data-service-id");
    if (currentPage > 1) {
      currentPage--;
      displayProgramPage(serviceId);
      if (currentPage === 1) {
        target.disabled = true; // Disable if at the first page
      }
    }
  }
});

// document.querySelectorAll('[id^="nextButton"]').forEach(nextButton => {
//   nextButton.addEventListener('click', function() {
//     console.log('Next button clicked');
//     const serviceId = this.getAttribute('data-service-id');
//     fetchAndUseService(serviceId).then(data => {
//       if (currentPage < data.length) {
//         currentPage++;
//         displayProgramPage(serviceId);
//       }
//     });
//   });
// });

// Function to monitor modal's display state and reset currentPage when hidden
document.querySelectorAll(".modal").forEach((modal) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // Check if the 'show' class is removed (modal is closed)
      if (mutation.type === "attributes" && !modal.classList.contains("show")) {
        currentPage = 1; // Reset currentPage to 1
      }
    });
  });

  // Observe changes to the 'class' attribute
  observer.observe(modal, { attributes: true, attributeFilter: ["class"] });
});

const prayerData = [
  {
    prayer: "God Guide and protect us from harm today",
  },
];
function displayPrayer() {
  const prayerPage = document.getElementById("prayerPage");
  prayerPage.innerHTML = "";
  prayerPage.innerHTML += `
	<p>${prayerData[0].prayer}</p>
	`;
}

async function mediPrayer() {
  try {
    // Fetch the latest service
    const serviceResponse = await fetch("/latest_service");
    const service = await serviceResponse.json();

    // Fetch the meditation list
    const meditationResponse = await fetch(`/meditation`);
    const meditationList = await meditationResponse.json();

    // Find the first meditation that matches the current service ID
    const meditation = meditationList.find((t) => t.service_id === service.id);

    // Check if a meditation was found
    if (meditation) {
      const meditationData = [
        {
          Topic: meditation.topic, // Access the found meditation object
          Text: meditation.text,
          message: meditation.note,
        },
      ];
      return meditationData;
    } else {
      // Return a default message if no meditation is found
      return [
        {
          Topic: "No Meditation Found",
          Text: "",
          message: "No meditation available for this service.",
        },
      ];
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayMeditation() {
  const meditation = await mediPrayer();
  const meditationPage = document.getElementById("meditationPage");
  meditationPage.innerHTML = "";
  meditationPage.innerHTML += `
	<h2 style="color: aliceblue;">${meditation[0].Topic}</h2>
	<h3 style="color: aliceblue;">${meditation[0].Text}</h3>
	<p>${meditation[0].message}</p>
	`;
}

async function getWeddingData() {
  try {
    // Fetch the latest service
    const serviceResponse = await fetch("/latest_service");
    const service = await serviceResponse.json();

    // Fetch the marriage bann list
    const marriageResponse = await fetch(`/marriagebann`);
    const marriageList = await marriageResponse.json();

    // Filter marriage banns that match the current service ID
    const marriages = marriageList.filter((t) => t.service_id === service.id);

    // Check if any marriages were found
    if (marriages.length > 0) {
      // Create the wedding data entries for each marriage bann
      const marriageEntries = marriages.map((marriage, index) => {
        return {
          text: `This is the ${marriage.bann_announcement_count} time of asking`, // Incremental sn starting from 1
          event: `I hereby publish the banns of marriage between <b>${marriage.groom_name}</b> and <b>${marriage.bride_name}</b>. If anyone knows any reason why these persons should not marry each other, he/she should declare it now.`, // Resource description
        };
      });
      return marriageEntries;
    } else {
      // Return a default message if no marriages are found
      return [
        {
          text: "No Marriages Found",
          event: "There are no banns of marriage for this service.",
        },
      ];
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayWedding() {
  const weddingData = await getWeddingData(); // Call the fixed getWeddingData function

  const weddingPage = document.getElementById("weddingPage");
  weddingPage.innerHTML = ""; // Clear any existing content

  weddingData.forEach((weddingItem) => {
    weddingPage.innerHTML += `
		<h3 style="color: aliceblue;">${weddingItem.text}</h3>
		<p>${weddingItem.event}</p>
	  `;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const options = {
    strings: [
      "following Jesus whereever he goes.",
      "Jesus Christ Said:",
      "16 For God so loved the world",
      "that he gave his only begotten Son",
      "that whosoever believeth in him should not perish, but have everlasting life.",
    ],
    typeSpeed: 150,
    backSpeed: 50,
    backDelay: 3000,
    loop: true,
  };

  const multiTextElement = document.querySelector(".multi-text");
  let currentTextIndex = 0;
  let currentText = "";
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
    if (isDeleting) {
      typeSpeed /= 2;
    }
    if (!isDeleting && currentText === fullText) {
      typeSpeed = options.backDelay;
      isDeleting = true;
    } else if (isDeleting && currentText === "") {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % options.strings.length;
    }
    setTimeout(type, typeSpeed);
  }
  type();
});
