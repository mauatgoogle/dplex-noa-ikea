/**
* Detect OS & browsers
*/
/* Add class for mac */
if(navigator.appVersion.indexOf("Win")!=-1) {
    jQuery('body').addClass('window-os');
}
if(navigator.platform.toUpperCase().indexOf('MAC')>=0) {
    jQuery('body').addClass('mac-os');
}
if(navigator.appVersion.indexOf("Linux")!=-1) {
    jQuery('body').addClass('linux-os');
}
/* Add class for all ie version */
// var trident = !!navigator.userAgent.match(/Trident\/7.0/);
// var net = !!navigator.userAgent.match(/.NET4.0E/);
// var IE11 = trident && net;
// var IEold = ( navigator.userAgent.match(/MSIE/i) ? true : false );
// if(IE11 || IEold){
//     jQuery('body').addClass('ie');
// }
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
        jQuery('body').addClass('chrome');
    } else {
        jQuery('body').addClass('safari');
    }
}
var FF = !(window.mozInnerScreenX == null);
if(FF) {
    jQuery('body').addClass('fire-fox'); 
} else { 
    //jQuery('body').addClass('not-fire-fox');
}
/* End */
