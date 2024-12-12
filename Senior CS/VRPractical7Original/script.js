let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, gems = [], ball, aliens = [];
let health = 100, gems_collected = 0, t = 30;

window.onload = function(){
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  ball = new Ball();
  
  for(let z = 0; z < 240; z+= 16.1){
    new Tunnel(0,0,z);
  }
  for(let z = 5; z < 240; z+= 25){
    let x = rnd(-2,2);
    let pz = z + rnd(-2, 2);
    gems.push(new Gem(x,1,-pz));
  }
  for(let z = 240; z > 20; z -= 15){
    let x = rnd(-3,3);
    let pz = z + rnd(-5, 5);
    aliens.push(new Alien(x,0.1,-pz));
  }
  /* Challenge 2
     Shoot the ball when the user presses the space bar.
     Hint: Look at the class. Investigate the key value returned
     when the space bar is pressed.
  */
     window.addEventListener("keydown",function(e){
      console.log(e.key)
      let x = camera.object3D.position.x;
      let z = camera.object3D.position.z;
      if(e.key == " "){
        ball.shoot();
        
    
      }
  })
  
  
  loop();
  countdown();
  
}

function countdown(){
  if(t > 0){
    t--;
  }else{
    health -= 5;
  }
  
  if(gems_collected < 10 && health > 0){
    setTimeout( countdown, 1000);
  }else{
    results();
  }
}

function loop(){
  ball.move();

  /* Challenge 3: Working with the Alien
     1) Make all the Aliens walk
     2) If the ball collides with an Alien ( use a threshold of 1)
           - Set the fire variable of the ball to false
           - Alien dies. Hint: Look at the class
     3) If we collide with the Alien (use a threshold of 2)
     then the alien will attack.  Hint: Look a the class.  
  */
     for(let alien of aliens){
      alien.walk();
     let d1 = distance(ball.obj, alien.obj);
       let d2 = distance(camera, alien.obj);
       
          if(d1 < 1){
  ball.fire=false;
      alien.die();
    }
    
          if(d2 < 2){
      alien.attack();
    }
    }
  

  /* Challenge 4
     Make all the gems float. Hint: Look a the class.
     
  */
for (let gem of gems) {
  gem.float();
}
  // Challenge 5 & 6 are in the Gem class 

  document.querySelectorAll('#output')[0].setAttribute('value', `Time: ${t}`);
  document.querySelectorAll('#output')[1].setAttribute('value', `Health: ${health}`);
  document.querySelectorAll('#output')[2].setAttribute('value', `Score: ${gems_collected}`);
 
  /* Challenge 7
     Display the time, gems collected and health in the text element
     create in Challenge 1
  */



  if(gems_collected < 10 && health > 0){
    window.requestAnimationFrame( loop );
  }else{
    results();
  }
}

function results(){

  let gameOver = document.querySelector('#gameOver');
  let missionComplete = document.querySelector('#missionComplete');

  if(gems_collected === 10){
    missionComplete.setAttribute('opacity', 1);
  }else{
    gameOver.setAttribute('opacity', 1);
  }
  /* Challenge 8
     Display the appropriate image depending on whether the user
     won (gathered 10 gems) or lost (health drops to 0 or less)
  */


}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}
