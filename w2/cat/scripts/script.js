let originalItems = [
  { name: 'Cheeto', img: 'cheeto.png', alt: 'A cheeto', description: 'A cheeto that looks like a cheeto', posX: 100, posY: 100, width: 50 },
  { name: 'Orange worm', img: 'woas_orange.png', alt: 'Orange fuzzy worm toy', description: 'Worm OFF the string: What sins will he commit?', posX: 400, posY: 300, width: 100 },
  { name: 'Whole chicken', img: 'chicken_spin.webp', alt: 'A spinning whole chicken', description: 'CHICKEN CHICKEN CHICKEN CHICKEN!!!!', posX: 800, posY: 500, width: 200 },
  { name: 'Bread slice', img: 'bread_spin.webp', alt: 'A spinning slice of bread', description: 'A slice of bread for Yuanyuanmao to lick', posX: 1200, posY: 700, width: 200 },
  { name: 'Disco ball', img: 'disco-ball.gif', alt: 'A spinning disco ball', description: "You can't spell 'disconnected from society' without 'disco'", posX: 1600, posY: 900, width: 200 }
]

originalItems.forEach(item => {
  item.inInventory = false;
});

originalItems.forEach(item => {
  let imgElement = document.createElement('img');
  imgElement.src = '../../assets/images/' + item.img;
  imgElement.alt = item.name;
  imgElement.id = item.img.split('.')[0];
  imgElement.style.position = 'absolute';
  // imgElement.style.left = item.posX + 'px';
  // imgElement.style.top = item.posY + 'px';
  imgElement.style.width = item.width + 'px';
  imgElement.style.left = (Math.random() * 4000) + 'px';
  imgElement.style.top = (Math.random() * 1000) + 'px';
  // imgElement.style.width = (Math.random() * 400 + 200) + 'px';
  // random rotation
  imgElement.style.transform = 'rotate(' + (Math.random() * -180 - 90) + 'deg)';
  document.body.appendChild(imgElement);

  makeDraggable(imgElement.id);
});


// INVENTORY ITEMS --------------------------------
window.onload = function () {
  makeDraggable('green-worm');
}

function makeDraggable(id) {
  var draggableDiv = document.getElementById(id);
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var isInDropZone = false; // Add this line

  draggableDiv.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    // temp z-index lol
    draggableDiv.style.zIndex = 1000;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    draggableDiv.style.top = (draggableDiv.offsetTop - pos2) + "px";
    draggableDiv.style.left = (draggableDiv.offsetLeft - pos1) + "px";

    // check if the inventory is open
    var inventory = document.querySelector('.inventory');
    var openDiv = document.querySelector('.open');
    var checkHeight = isOpen ? (inventory.offsetHeight + openDiv.offsetHeight) : openDiv.offsetHeight;

    // check if the mouse is within the bottom checkHeight px of the screen
    let item = originalItems.find(item => item.img.split('.')[0] === draggableDiv.id);
    if (window.innerHeight - e.clientY <= checkHeight && item) {
      isInDropZone = true;
      inventory.classList.add('drop-zone');
      openDiv.classList.add('drop-zone');
    } else {
      isInDropZone = false;
      inventory.classList.remove('drop-zone');
      openDiv.classList.remove('drop-zone');
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    // reset the z-index
    draggableDiv.style.zIndex = '';

    // if the item is in the inventory, hide the image
    let item = originalItems.find(item => item.img.split('.')[0] === draggableDiv.id);
    if (item && isInDropZone) { // Modify this line
      item.inInventory = true;
      draggableDiv.style.display = 'none';

      // Update the inventory list
      updateInventory();
      document.querySelector('.inventory').classList.remove('drop-zone');
      document.querySelector('.open').classList.remove('drop-zone')
    }
  }
}
// INVENTORY DRAWER --------------------------------
var isOpen = false; // Add this line

