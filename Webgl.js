"use strict";

/*
   This file contains the weblg initialization code (creation of scene, camera, renderer, ...).
*/

import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

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

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x555555);

        // create camera, position and point the camera to the center of the scene
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(600, 400, 200);
        this.camera.lookAt(this.scene.position);

        this.trackballControls = new TrackballControls(
            this.camera,
            this.renderer.domElement
        );

        this.trackballControls.rotateSpeed = 10.0;
        this.trackballControls.zoomSpeed = 1.0;
        this.trackballControls.panSpeed = 1.0;
        this.trackballControls.staticMoving = true;
    }

    // Método para alternar entre câmeras
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

    render() {
        const delta = this.clock.getDelta();
        this.trackballControls.update(delta);
        this.renderer.render(this.scene, this.camera);
    }
}
