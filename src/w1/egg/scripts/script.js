window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

let prevScrollpos = window.pageYOffset;
let show = "no";
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("hammy").style.backgroundColor = "white";
    if (show === "yes") {
      show = "no";
    }
  }
  prevScrollpos = currentScrollPos;
  let bottom = document.documentElement.scrollHeight;
  let almostBottom = bottom * 0.9;
  if (window.innerHeight + window.scrollY >= almostBottom) {
  }
  if (window.innerHeight + window.scrollY >= bottom) {
    document.getElementById("hammy").style.backgroundColor = "blue";
    show = "yes";
  }

  if (show = "yes") {
    var gerbil = document.querySelector('.gerbil');
    var scrollTicks = 0;
    var maxScrollTicks = 20;  // Adjust this value as needed
    var scrollTickHeight = 5;  // Adjust this value as needed

    function scrollDown() {
      scrollTicks = Math.min(scrollTicks + 1, maxScrollTicks);
      updateGerbilPosition();
    }

    function scrollUp() {
      scrollTicks = Math.max(scrollTicks - 1, 0);
      updateGerbilPosition();
    }

    function updateGerbilPosition() {
      var translateY = 100 - (scrollTicks * scrollTickHeight);
      gerbil.style.transform = `translateY(${translateY}%)`;
    }

    window.addEventListener('wheel', function (e) {
      if (e.deltaY > 0) {  // "downward" scroll
        scrollDown();
      } else if (e.deltaY < 0) {  // "upward" scroll
        scrollUp();
      }
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        scrollDown();
      } else if (e.key === 'ArrowUp') {
        scrollUp();
      }
    });

    var lastTouchY = 0;
    var touchSensitivity = 20;  // Adjust this value as needed
    var atBottom = false;

    window.addEventListener('touchstart', function (e) {
      lastTouchY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', function (e) {
      var currentTouchY = e.touches[0].clientY;
      var touchDiff = currentTouchY - lastTouchY;

      if (touchDiff > touchSensitivity && !atBottom) {  // "upward" scroll
        scrollUp();
        lastTouchY = currentTouchY;  // Update the last touch position
      } else if (touchDiff < -touchSensitivity) {  // "downward" scroll
        scrollDown();
        lastTouchY = currentTouchY;  // Update the last touch position
      }

      // Check if we've reached the bottom
      if (scrollTicks >= maxScrollTicks) {
        atBottom = true;
      } else {
        atBottom = false;
      }
    });
  }
};