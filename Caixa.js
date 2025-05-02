"use strict";

import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";

// MyBox is a subclass of THREE.Object3D.
// The class MyBox inherits all the methods and properties of THREE.Object3D.
export class MyBox extends THREE.Object3D {
    constructor(lc, ac, ec, cc) {
        super();

        //-----------------------------------//
        // Criar a lateral direita
        //-----------------------------------//
        const lateral_direita = this.createMesh(
            new THREE.BoxGeometry(ec, ac, cc, 16, 16, 16),
            0x5da334
        );
        lateral_direita.translateX(lc / 2 - ec / 2);
        lateral_direita.translateY(ac / 2);
        lateral_direita.translateZ(0);
        // lateral_direita.add(new THREE.AxesHelper(10));
        lateral_direita.castShadow = true;
        lateral_direita.receiveShadow = true;

        //-----------------------------------//
        // Criar a lateral esquerda
        //-----------------------------------//
        const lateral_esquerda = this.createMesh(
            new THREE.BoxGeometry(ec, ac, cc, 16, 16, 16),
            0x5da334
        );
        lateral_esquerda.translateX(-lc / 2 + ec / 2);
        lateral_esquerda.translateY(ac / 2);
        lateral_esquerda.translateZ(0);
        // lateral_esquerda.add(new THREE.AxesHelper(10));
        lateral_esquerda.castShadow = true;
        lateral_esquerda.receiveShadow = true;

        //-----------------------------------//
        // Criar o fundo traseiro
        //-----------------------------------//
        const fundo_traseiro = this.createMesh(
            new THREE.BoxGeometry(lc, ac, ec, 16, 16, 16),
            0x5da334
        );
        fundo_traseiro.translateX(0);
        fundo_traseiro.translateY(ac / 2);
        fundo_traseiro.translateZ(-cc / 2 + ec / 2);
        // fundo_traseiro.add(new THREE.AxesHelper(10));
        fundo_traseiro.castShadow = true;
        fundo_traseiro.receiveShadow = true;

        //-----------------------------------//
        // Criar o fundo frontal
        //-----------------------------------//
        const fundo_frontal = this.createMesh(
            new THREE.BoxGeometry(lc, ac, ec, 16, 16, 16),
            0x5da334
        );
        fundo_frontal.translateX(0);
        fundo_frontal.translateY(ac / 2);
        fundo_frontal.translateZ(cc / 2 - ec / 2);
        // fundo_frontal.add(new THREE.AxesHelper(10));
        fundo_frontal.castShadow = true;
        fundo_frontal.receiveShadow = true;

        //-----------------------------------//
        // Criar a base
        //-----------------------------------//
        const base = this.createMesh(
            new THREE.BoxGeometry(lc, ec, cc, 16, 16, 16),
            0x000000
        );
        base.translateX(0);
        base.translateY(ec / 2);
        base.translateZ(0);
        // base.add(new THREE.AxesHelper(10));
        base.castShadow = true;
        base.receiveShadow = true;

        //-----------------------------------//
        // Adicionar as partes à estrutura principal
        //-----------------------------------//
        this.add(lateral_direita);
        this.add(lateral_esquerda);
        this.add(fundo_traseiro);
        this.add(fundo_frontal);
        this.add(base);
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
