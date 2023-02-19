const pacArray = [
    ['src/img/PacMan1.png', 'src/img/PacMan2.png'],
    ['src/img/PacMan3.png', 'src/img/PacMan4.png']
];
var focus = 0;
var pacMen = [];
function setToRandom(scale) {
    return {
          x: Math.random() * scale, y: Math.random() * scale,
    };
}

function makePac() {
    let velocity = setToRandom(13); // {x:?, y:?}
    let position = setToRandom(800);
  let direction = 0;
    let game = document.getElementById('game');
    let img = document.createElement('img');
    img.style.position = 'absolute';
    // initial source for display
    img.src = 'src/img/PacMan1.png';
    img.style.width = 100;
    img.style.left = position.x + "px";
    img.style.top = position.y + "px";
    game.appendChild(img);
    return {
          position, velocity, img, direction
    };
}

// update the board
function update() {
  focus = (focus + 1) % 2;
    pacMen.forEach((item) => {
          checkCollisions(item);
      item.img.src = pacArray[item.direction][focus];
          item.position.x += item.velocity.x;
          item.position.y += item.velocity.y;
          item.img.style.left = item.position.x;
          item.img.style.top = item.position.y;
    });
    setTimeout(update, 100);
}

// randomizes the location of the pacmen
function randomize() {
  focus = (focus + 1) % 2;
    pacMen.forEach((item) => {
          checkCollisions(item);
      item.img.src = pacArray[item.direction][focus];
          item.position.x += item.velocity.x*Math.random() * 100;
          item.position.y += item.velocity.y*Math.random() * 100;
          item.img.style.left = item.position.x;
          item.img.style.top = item.position.y;
    });
    setTimeout(update, 100);
    updateStats();
}

// generate
function generate() {
  var inputVal = document.getElementById("genQTY").value;
  console.log(inputVal);
  update();
  for (let i = 0; i < inputVal; i++) {
    makeOne();
    setTimeout(function() {
      update();
    }, 2000);
  };
  updateStats()
};

function checkCollisions(item) {
  let edgeW = window.innerWidth - item.img.width; let edgeH = window.innerHeight -item.img.width;
  if (item.position.x >= edgeW){item.velocity.x = item.velocity.x * -1; item.direction = 1;}
  if (item.position.x <=0){item.velocity.x = item.velocity.x * -1; item.direction = 0;}
  if (item.position.y >= edgeH || item.position.y <=0){item.velocity.y = item.velocity.y * -1;}
}

function makeOne() {
pacMen.push(makePac()); 
updateStats();
}

function freeze() {
  // pacMen = [];
  let game = document.getElementById('game');
  var child = document.getElementById("img");
  console.log(game);
  game.removeChild(child);
  console.log(game);
  update();
  updateStats();
}

function updateStats(){
  let game = document.getElementById('game');
  let spawned = game.children.length;
  // let speed = game.children.velocity;
  var spawnDiv = document.getElementById("spawned");
  // console.log(speed)
  spawnDiv.innerHTML = "Spawned: " + (spawned-6);
  // speedDiv.innerHTML = "Speed: " + (speed);
};

function test(){
  let parent = document.getElementById('game');
  let child = document.createElement('img');
  parent.removeChild(child);
  console.log(parent)
}