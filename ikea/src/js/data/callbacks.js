var timers = {};
var SiteCallbacks = {

  /*** SPLASH SECTION ***/
  "splash": function () {

    GoogleDemoApp.instance.blockKeysAndScroll(true);
    $('body').addClass('scroll-lock');
  },

  /*** START SECTION ***/
  "start": function () {
    $('body').removeClass('scroll-lock');
    Background.play('start')
  },
  "start:subheadline--2": function () {
    Background.play('zoomout');
    resetButtonPos();
    GoogleDemoApp.instance.enableScrolling = true;
    setTimeout(function () {
      $('#slideButton, #slideButtonEnd').removeClass('animate');
    }, 2000);
    $('#scrollText').removeClass('active scroll--only-text scroll--white');

  },
  "[AFTER] start:subheadline--2": function () {
    setTimeout(function(){GoogleDemoApp.instance.blockKeysAndScroll(false);},2000);
  },
  "start:subheadline--2 subopenmode": function () {
    Background.play('open');
    AnimateDrag();
    GoogleDemoApp.instance.timeOpen('stages.intro.0',0.5);
        GoogleDemoApp.instance.blockKeysAndScroll(true);
    // GoogleDemoApp.instance.timeNextSection(0.5);

  },
  "[AFTER] start:subheadline--2 subopenmode": function () {

    // GoogleDemoApp.instance.open('stages.intro.0');
  },

  /*** STAGES INTRO SECTION ***/
  /* -------------- Intro 0 -------------- */
  "stages.intro.0": function () {
    // setTimeout(function(){GoogleDemoApp.instance.blockKeysAndScroll(false);},2000);

    $('#stageNavigation').removeClass('fadeOut');
    // GoogleDemoApp.instance.blockKeysAndScroll(true);
    GoogleDemoApp.instance.timeNextSection(5);
    updateStageBtn(0, 0);
    $('#scrollText').addClass('active');
  },
  "[AFTER] stages.intro.0": function () {
  resetAllTooltips();
    Background.play('center');
  },

  /* -------------- Intro 1 -------------- */
  "[BEFORE] stages.intro.1": function () {
    Background.play('zoomin');

  },
  "stages.intro.1": function () {
    updateStageBtn(0, 1);
    //$('#scrollText').removeClass('active');
    $('#scrollText').addClass('scroll--only-text');
    GoogleDemoApp.instance.timeNextSection(5);
  },

  /* -------------- Intro 2 -------------- */
  "stages.intro.2": function () {
    updateStageBtn(0, 2);
    GoogleDemoApp.instance.timeNextSection(5);
  },


  /*** STAGES GEOMAGICAL SECTION ***/
  /* -------------- Geomagical 0 -------------- */
  "[BEFORE] stages.geomagical.0": function () {
    // Background.play('geostart');
  },
  "stages.geomagical.0": function () {
    updateStageBtn(1, 0);
    $('.privacy-desktop').removeClass('privacy--white');
    $('#scrollText').removeClass('scroll--white');
    GoogleDemoApp.instance.blockKeysAndScroll(false);
    resetAllTooltips();
  },
  "[AFTER] stages.geomagical.0": function () {
    //$('#scrollText').hide();// FIXME: Escondo el texto porque tapa los botones de los steps

  },

  /* -------------- Geomagical 1 -------------- */
  "stages.geomagical.1": function () {
    Background.play('geostart');
    updateStageBtn(1, 1);
    $('#stageNavigation').addClass('stage-nav--white');
    $('.privacy-desktop').addClass('privacy--white');
    $('#scrollText').addClass('scroll--white');
    resetAllTooltips();
  },
  "[AFTER] stages.geomagical.1": function () {
    $('.step--1 .deep-dive__list li .radio-check').removeClass('checked');
  },
  "[BEFORE] stages.geomagical.1:subclose": function () {
    Background.play('geostart');
  },
  "[AFTER] stages.geomagical.1:subclose": function () {
    GoogleDemoApp.instance.timeOpen('stages.geomagical.2',0.5);
  },
  "[BEFORE] stages.geomagical.1:sublines": function () {
    $('.step--1 .deep-dive__list li .radio-check').first().addClass('checked');
    $('.privacy-desktop').removeClass('privacy--white');
    $('#scrollText').removeClass('scroll--white');
    Background.play('geophoto');
    // Tooltips
    resetTooltip('#tooltipLine');
  },
  "[BEFORE] stages.geomagical.1:subparalax": function () {
    $('.step--1 .deep-dive__list li .radio-check').last().addClass('checked');
    $('.privacy-desktop').addClass('privacy--white');
    $('#scrollText').addClass('scroll--white');
    Background.play('geoseam');
    resetTooltip('#tooltipLine',false);
    // Tooltips
    resetTooltip('#tooltipParallax');
  },

  /* -------------- Geomagical 2 -------------- */
  "[BEFORE] stages.geomagical.2": function () {
    $('.step--2 .deep-dive__list li .radio-check').removeClass('checked');
    Background.play('geostart');
  },
  "stages.geomagical.2": function () {
    updateStageBtn(1, 2);
    $('#stageNavigation').addClass('stage-nav--white');
    $('.privacy-desktop').addClass('privacy--white');
    $('#scrollText').addClass('scroll--white');
    resetAllTooltips();
  },
  "[BEFORE] stages.geomagical.2:subclose": function () {
    Background.play('geostart');
  },
  "[AFTER] stages.geomagical.2:subclose": function () {
    GoogleDemoApp.instance.timeOpen('stages.geomagical.3',0.5);
  },
  "[BEFORE] stages.geomagical.2:subdepth": function () {
    $('.step--2 .deep-dive__list li .radio-check').first().addClass('checked');
    Background.play('geodepth');
    // Tooltips
    resetTooltip('#tooltipDepth');
  },

  "[BEFORE] stages.geomagical.2:subsemantic": function () {
    $('.step--2 .deep-dive__list li .radio-check').last().addClass('checked');
    Background.play('geosemantic');
    // Tooltips
    resetTooltip('#tooltipDepth',false);
    resetTooltip('#tooltipSegmentation');
  },

  /* -------------- Geomagical 3 -------------- */
  "[BEFORE] stages.geomagical.3": function () {
    $('.step--3 .deep-dive__list li .radio-check').removeClass('checked');
    Background.play('geostart');
  },
  "stages.geomagical.3": function () {
    updateStageBtn(1, 3);
    $('#stageNavigation').addClass('stage-nav--white');
    $('.privacy-desktop').addClass('privacy--white');
    $('#scrollText').addClass('scroll--white');

    resetAllTooltips();

  },
  "[BEFORE] stages.geomagical.3:subfurniture": function () {
    $('#geomagicalVideo').element.pause();
    $('#geomagicalVideo').element.currentTime = 0;
    $('#geomagicalVideo').addClass('active');
  },
  "stages.geomagical.3:subfurniture": function () {
    $('.step--3 .deep-dive__list li .radio-check').first().addClass('checked');
    $('#geomagicalVideo').addClass('animate');
    setTimeout(function(){ $('#geomagicalVideo').element.play(); }, 800);
    Background.playDelay('geofurniture', 0.8+14);
    setTimeout(function(){ $('#geomagicalVideo').removeClass('animate'); }, 800+15*1000);
    // Tooltips
    resetTooltip('#tooltipRealistic');
  },
  "[AFTER] stages.geomagical.3:subclose": function () {
  GoogleDemoApp.instance.blockKeysAndScroll(true);
    resetTooltip('#tooltipRealistic',false);
    Background.clearQueue();
    Background.play('geofurniture');
    $('#geomagicalVideo').removeClass('animate');
      GoogleDemoApp.instance.timeOpen('stages.geomagical.4',0.5);
  },

  /* -------------- Geomagical 4 -------------- */
  "[BEFORE] stages.geomagical.4": function () {

    $('.tooltip').removeClass('animate');
  },
  "stages.geomagical.4": function () {
  $('#stageNavigation').removeClass('fadeOut');
    $('#stageNavigation').removeClass('stage-nav--white');
    $('.privacy-desktop').removeClass('privacy--white');
    $('#scrollText').removeClass('scroll--white');
    Background.play('phonein');
    Background.playDelay('furniturein', 0.3);
    updateStageBtn(1, 4);
    GoogleDemoApp.instance.timeNextSection(5);

    resetAllTooltips();
  },
  "stages.geomagical.4:phoneout": function () {

    Background.clearQueue();
    Background.play('furnitureout');
    Background.playDelay('phoneout', 0.4);
    Background.playDelay('georesult', 1.5);
    GoogleDemoApp.instance.timeNextSection(2.5);
  },
  "[BEFORE] stages.geomagical.4:change": function () {
    Background.clearQueue();
    Background.play('geoend');
    var wait = 1.5;
    Background.playDelay('geotransition', 1+wait);
    Background.playDelay('geofade', 2.4+wait);
    GoogleDemoApp.instance.timeNextSection(3.9);
  },

  /*** STAGES RECOMENDATIONS SECTION ***/
  "stages.recommendations.0": function () {
    Background.clearQueue();
    resetAllTooltips();
    $('#stageNavigation').removeClass('fadeOut');
  },
  "[AFTER] stages.recommendations.0": function () {

    GoogleDemoApp.instance.blockKeysAndScroll(false);
    GoogleDemoApp.instance.chairIndex = 0;
    Background.play('dining');
    updateStageBtn(2, 0);
  },
  "stages.recommendations.1": function () {
    updateStageBtn(2, 1);
  },
  "stages.recommendations.2": function () {
    Background.play('dining_option3_glow');
    updateStageBtn(2, 2);
    // Tooltips
    GoogleDemoApp.instance.switchedChairs = false;
    resetTooltip('#tooltipVisionSearch',false);


  },

  /*** STAGES RECAP SECTION ***/
  "[BEFORE] stages.recap.0":function(){

    GoogleDemoApp.instance.blockKeysAndScroll(true);
    $('#stageNavigation').removeClass('fadeOut');
    Background.play('furniturefade');
    Background.playDelay('diagonalstart',0.3);
    Background.playDelay('diagonalplay',0.6);
    Background.playDelay('diagonalfade',1.2);
    Background.playDelay('office',1.5);
    setTimeout(function(){GoogleDemoApp.instance.blockKeysAndScroll(false);},3000);
  },
  "stages.recap.0":function(){
    updateStageBtn(3,0);
    resetAllTooltips();
  },

  "[BEFORE] stages.recap.1":function(){
    $('#stageNavigation').addClass('fadeOut');
  },
  "stages.recap.1":function(){
    Background.clearQueue();
    Background.play('lastscreen');
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
