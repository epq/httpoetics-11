const container = document.querySelector('.container');
const options = ['home', 'news', 'contact', 'about'];
let minH = 80;
let minW = 50;
let maxH = (window.innerHeight - 80);
let maxW = (window.innerWidth - 50);

    let newH = (Math.floor(Math.random() * (maxH - minH + 1)) + minH);
    let newW = (Math.floor(Math.random() * (maxW - minW + 1)) + minW);

container.addEventListener('mousemove', function(e) {
  if (options.includes(e.target.id)) {
    const target = e.target;
    target.style.top = (Math.floor(Math.random() * (maxH - minH + 1)) + minH)+ 'px';
    target.style.left = (Math.floor(Math.random() * (maxW - minW + 1)) + minW)+ 'px';
    target.style.position = 'absolute';
    console.log(target.style.top, target.style.left);
  }
})

container.addEventListener('touchstart', function(e) {
  if (options.includes(e.target.id)) {
    const target = e.target;
    target.style.top = (Math.floor(Math.random() * (maxH - minH + 1)) + minH)+ 'px';
    target.style.left = (Math.floor(Math.random() * (maxW - minW + 1)) + minW)+ 'px';
    target.style.position = 'absolute';    
  }
})

container.addEventListener('touchmove', function(e) {
  if (options.includes(e.target.id)) {
    const target = e.target;
    target.style.top = (Math.floor(Math.random() * (maxH - minH + 1)) + minH)+ 'px';
    target.style.left = (Math.floor(Math.random() * (maxW - minW + 1)) + minW)+ 'px';
    target.style.position = 'absolute';    
  }
})

container.addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    const target = event.target;
    target.style.top = (Math.floor(Math.random() * (maxH - minH + 1)) + minH)+ 'px';
    target.style.left = (Math.floor(Math.random() * (maxW - minW + 1)) + minW)+ 'px';
    target.style.position = 'absolute';    
  }
})

container.addEventListener('keyup', function(event) {
  if (event.target.tagName === 'A') {
    if (event.key === "Enter") {
    const target = event.target; 
    alert('Ohohoho!')
    console.log('Ohohohohoho!')
    }
  }
})

function getRandomPos() {
    let newH = (Math.floor(Math.random() * (maxH - minH + 1)) + minH);
    let newW = (Math.floor(Math.random() * (maxW - minW + 1)) + minW);
  console.log(newW, newH);
}
