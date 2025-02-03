let text = document.getElementById('text');
let building = document.getElementById('building');
let butterfly1 = document.getElementById('butterfly1');
let white = document.getElementById('white');

window.addEventListener('scroll', () =>{
  let value = window.scrollY;

  text.style.marginTop = value * 2.5 + 'px';
  building.style.left = value * 1.5 + 'px';
  butterfly1.style.left = value * -1.5 + 'px';
})