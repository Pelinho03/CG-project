"use strict";

/*
   This file contains the weblg initialization code (creation of scene, camera, renderer, ...).
*/

import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { FlyControls } from "three/addons/controls/FlyControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class Webgl {
    clock;
    renderer;
    scene;
    camera;
    trackballControls;

    constructor() {
        this.clock = new THREE.Clock();

        // create a render and set the size
        const canvas = document.querySelector("#WebGL-canvas");
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
        this.renderer.useLegacyLights = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x555555);

        // create camera, position and point the camera to the center of the scene
        this.camera = new THREE.PerspectiveCamera(
            40,
            window.innerWidth / window.innerHeight,
            0.1,
            20000
        );
        this.camera.position.set(0, 2000, -4000); // x y z
        this.camera.lookAt(0, 0, 0);

        this.trackballControls = new TrackballControls(
            this.camera,
            this.renderer.domElement
        );

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(500, 1000, 500); // Posição da luz
        light.castShadow = true; // Habilitar sombras na luz
        light.shadow.mapSize.width = 2048; // Resolução do mapa de sombras
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 3000;

        this.scene.add(light);

        // Adicionar uma luz ambiente para iluminar uniformemente
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Cor e intensidade
        this.scene.add(ambientLight);

        this.trackballControls.rotateSpeed = 10.0;
        this.trackballControls.zoomSpeed = 1.0;
        this.trackballControls.panSpeed = 1.0;
        this.trackballControls.staticMoving = true;
    }

    //-----------------------------------//
    // Método para alternar entre câmeras
    //-----------------------------------//
    switchCamera() {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            const aspect = window.innerWidth / window.innerHeight;
            this.camera = new THREE.OrthographicCamera(
                -aspect * 200,
                aspect * 200,
                200,
                -200,
                -200,
                500
            );
            this.camera.position.set(120, 60, 180);
            this.camera.lookAt(this.scene.position);
        } else {
            this.camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            this.camera.position.set(600, 400, 200);
            this.camera.lookAt(this.scene.position);
        }

        // Atualizar os controles para usar a nova câmera
        this.trackballControls.object = this.camera;
    }
    //-----------------------------------//

    //-----------------------------------//
    // Método para controlo de Primeira Pessoa
    //-----------------------------------//
    enableFirstPersonControls() {
        this.disposeCurrentControls();

        this.firstPersonControls = new FirstPersonControls(
            this.camera,
            this.renderer.domElement
        );
        this.firstPersonControls.movementSpeed = 20;
        this.firstPersonControls.lookSpeed = 0.1;
        this.firstPersonControls.lookVertical = true;
        this.firstPersonControls.constrainVertical = true;
        this.firstPersonControls.verticalMin = 1.0;
        this.firstPersonControls.verticalMax = 2.0;
        this.firstPersonControls.lon = -150;
        this.firstPersonControls.lat = 120;
    }

    disableControls() {
        this.disposeCurrentControls();
    }
    //-----------------------------------//

    //-----------------------------------//
    // Método para Fly Controls
    //-----------------------------------//
    enableFlyControls() {
        this.disposeCurrentControls();

        this.flyControls = new FlyControls(
            this.camera,
            this.renderer.domElement
        );

        this.flyControls.movementSpeed = 125;
        this.flyControls.rollSpeed = Math.PI / 24;
        this.flyControls.autoForward = true;
        this.flyControls.dragToLook = false;
    }
    disableFlyControls() {
        this.disposeCurrentControls();
    }
    //-----------------------------------//

    //-----------------------------------//
    // Método para Orbit Controls
    //-----------------------------------//
    enableOrbitControls() {
        this.disposeCurrentControls();

        this.orbitControls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        this.orbitControls.autoRotate = true;
    }
    disableOrbitControls() {
        this.disposeCurrentControls();
    }
    //-----------------------------------//

    //-----------------------------------//
    // Método para desativar os controlos
    //-----------------------------------//
    disposeCurrentControls() {
        if (this.trackballControls) {
            this.trackballControls.dispose();
            this.trackballControls = null;
        }
        if (this.firstPersonControls) {
            this.firstPersonControls.dispose?.();
            this.firstPersonControls = null;
        }
        if (this.flyControls) {
            this.flyControls.dispose?.();
            this.flyControls = null;
        }
        if (this.orbitControls) {
            this.orbitControls.dispose();
            this.orbitControls = null;
        }
    }
    //-----------------------------------//

    //-----------------------------------//
    // Render
    //-----------------------------------//
    render() {
        const delta = this.clock.getDelta();

        if (this.trackballControls) this.trackballControls.update(delta);
        if (this.firstPersonControls) this.firstPersonControls.update(delta);
        if (this.flyControls) this.flyControls.update(delta);
        if (this.orbitControls) this.orbitControls.update(delta);

        this.renderer.render(this.scene, this.camera);
    }
    //-----------------------------------//
}
