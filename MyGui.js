"use strict";

/*
   This file aims to deal with human interaction with the application.
   It presents a little user interface throught which humans interact with the application.

   See https://lil-gui.georgealways.com/#Guide for details.
*/

import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js"; // https://www.npmjs.com/package/lil-gui
import { Webgl } from "./Webgl.js";
import { MyBox } from "./Models.js";

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

                const caixa1 = new MyBox(400, 105, 10, 270); //lc, ac, ec, cc
                this.webgl.scene.add(caixa1);
            },
            Perspectiva: "Perspectiva",
            switchCamera: () => {
                this.webgl.switchCamera();
                guiVars.Perspectiva =
                    this.webgl.camera instanceof THREE.PerspectivaCamera
                        ? "Perspectiva"
                        : "Orthographic";
            },
        };

        const gui = new GUI();
        const trackballControls = gui.add(guiVars, "trackballControls");
        const limparCena = gui.add(guiVars, "limparCena");
        const verCaixa = gui.add(guiVars, "verCaixa");
        const camTrocar = gui.add(guiVars, "switchCamera");
        const camPerspetiva = gui.add(guiVars, "Perspectiva").listen();
        // camera.lookAt(scene.position);
        // render();

        trackballControls.onChange((value) => {
            this.webgl.trackballControls.enabled =
                !this.webgl.trackballControls.enabled;
        });
    }
}
