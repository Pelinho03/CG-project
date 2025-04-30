"use strict";

/*
   This file aims to contain all the graphical models that will be developed along the course.
   Create a javascript Class for each graphical model.
   Export each graphical model by preceeding the Class definition with the 'export' keyword.
   
   Template for a Class:
     export class ClassName {
       constructor() { ... }
       mechod_1() { ... }
       mechod_2() { ... }
       mechod_3() { ... }
     }
     
   Within a Class, use the 'this' keyword to define properties that are available on the scope of the object.
*/

import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";

// MtBox is a subclass of THREE.Object3D.
// The class MtBox inheriths all the mechods and properties of THREE.Object3D.
export class MtBox extends THREE.Object3D {
    constructor(lc, ac, ec, cc) {
        super();

        // Lateral direita
        const lateral_direita = this.createMesh(
            new THREE.BoxGeometry(ec, ac, cc, 16, 16, 16),
            0x918300
        );
        lateral_direita.translateX(lc / 2 - ec / 2);
        lateral_direita.translateY(ac / 2);
        lateral_direita.translateZ(0);
        lateral_direita.add(new THREE.AxesHelper(10));

        // Lateral esquerda
        const lateral_esquerda = this.createMesh(
            new THREE.BoxGeometry(ec, ac, cc, 16, 16, 16),
            0x918300
        );
        lateral_esquerda.translateX(-lc / 2 + ec / 2);
        lateral_esquerda.translateY(ac / 2);
        lateral_esquerda.translateZ(0);
        lateral_esquerda.add(new THREE.AxesHelper(10));

        // Fundo traseiro
        const fundo_traseiro = this.createMesh(
            new THREE.BoxGeometry(lc, ac, ec, 16, 16, 16),
            0x918300
        );
        fundo_traseiro.translateX(0);
        fundo_traseiro.translateY(ac / 2);
        fundo_traseiro.translateZ(-cc / 2 + ec / 2);
        fundo_traseiro.add(new THREE.AxesHelper(10));

        // Fundo frontal
        const fundo_frontal = this.createMesh(
            new THREE.BoxGeometry(lc, ac, ec, 16, 16, 16),
            0x918300
        );
        fundo_frontal.translateX(0);
        fundo_frontal.translateY(ac / 2);
        fundo_frontal.translateZ(cc / 2 - ec / 2);
        fundo_frontal.add(new THREE.AxesHelper(10));

        // Base
        const base = this.createMesh(
            new THREE.BoxGeometry(lc, ec, cc, 16, 16, 16),
            0x000000
        );
        base.translateX(0);
        base.translateY(ec / 2);
        base.translateZ(0);
        base.add(new THREE.AxesHelper(10));

        // Adicionar as partes à estrutura principal
        this.add(lateral_direita);
        this.add(lateral_esquerda);
        this.add(fundo_traseiro);
        this.add(fundo_frontal);
        this.add(base);
    }

    createMesh(geom, color) {
        const meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        const wireFrameMat = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: false,
        });

        const mesh = SceneUtils.createMultiMaterialObject(geom, [
            meshMaterial,
            wireFrameMat,
        ]);

        return mesh;
    }
}
