import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


class BasicWorld{
    constructor(){
        this._Initialize();
    }

    _Initialize(){
        this._threejs =new THREE.WebGLRenderer();
        this._threejs.shadowMap.enabled = true; 
        this._threejs.shadowMap.type = THREE.PCFSoftShadowMap; 
        this._threejs.setPixelRatio(window.devicePixelRatio); 
        this._threejs.setSize(window.innerWidth ,window.innerHeight);
        
        document.body.appendChild(this._threejs.domElement);


        window.addEventListener("resize",()=>{
            this._OnWindowResize();
        },false);

      
        const fov =70;
        const aspect =1920 / 1080;
        const near =1.0;
        const far = 1000.0;

        this._camera = new THREE.PerspectiveCamera(fov, aspect,near, far);
        this._camera.position.set(75,20,0);

        this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 50;
    light.shadow.camera.right = -50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    this._scene.add(light);

light =new THREE.AmbientLight(0x404040);

this._scene.add(light);


const controls =new OrbitControls(
    this._camera, this._threejs.domElement);
controls.target.set(0,0,0);
controls.update();


const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    './RESOURCES/arid_ft.jpg',
    './RESOURCES/arid_bk.jpg',
    './RESOURCES/arid_up.jpg',
    './RESOURCES/arid_dn.jpg',
    './RESOURCES/arid_rt.jpg',
    './RESOURCES/arid_lf.jpg'
]);

this._scene.background = texture;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100,1,1),
    new THREE.MeshStandardMaterial({
    
        color: 0xFFFFFF
        
    }));

    plane.castShadow =false;
plane.reciveShadow = true;
plane.rotation.x = -Math.PI / 2;
this._scene.add(plane); 


const box = new THREE.Mesh(
    new THREE.BoxGeometry(2,2,2),
    new THREE.MeshStandardMaterial({
 color: 0x808080
}));

box.position.set(0,1,0);
box.castShadow =true;
box.reciveShadow = true;
this._scene.add(box); 


this._RAF();

}

_OnWindowResize(){
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);

}

_RAF(){
    requestAnimationFrame(() => {
        this._threejs.render(this._scene,this._camera);
        this._RAF();
    });
}

}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorld();
});
