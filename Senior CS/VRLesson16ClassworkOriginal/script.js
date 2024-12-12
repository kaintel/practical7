let scene,camera;
let spiders = [];
window.onload = function(){
  scene = $("scene");
  camera = $("camera")
  for(let i = 0; i < 20;i++){
    let x = random(-75,75);
    let z = random(-75,75);
    let y = random(60,100);
    spiders.push(new Spider(x,y,z));
  }
  
  loop();
}

function loop(){
  for(let spider of spiders){
    spider.drop()
  }
  setTimeout(loop,33);
}