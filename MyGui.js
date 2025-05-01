"use strict";

/*
   This file aims to deal with human interaction with the application.
   It presents a little user interface throught which humans interact with the application.

   See https://lil-gui.georgealways.com/#Guide for details.
*/

import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js"; // https://www.npmjs.com/package/lil-gui
import { Webgl } from "./Webgl.js";
import { MyBox } from "./Caixa.js";
import { MyBookcase } from "./Estante.js";
import { MyWarehouse } from "./Armazem.js";
import { MyRobot } from "./robot.js";

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
            verEstante: () => {
                this.webgl.scene.add(new THREE.AxesHelper(50));
                const estante1 = new MyBookcase(450, 10, 1200, 10, 30, 650); // le, ae, ce, lp, ep, ap
                this.webgl.scene.add(estante1);
            },
            verArmazem: () => {
                this.webgl.scene.add(new THREE.AxesHelper(50));
                const armazem = new MyWarehouse(3000, 1500, 2000); //la, aa, ca
                this.webgl.scene.add(armazem);
            },
            verRobot: () => {
                this.webgl.scene.add(new THREE.AxesHelper(50));
                const robot = new MyRobot(400, 500, 400); // lr, ar, cr
                this.webgl.scene.add(robot);
            },
            Perspectiva: "Perspectiva",
            switchCamera: () => {
                this.webgl.switchCamera();
                guiVars.Perspectiva =
                    this.webgl.camera instanceof THREE.PerspectiveCamera
                        ? "Perspectiva"
                        : "Orthographic";
            },
            firstPersonControls: false,
            flyControls: false,
            orbitControls: false,
        };

        const gui = new GUI();
        const trackballControls = gui
            .add(guiVars, "trackballControls")
            .name("Trackball");
        const firstPersonToggle = gui
            .add(guiVars, "firstPersonControls")
            .name("Primeira Pessoa");
        const flyControls = gui
            .add(guiVars, "flyControls")
            .name("Fly Controls");
        const orbitControls = gui
            .add(guiVars, "orbitControls")
            .name("Orbit Controls");
        const limparCena = gui.add(guiVars, "limparCena").name("Limpar Cena");
        const verCaixa = gui.add(guiVars, "verCaixa").name("Ver Caixa");
        const verEstante = gui.add(guiVars, "verEstante").name("Ver Estante");
        const verArmazem = gui.add(guiVars, "verArmazem").name("Ver Armazem");
        const verRobot = gui.add(guiVars, "verRobot").name("Ver Robot");
        const camTrocar = gui
            .add(guiVars, "switchCamera")
            .name("Trocar Camera");
        const camPerspetiva = gui.add(guiVars, "Perspectiva").listen();
        // camera.lookAt(scene.position);
        // render();

        trackballControls.onChange((value) => {
            this.webgl.trackballControls.enabled =
                !this.webgl.trackballControls.enabled;
        });
        firstPersonToggle.onChange((value) => {
            if (value) {
                this.webgl.enableFirstPersonControls();
            } else {
                this.webgl.disableControls();
            }
        });
        flyControls.onChange((value) => {
            if (value) {
                this.webgl.enableFlyControls();
            } else {
                this.webgl.disableFlyControls();
            }
        });
        orbitControls.onChange((value) => {
            if (value) {
                this.webgl.enableOrbitControls();
            } else {
                this.webgl.disableOrbitControls();
            }
        });
    }
}