document.querySelector('.open').addEventListener('click', function () {
  var inventory = document.querySelector('.inventory');
  var arrow = document.querySelector('.arrow');
  if (!isOpen) {
    inventory.style.transform = 'translateY(0)';
    arrow.classList.add('down');
    isOpen = true; // Add this line
  } else {
    inventory.style.transform = 'translateY(100%)';
    arrow.classList.remove('down');
    isOpen = false; // Add this line
  }
});

function updateInventory() {
  // Get the inventory list element
  let inventoryTable = document.getElementById('inventory-items');

  // Clear the inventory list
  inventoryTable.innerHTML = '';

  // Populate the inventory list with items that are in the inventory
  originalItems.forEach(item => {
    if (item.inInventory) {
      let row = document.createElement('tr');

      let imgCell = document.createElement('td');
      let img = document.createElement('img');
      img.src = '../../assets/images/' + item.img;
      // img.width = 50;
      // check if image's height or width is greater than 50
      if (img.height > img.width) {
        img.width = 50 * (img.width / img.height);
        img.height = 50;
      } else {
        img.height = 50 * (img.height / img.width);
        img.width = 50;
      }
      imgCell.appendChild(img);

      let nameCell = document.createElement('td');
      nameCell.textContent = item.name;

      let descCell = document.createElement('td');
      descCell.textContent = item.description;

      row.appendChild(imgCell);
      row.appendChild(nameCell);
      row.appendChild(descCell);

      inventoryTable.appendChild(row);
    }
  });
}

// AUTO SCROLL TO BOTTOM RIGHT --------------------------------
  // window.onload = function () {
  //   window.scrollTo(document.body.scrollWidth, document.body.scrollHeight);
  // }
  // ANCHOR/BOOKMARK LINKS --------------------------------
  window.addEventListener('load', function () {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var id = this.getAttribute('href').substring(1);
        scrollToElement(id);
      });
    });
  });


  function scrollToElement(id) {
    var element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        left: element.offsetLeft,
        behavior: 'smooth'
      });
    }
  }

  // NAVIGATOR --------------------------------------------------------
  let increment = 0.2;
  let scrollInterval;

  function startScroll(direction) {
    if (scrollInterval) {
      clearInterval(scrollInterval);
    }

    scrollInterval = setInterval(() => {
      let scrollOptions;

      switch (direction) {
        case 'up':
          scrollOptions = { top: -window.innerHeight * increment, left: 0 };
          break;
        case 'down':
          scrollOptions = { top: window.innerHeight * increment, left: 0 };
          break;
        case 'left':
          scrollOptions = { top: 0, left: -window.innerWidth * increment };
          break;
        case 'right':
          scrollOptions = { top: 0, left: window.innerWidth * increment };
          break;
      }

      window.scrollBy(scrollOptions);
    }, 100);
  }

  function stopScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  }

  ['up', 'down', 'left', 'right'].forEach(direction => {
    const button = document.querySelector(`.navigator .${direction}`);

    button.addEventListener('mousedown', () => startScroll(direction));
    button.addEventListener('mouseup', stopScroll);
    button.addEventListener('mouseleave', stopScroll);
  });
  // Add this in your script tag
  document.querySelector('.navigator .center').addEventListener('click', function () {
    const centerX = (document.documentElement.scrollWidth - window.innerWidth) / 2;
    const centerY = (document.documentElement.scrollHeight - window.innerHeight) / 2;

    window.scrollTo({
      top: centerY,
      left: centerX,
      behavior: 'smooth'
    });
  });

  // CAT SOUNDS!
  var dini = document.querySelector(".dini");
var diniSound = document.querySelector("audio[data-key=\"dini-sound\"]");
var yunnie = document.querySelector(".yy");
var yunnieSound = document.querySelector("audio[data-key=\"yy-sound\"]");
dini.addEventListener("click", function (event) {
  diniSound.play();
}, false);
yunnie.addEventListener("click", function (event) {
  yunnieSound.play();
}, false);