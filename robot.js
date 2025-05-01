"use strict";

import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";

export class MyRobot extends THREE.Object3D {
    constructor(lr, ar, cr) {
        super();

        //-----------------------------------//
        // Criar o corpo
        //-----------------------------------//
        const corpo = this.createMesh(
            new THREE.BoxGeometry(lr, ar, cr, 16, 16, 16),
            0x3b9da8
        );
        corpo.position.set(0, ar / 2, 0);
        corpo.add(new THREE.AxesHelper(300));
        corpo.castShadow = true;
        corpo.receiveShadow = true;
        //-----------------------------------//

        //-----------------------------------//
        // Parametros da roda
        //-----------------------------------//
        const raioRoda = lr / 3;
        const larguraRoda = cr / 6;

        const offsetX = lr / 2 + larguraRoda / 2; // distância do centro do corpo para o lado
        const offsetY = raioRoda / 2; // rodas tocam no chão
        const offsetZ = cr / 2 - larguraRoda / 2; // uma na frente, outra atrás
        //-----------------------------------//

        //-----------------------------------//
        // Criar as 4 rodas
        //-----------------------------------//
        const criarRoda = (x, z) => {
            const roda = this.createMesh(
                new THREE.CylinderGeometry(raioRoda, raioRoda, larguraRoda, 32),
                0x333333
            );
            roda.rotation.z = Math.PI / 2; // rodas na vertical
            roda.position.set(x, offsetY, z);
            roda.add(new THREE.AxesHelper(300));
            roda.castShadow = true;
            roda.receiveShadow = true;
            return roda;
        };

        const roda_frontal_esq = criarRoda(-offsetX, offsetZ);
        const roda_frontal_dir = criarRoda(offsetX, offsetZ);
        const roda_traseira_esq = criarRoda(-offsetX, -offsetZ);
        const roda_traseira_dir = criarRoda(offsetX, -offsetZ);
        //-----------------------------------//

        //-----------------------------------//
        // Criar pescoço
        //-----------------------------------//
        const pescoco = this.createMesh(
            new THREE.CylinderGeometry(lr / 6, lr / 6, lr / 2, 32),
            0x333333
        );
        pescoco.position.set(0, ar, 0);
        pescoco.add(new THREE.AxesHelper(300));
        pescoco.castShadow = true;
        pescoco.receiveShadow = true;
        //-----------------------------------//

        //-----------------------------------//
        // Criar a cabeça
        //-----------------------------------//
        const cabeca = this.createMesh(
            new THREE.BoxGeometry(lr * 0.75, ar / 2, cr / 2, 16, 16, 16),
            0x3b9da8
        );
        cabeca.position.set(0, ar + ar / 3, 0);
        cabeca.add(new THREE.AxesHelper(300));
        cabeca.castShadow = true;
        cabeca.receiveShadow = true;
        //-----------------------------------//

        //-----------------------------------//
        // Criar olho
        //-----------------------------------//
        const criarOlho = (x, y, z) => {
            const olho = this.createMesh(
                new THREE.BoxGeometry(lr / 4, lr / 5, cr / 9, 16, 16, 16),
                0x333333
            );
            olho.position.set(x, y, z);
            olho.add(new THREE.AxesHelper(300));
            olho.castShadow = true;
            olho.receiveShadow = true;
            return olho;
        };

        const posicaoYOlhos = ar + ar / 3 + ar * 0.1;
        const posicaoZOlhos = -cr / 4;

        const olho_esquerdo = criarOlho(-lr / 5, posicaoYOlhos, posicaoZOlhos);
        const olho_direito = criarOlho(lr / 5, posicaoYOlhos, posicaoZOlhos);
        //-----------------------------------//

        //-----------------------------------//
        // Criar braço
        //-----------------------------------//
        // Criar braço (melhorado)
        const criarBraco = (x, y, z) => {
            const braco = this.createMesh(
                new THREE.CylinderGeometry(lr / 10, lr / 10, lr, 32), // um pouco mais curto
                0x333333
            );
            braco.rotation.z = Math.PI / 2;
            braco.rotation.y = Math.PI / 2;
            braco.position.set(x, y, z);
            braco.add(new THREE.AxesHelper(100));
            braco.castShadow = true;
            braco.receiveShadow = true;
            return braco;
        };

        // Posição dos braços
        const posicaoYBracos = ar * 0.75; // 75% da altura do corpo

        // Posição em X: ligeiramente fora do corpo
        const posicaoXBracos = lr / 2 + lr * 0.1;

        const braco_esquerdo = criarBraco(
            -posicaoXBracos,
            posicaoYBracos,
            -lr / 2
        );
        const braco_direito = criarBraco(
            posicaoXBracos,
            posicaoYBracos,
            -lr / 2
        );

        //-----------------------------------//

        //-----------------------------------//
        // Adicionar tudo
        //-----------------------------------//
        this.add(corpo);
        this.add(roda_frontal_esq);
        this.add(roda_frontal_dir);
        this.add(roda_traseira_esq);
        this.add(roda_traseira_dir);
        this.add(pescoco);
        this.add(cabeca);
        this.add(olho_esquerdo);
        this.add(olho_direito);
        this.add(braco_esquerdo);
        this.add(braco_direito);
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
