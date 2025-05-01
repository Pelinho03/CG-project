"use strict";

import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";

export class MyBookcase extends THREE.Object3D {
    constructor(le, ae, ce, lp, ep, ap) {
        super();

        // Ajustar os deslocamentos para manter as patas nas laterais, mas mais próximas do centro
        const pataXOffset = le / 2 + lp / 2;
        const pataZOffset = (ce / 2 - ep / 2) * 0.5;

        //-----------------------------------//
        // Criar as 4 patas de suporte
        //-----------------------------------//
        const pata_frontal_esquerda = this.createMesh(
            new THREE.BoxGeometry(lp, ap, ep, 16, 16, 16),
            0x918300
        );
        pata_frontal_esquerda.translateX(-pataXOffset);
        pata_frontal_esquerda.translateY(ap / 2);
        pata_frontal_esquerda.translateZ(-pataZOffset);
        pata_frontal_esquerda.castShadow = true;
        pata_frontal_esquerda.receiveShadow = true;

        const pata_frontal_direita = this.createMesh(
            new THREE.BoxGeometry(lp, ap, ep, 16, 16, 16),
            0x918300
        );
        pata_frontal_direita.translateX(pataXOffset);
        pata_frontal_direita.translateY(ap / 2);
        pata_frontal_direita.translateZ(-pataZOffset);
        pata_frontal_direita.castShadow = true;
        pata_frontal_direita.receiveShadow = true;

        const pata_traseira_esquerda = this.createMesh(
            new THREE.BoxGeometry(lp, ap, ep, 16, 16, 16),
            0x918300
        );
        pata_traseira_esquerda.translateX(-pataXOffset);
        pata_traseira_esquerda.translateY(ap / 2);
        pata_traseira_esquerda.translateZ(pataZOffset - ce * 0.3);
        pata_traseira_esquerda.castShadow = true;
        pata_traseira_esquerda.receiveShadow = true;

        const pata_traseira_direita = this.createMesh(
            new THREE.BoxGeometry(lp, ap, ep, 16, 16, 16),
            0x918300
        );
        pata_traseira_direita.translateX(pataXOffset);
        pata_traseira_direita.translateY(ap / 2);
        pata_traseira_direita.translateZ(pataZOffset - ce * 0.3);
        pata_traseira_direita.castShadow = true;
        pata_traseira_direita.receiveShadow = true;
        //-----------------------------------//

        //-----------------------------------//
        // Criar as 3 prateleiras
        //-----------------------------------//
        const prateleira_1 = this.createMesh(
            new THREE.BoxGeometry(le, ae, ce, 16, 16, 16),
            0x000000
        );
        prateleira_1.translateY(200);
        prateleira_1.rotateX(THREE.MathUtils.degToRad(5));
        prateleira_1.castShadow = true;
        prateleira_1.receiveShadow = true;

        const prateleira_2 = this.createMesh(
            new THREE.BoxGeometry(le, ae, ce * 0.75, 16, 16, 16),
            0x000000
        );
        prateleira_2.translateY(400);
        prateleira_2.translateZ(-(ce * 0.25) / 2);
        prateleira_2.rotateX(THREE.MathUtils.degToRad(5));
        prateleira_2.add(new THREE.AxesHelper(100));
        prateleira_2.castShadow = true;
        prateleira_2.receiveShadow = true;

        const prateleira_3 = this.createMesh(
            new THREE.BoxGeometry(le, ae, ce * 0.5, 16, 16, 16),
            0x000000
        );
        prateleira_3.translateY(600);
        prateleira_3.translateZ(-(ce * 0.25));
        prateleira_3.rotateX(THREE.MathUtils.degToRad(-5));
        prateleira_3.add(new THREE.AxesHelper(100));
        prateleira_3.castShadow = true;
        prateleira_3.receiveShadow = true;
        //-----------------------------------//

        //-----------------------------------//
        // Criar parte da frente das prateleiras
        //-----------------------------------//
        const base_prateleira_1 = this.createMesh(
            new THREE.BoxGeometry(le, ae * 4, ae, 16, 16, 16),
            0x000000
        );
        base_prateleira_1.translateY(170);
        base_prateleira_1.translateZ(le + ce * 0.12);
        base_prateleira_1.rotateX(THREE.MathUtils.degToRad(5));
        base_prateleira_1.castShadow = true;
        base_prateleira_1.receiveShadow = true;

        const base_prateleira_2 = this.createMesh(
            new THREE.BoxGeometry(le, ae * 4, ae, 16, 16, 16),
            0x000000
        );
        base_prateleira_2.translateY(380);
        base_prateleira_2.translateZ(le / 2 + ae * 7);
        base_prateleira_2.rotateX(THREE.MathUtils.degToRad(5));
        base_prateleira_2.castShadow = true;
        base_prateleira_2.receiveShadow = true;
        //-----------------------------------//

        //-----------------------------------//
        // Adicionar as partes à estrutura principal
        //-----------------------------------//
        this.add(pata_frontal_esquerda);
        this.add(pata_frontal_direita);
        this.add(pata_traseira_esquerda);
        this.add(pata_traseira_direita);
        this.add(prateleira_1);
        this.add(prateleira_2);
        this.add(prateleira_3);
        this.add(base_prateleira_1);
        this.add(base_prateleira_2);
        //-----------------------------------//
    }

    //-----------------------------------//
    // Método para criar um mesh com material normal e wireframe
    //-----------------------------------//
    createMesh(geom, color) {
        const meshMaterial = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.5, // Controla a rugosidade
            metalness: 0.1, // Controla o brilho metálico
        });

        const mesh = new THREE.Mesh(geom, meshMaterial);
        return mesh;
    }
}
