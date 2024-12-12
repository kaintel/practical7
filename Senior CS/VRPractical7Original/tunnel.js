class Tunnel{
  constructor(x,y,z){
    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#tunnelModel");
    this.obj.object3D.rotation.y = Math.PI / 2;
    this.obj.object3D.position.z = -z;
    scene.append(this.obj);
  }
}