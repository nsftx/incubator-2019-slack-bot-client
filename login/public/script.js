function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    
xhr.open('POST', 'http://localhost:3000/login');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//xhr.setRequestHeader('Access-Control-Allow-Origin');
xhr.onload = function() {
  console.log('Signed in as: ' + xhr.responseText);
  if(xhr.responseText=="postoji"){
 
  document.getElementById("right").style.display="none";
  document.getElementById("left").style.display="none";
  document.getElementById("profile").style.display="block";
  document.getElementById("email").innerHTML=profile.getEmail();
  document.getElementById("ime").innerHTML=profile.getName();
  document.getElementById("pic").src=profile.getImageUrl();
  }
  else{
    alert("Ne postojite u bazi,žao nam je!");
  }
};
xhr.send(''+ id_token);
}
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.getElementById("right").style.display="block";
        document.getElementById("left").style.display="block";
        document.getElementById("profile").style.display="none";
    });
  }