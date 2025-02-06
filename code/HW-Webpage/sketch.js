let text = document.getElementById('text');
let building = document.getElementById('building');
let butterfly1 = document.getElementById('butterfly1');
let white = document.getElementById('white');
let Green = document.getElementById('Green');
let SpaceFor = document.getElementById('SpaceFor');
let Everyone = document.getElementById('Everyone');
let Picture2 = document.getElementById('Picture2');

window.addEventListener('scroll', () =>{
  let value = window.scrollY;

  text.style.marginTop = value * 2.5 + 'px';
  building.style.left = value * 1.5 + 'px';
  butterfly1.style.left = value * -1.5 + 'px';
  Picture2.style.left = value * 0.035 + 'px';

  if(window.scrollY>350){
    text.classList.add("hidden");
  }else{
    text.classList.remove("hidden");
  }

})


