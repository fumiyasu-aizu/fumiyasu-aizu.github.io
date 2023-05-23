var typeWidth = 340;

if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 ||    navigator.userAgent.indexOf('Android') > 0 && userAgent.indexOf('Mobile') > 0) {
  typeWidth = 320;
}
/*
if (screen.availWidth >= 1200) {
  typeWidth = 340;
}
*/
function startKuku() {
  if (typeWidth == 320) {
     location.href = './xxKukuW320.html';
  } else {
     location.href = './xxKukuW340.html';
  }
}

