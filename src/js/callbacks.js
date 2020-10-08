var SiteCallbacks = {

  /*** SPLASH SECTION ***/
  "splash": function () {
    setTimeout(function () {
      GDApp.open('start');
    }, 2500);
    $('body').addClass('scroll-lock');
  },

  /*** START SECTION ***/
  "start": function () {
    $('body').removeClass('scroll-lock');
    Background.play('start')
  },
  "start:subheadline--2": function () {
    Background.play('zoomout');
    GoogleDemoApp.instance.enableScrolling = true;
    setTimeout(function () {
      $('#slideButton, #slideButtonEnd').removeClass('animate');
    }, 2000);

    if ($('body').hasClass('mobile')) {
      $('.platform').on('click', function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
        } else {
          $('.platform').removeClass('active');
          $(this).addClass('active');
        }
      });
    }
  },
  "start:subheadline--2 subopenmode": function () {
    Background.play('open');
  },

  /*** STAGES INTRO SECTION ***/
  /* -------------- Intro 0 -------------- */
  "stages.intro.0": function () {
    updateStageBtn(0, 0);
    $('#scrollText').addClass('active');
  },
  "[AFTER] stages.intro.0": function () {
    Background.play('center');
  },

  /* -------------- Intro 1 -------------- */
  "[BEFORE] stages.intro.1": function () {
    Background.play('zoomin');

  },
  "stages.intro.1": function () {
    updateStageBtn(0, 1);
    $('#scrollText').removeClass('active');
    setTimeout(function(){ GoogleDemoApp.instance.nextSection(); },3*1000);
  },

  /* -------------- Intro 2 -------------- */
  "stages.intro.2": function () {
    updateStageBtn(0, 2);
    setTimeout(function(){ GoogleDemoApp.instance.nextSection(); },3*1000);
  },


  /*** STAGES GEOMAGICAL SECTION ***/
  /* -------------- Geomagical 0 -------------- */
  "[BEFORE] stages.geomagical.0": function () {
    // Background.play('geostart');
  },
  "stages.geomagical.0": function () {
    updateStageBtn(1, 0);
  },
  "[AFTER] stages.geomagical.0": function () {
    // Background.play('geostart');
    // setTimeout(function(){
    // Background.play('geopano');
    // },1000)
  },

  /* -------------- Geomagical 1 -------------- */
  "stages.geomagical.1": function () {
    Background.play('geostart');
    updateStageBtn(1, 1);
    $('#stageNavigation').addClass('stage-nav--white');
    $('.privacy').addClass('privacy--white');
  },
  "[AFTER] stages.geomagical.1": function () {
    $('.step--1 .deep-dive__list li .radio-check').removeClass('checked');
    // Background.play('geostart');
  },
  "[BEFORE] stages.geomagical.1:subclose": function () {
    Background.play('geostart');
  },
  "[AFTER] stages.geomagical.1:subclose": function () {
    GoogleDemoApp.instance.open('NEXT');
  },
  "[BEFORE] stages.geomagical.1:sublines": function () {
    $('.step--1 .deep-dive__list li .radio-check').first().addClass('checked');
    // for (var p = 1; p <= 5; p++) setTimeout(function (p) {
    //   Background.play('geophoto' + p)
    // }, 200 * p + 50, p);
    //
      Background.play('geophoto');
    // Tooltips
    $('.tooltip').removeClass('active');
    $('#tooltipLine').addClass('active');
    setTimeout(function () {
      $('#tooltipLine').addClass('animate');
    }, 100);
    $('#tooltipLine .pulsar-btn').hover(function (e) {
      e.preventDefault();
      if ($('#tooltipLine').hasClass('tooltip--detail')) {
        $('#tooltipLine').removeClass('tooltip--detail');
        $('#tooltipLine .material-icons').html('add');
      } else {
        $('#tooltipLine').addClass('tooltip--detail');
        $('#tooltipLine .material-icons').html('remove');
      }
    });
  },
  "[BEFORE] stages.geomagical.1:subparalax": function () {
    $('.step--1 .deep-dive__list li .radio-check').last().addClass('checked');
    Background.play('geoseam');

    // Tooltips
    $('.tooltip').removeClass('active');
    $('#tooltipParallax').addClass('active');
    setTimeout(function () {
      $('#tooltipParallax').addClass('animate');
    }, 100);
    $('#tooltipParallax .pulsar-btn').hover(function (e) {
      e.preventDefault();
      if ($('#tooltipParallax').hasClass('tooltip--detail')) {
        $('#tooltipParallax').removeClass('tooltip--detail');
        $('#tooltipParallax .material-icons').html('add');
      } else {
        $('#tooltipParallax').addClass('tooltip--detail');
        $('#tooltipParallax .material-icons').html('remove');
      }
    });
  },

  /* -------------- Geomagical 2 -------------- */
  "[BEFORE] stages.geomagical.2": function () {
    $('.step--2 .deep-dive__list li .radio-check').removeClass('checked');
    Background.play('geostart');
  },
  "stages.geomagical.2": function () {
    updateStageBtn(1, 2);
    $('#stageNavigation').addClass('stage-nav--white');
    $('.privacy').addClass('privacy--white');
  },
  "[BEFORE] stages.geomagical.2:subclose": function () {
    Background.play('geostart');
    // $('#stagegeomagical .step--2 .card__actions').removeClass('deep-dive--active');
    // $('#stagegeomagical .step--2 .card__body .deep-dive__content').slideUp('slow');
  },
  "[AFTER] stages.geomagical.2:subclose": function () {
    GoogleDemoApp.instance.open('NEXT');
  },
  "[BEFORE] stages.geomagical.2:subdepth": function () {
    $('.step--2 .deep-dive__list li .radio-check').first().addClass('checked');
    Background.play('geodepth');

    // Tooltips
    $('.tooltip').removeClass('active');
    $('#tooltipDepth').addClass('active');
    setTimeout(function () {
      $('#tooltipDepth').addClass('animate');
    }, 100);
    $('#tooltipDepth .pulsar-btn').hover(function (e) {
      e.preventDefault();
      if ($('#tooltipDepth').hasClass('tooltip--detail')) {
        $('#tooltipDepth').removeClass('tooltip--detail');
        $('#tooltipDepth .material-icons').html('add');
      } else {
        $('#tooltipDepth').addClass('tooltip--detail');
        $('#tooltipDepth .material-icons').html('remove');
      }
    });
  },
  "[BEFORE] stages.geomagical.2:subsemantic": function () {
    $('.step--2 .deep-dive__list li .radio-check').last().addClass('checked');
    Background.play('geosemantic');

    // Tooltips
    $('.tooltip').removeClass('active');
    $('#tooltipSegmentation').addClass('active');
    setTimeout(function () {
      $('#tooltipSegmentation').addClass('animate');
    }, 100);
    $('#tooltipSegmentation .pulsar-btn').hover(function (e) {
      e.preventDefault();
      if ($('#tooltipSegmentation').hasClass('tooltip--detail')) {
        $('#tooltipSegmentation').removeClass('tooltip--detail');
        $('#tooltipSegmentation .material-icons').html('add');
      } else {
        $('#tooltipSegmentation').addClass('tooltip--detail');
        $('#tooltipSegmentation .material-icons').html('remove');
      }
    });
  },

  /* -------------- Geomagical 3 -------------- */
  "[BEFORE] stages.geomagical.3": function () {
    $('.step--3 .deep-dive__list li .radio-check').removeClass('checked');
    Background.play('geostart');
  },
  "stages.geomagical.3": function () {
    updateStageBtn(1, 3);
    $('#stageNavigation').addClass('stage-nav--white');
    $('.privacy').addClass('privacy--white');
  },
  "stages.geomagical.3:subfurniture": function () {
    $('.step--3 .deep-dive__list li .radio-check').first().addClass('checked');
    // $('.step--3 .deep-dive__list li .radio-check').last().addClass('checked');
    Background.play('geofurniture');
    // Background.sprites.furniture.rewind();
    // Background.sprites.furniture.play();

    // Tooltips
    $('.tooltip').removeClass('active');
    $('#tooltipRealistic').addClass('active');
    setTimeout(function () {
      $('#tooltipRealistic').addClass('animate');
    }, 100);
    $('#tooltipRealistic .pulsar-btn').hover( function (e) {
      e.preventDefault();
      if ($('#tooltipRealistic').hasClass('tooltip--detail')) {
        $('#tooltipRealistic').removeClass('tooltip--detail');
        $('#tooltipRealistic .material-icons').html('add');
      } else {
        $('#tooltipRealistic').addClass('tooltip--detail');
        $('#tooltipRealistic .material-icons').html('remove');
      }
    });

    setTimeout(function(){ GoogleDemoApp.instance.nextSection(); },3*1000);
  },
  // "stages.geomagical.3:subresult":
  //       function(){
  //         Background.play('georesult');
  //       },
  // "[BEFORE] stages.geomagical.2:subclose":
  //       function(){
  //           Background.play('geostart');
  //       },
  "[AFTER] stages.geomagical.3:subclose": function () {
    GoogleDemoApp.instance.open('NEXT');
  },

  /* -------------- Geomagical 4 -------------- */
  "stages.geomagical.4": function () {
    $('#stageNavigation').removeClass('stage-nav--white');
    $('.privacy').removeClass('privacy--white');
    Background.play('phonein');
    setTimeout(function () {
      Background.play('furniturein');
    }, 300);
    updateStageBtn(1, 4);

    setTimeout(function(){ GoogleDemoApp.instance.nextSection(); },5*1000);
  },
  "stages.geomagical.4:phoneout": function () {
    Background.play('furnitureout');
    setTimeout(function () {
      Background.play('phoneout');
    }, 400);
    setTimeout(function () {
      Background.play('georesult');
    }, 1500);
    setTimeout(function () {
      GoogleDemoApp.instance.nextSection()
    }, 2500);
    //updateStageBtn(1, 4);
  },

  /*** STAGES RECOMENDATIONS SECTION ***/
  "stages.recommendations.0": function () {
    GoogleDemoApp.instance.chairIndex = 0;
    Background.play('geoend');
    setTimeout(function () {
      Background.play('geotransition');
    }, 1000);
    setTimeout(function () {
      Background.play('geofade');
    }, 2400);
    setTimeout(function () {
      Background.play('dining');
    }, 3200);
    updateStageBtn(2, 0);
  },
  "stages.recommendations.1": function () {
    updateStageBtn(2, 1);
  },
  "stages.recommendations.2": function () {
    updateStageBtn(2, 2);
  },
  "stages.recommendations.3": function () {
    updateStageBtn(2, 3);
  },

  /*** STAGES RECAP SECTION ***/
  "[BEFORE] stages.recap.0":function(){
    Background.play('furniturefade');
    setTimeout(function(){ Background.play('diagonalstart'); },300);
    setTimeout(function(){ Background.play('diagonalplay'); },600);
    setTimeout(function(){ Background.play('diagonalfade'); },1200);
    setTimeout(function(){ Background.play('office'); },1500);
    // document.getElementById('backgroundCanvas').style.display = "none";
  },
  "stages.recap.0":function(){
    updateStageBtn(3,0);
  },

  "[AFTER] stages.recap.1":function(){
    Background.play('final');
  },

  /*** STAGES MOBILE ***/
  "stagesmobile.intromobile": function () {
    $('#mobileHouse').removeClass('fadeOut');
  },

  "[BEFORE] stagesmobile.geomagicalmobile": function () {
    $('#mobileHouse').addClass('fadeOut');
  },

  "[BEFORE] stagesmobile.recommendationsmobile": function () {
    $('#mobileHouse').addClass('fadeOut');
  },

  "[BEFORE] stagesmobile.recapmobile": function () {
    $('#mobileHouse').addClass('fadeOut');
  }
};
