let button = document.querySelector("#Btn")
let generateOTP = document.querySelector("#digit")
let input = document.querySelector("#input")
// let button2 = document.querySelector("reset1")

 setInterval(button1,6000)

 button.addEventListener('click',verifyOTP)

// function resetAction(){
//   document.querySelector("#container").reset();
// }

 function button1(){
  newOTP = Math.floor((Math.random()*9000)+1000)
  generateOTP.innerHTML = newOTP
 }

 function verifyOTP(){
  let action = document.querySelector("#displayAction")
  // let action = document.querySelector(".blink")
  let ToVerify = input.value

  if (newOTP == ToVerify){
    action.innerHTML = "OTP Registered!";
    action.style.color = "green"
  }
  else {
    action.innerHTML = "OTP Rejected!";
    action.style.color = 'red'
  }
 }
   setInterval(function(){
    let action = document.querySelector("#displayAction")
    action.style.opacity = (action.style.opacity == 0 ? 1 : 0);
   }, 500);


