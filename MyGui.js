"use strict";

/*
   This file aims to deal with human interaction with the application.
   It presents a little user interface throught which humans interact with the application.

   See https://lil-gui.georgealways.com/#Guide for details.
*/

import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js"; // https://www.npmjs.com/package/lil-gui
import { Webgl } from "./Webgl.js";
import { MtBox } from "./Models.js";

export class MyGui {
    webgl;

    constructor(webgl) {
        this.webgl = webgl;

        const guiVars = {
            trackballControls: true,
            limparCena: () => {
                for (let i = 0; i < this.webgl.scene.children.length; )
                    this.webgl.scene.remove(this.webgl.scene.children[i]);
            },
            verCaixa: () => {
                this.webgl.scene.add(new THREE.AxesHelper(50));

                const caixa1 = new MtBox(400, 105, 10, 270); //lc, ac, ec, cc
                this.webgl.scene.add(caixa1);
            },
        };

        var controls = new function () {
            this.perspective = "Perspective";
            this.switchCamera = () => {
                if (this.webgl.camera instanceof THREE.PerspectiveCamera) {
                    this.webgl.camera = new THREE.OrthographicCamera(
                        window.innerWidth / -16,
                        window.innerWidth / 16,
                        window.innerHeight / 16,
                        window.innerHeight / -16,
                        -200,
                        500
                    );
                    this.webgl.camera.position.set(120, 60, 180);
                    this.webgl.camera.lookAt(this.webgl.scene.position);
                    this.perspective = "Orthographic";
                } else {
                    this.webgl.camera = new THREE.PerspectiveCamera(
                        45,
                        window.innerWidth / window.innerHeight,
                        0.1,
                        1000
                    );
                    this.webgl.camera.position.set(600, 400, 200);
                    this.webgl.camera.lookAt(this.webgl.scene.position);
                    this.perspective = "Perspective";
                }
            };
        }.bind(this);

        const gui = new GUI();
        const trackballControls = gui.add(guiVars, "trackballControls");
        const limparCena = gui.add(guiVars, "limparCena");
        const verCaixa = gui.add(guiVars, "verCaixa");
        const camTrocar = gui.add(controls, "switchCamera");
        const camPerspetiva = gui.add(controls, "perspective").listen();
        camera.lookAt(scene.position);
        render();

        trackballControls.onChange((value) => {
            this.webgl.trackballControls.enabled =
                !this.webgl.trackballControls.enabled;
        });
    }
}
