import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

const scene = new THREE.Scene();


const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  roughness: 0.5,
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)


const sizes ={
  width: window.innerWidth,
  height: window.innerHeight
}


const light = new THREE.PointLight(0xffffff, 125, 100)
light.position.set(1, 10, 10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height);
camera.position.z = 20;
scene.add(camera)

// controls 
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene,camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping= true
controls.enablePan= false
controls.enableZoom= false
controls.autoRotate= true
controls.autoRotateSpeed= 5

window.addEventListener('resize',()=>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})




const loop = ()=>{
  controls.update()
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}

loop();


const t1 = gsap.timeline({defaults:{duration:1}})
t1.fromTo(mesh.scale, {x:0,y:0,z:0}, {x:1,y:1,z:1})
t1.fromTo('nav', {y:"-100%"}, {y:"0%"})
t1.fromTo('.title', {opacity:0},{opacity:1})

// Mouse animation color 
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', ()=>{
  mouseDown = true
})

window.addEventListener('mouseup', ()=>{
  mouseDown = false
})

window.addEventListener('mousemove',(e)=>{
  if(mouseDown){
    rgb=[
      Math.round((e.pageX / sizes.width) *255),
      Math.round((e.pageX / sizes.height) *255),
      150,
    ]

    // animate 
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r:newColor.r,
      g:newColor.g,
      b:newColor.b,
    })
  }
})




