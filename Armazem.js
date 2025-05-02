"use strict";

import * as THREE from "three";
import { MyBookcase } from "./Estante.js";
import { MyRobot } from "./robot.js";

export class MyWarehouse extends THREE.Object3D {
    constructor(la, aa, ca) {
        super();

        //-----------------------------------//
        // Criar o chão
        //-----------------------------------//
        const chao = this.createMesh(
            new THREE.BoxGeometry(la, 10, ca), // Largura, espessura, comprimento
            0x918300
        );
        chao.translateY(5); // Levantar o chão para que fique visível
        chao.castShadow = true;
        chao.receiveShadow = true;
        this.add(chao);
        //-----------------------------------//

        //-----------------------------------//
        // Criar as paredes
        //-----------------------------------//
        const parede_frontal = this.createMesh(
            new THREE.BoxGeometry(la, aa, 10), // Largura, altura, espessura
            0xaaaaaa
        );
        parede_frontal.translateY(aa / 2); // Levantar para alinhar com o chão
        parede_frontal.translateZ(-ca / 2 + 5); // Posicionar na frente
        parede_frontal.castShadow = true;
        parede_frontal.receiveShadow = true;

        const parede_traseira = this.createMesh(
            new THREE.BoxGeometry(la, aa, 10),
            0xaaaaaa
        );
        parede_traseira.translateY(aa / 2);
        parede_traseira.translateZ(ca / 2 - 5); // Posicionar atrás
        parede_traseira.castShadow = true;
        parede_traseira.receiveShadow = true;

        const parede_esquerda = this.createMesh(
            new THREE.BoxGeometry(10, aa, ca), // Espessura, altura, comprimento
            0xaaaaaa
        );
        parede_esquerda.translateY(aa / 2);
        parede_esquerda.translateX(-la / 2 + 5); // Posicionar à esquerda
        parede_esquerda.castShadow = true;
        parede_esquerda.receiveShadow = true;

        const parede_direita = this.createMesh(
            new THREE.BoxGeometry(10, aa, ca),
            0xaaaaaa
        );
        parede_direita.translateY(aa / 2);
        parede_direita.translateX(la / 2 - 5); // Posicionar à direita
        parede_direita.castShadow = true;
        parede_direita.receiveShadow = true;

        // this.add(parede_frontal);
        this.add(parede_traseira);
        this.add(parede_esquerda);
        this.add(parede_direita);
        //-----------------------------------//

        //-----------------------------------//
        // Criar o teto
        //-----------------------------------//
        const teto = this.createMesh(
            new THREE.BoxGeometry(la, 10, ca), // Largura, espessura, comprimento
            0xcccccc
        );
        teto.translateY(aa); // Posicionar no topo das paredes
        teto.castShadow = true;
        teto.receiveShadow = true;
        this.add(teto);
        //-----------------------------------//

        //-----------------------------------//
        // Criar as estantes
        //-----------------------------------//
        const le = 450;
        const ae = 10;
        const ce = 1200;
        const lp = 10;
        const ep = 30;
        const ap = 650;

        const estante1 = new MyBookcase(le, ae, ce, lp, ep, ap);
        estante1.position.set(le + le * 0.75, 0, ce / 3 - lp * 3); // x y z
        estante1.rotateY(THREE.MathUtils.degToRad(180));

        const estante2 = new MyBookcase(le, ae, ce, lp, ep, ap);
        estante2.position.set(0, 0, ce / 3 - lp * 3); // x y z
        estante2.rotateY(THREE.MathUtils.degToRad(180));

        const estante3 = new MyBookcase(le, ae, ce, lp, ep, ap);
        estante3.position.set(-le - le * 0.75, 0, ce / 3 - lp * 3); // x y z
        estante3.rotateY(THREE.MathUtils.degToRad(180));

        this.add(estante1);
        this.add(estante2);
        this.add(estante3);
        //-----------------------------------//

        //-----------------------------------//
        // Criar o robot
        //-----------------------------------//
        const lr = 200;
        const ar = 250;
        const cr = 200;

        const robot = new MyRobot(lr, ar, cr);
        robot.position.set(ar * 5, lr / 5, -lr * 3); // x y z
        robot.rotateY(THREE.MathUtils.degToRad(90));

        // this.add(robot);
        //-----------------------------------//

        //-----------------------------------//
        // Adicionar SpotLights
        //-----------------------------------//
        const createSpotLight = (x, y, z, target) => {
            const spotLight = new THREE.SpotLight(0xffffff, 1); // Cor e intensidade
            spotLight.position.set(x, y, z); // Posicionar a luz
            spotLight.angle = Math.PI / 4; // Ângulo do feixe de luz
            spotLight.penumbra = 0.5; // Suavidade nas bordas do feixe
            spotLight.decay = 2; // Decaimento da luz
            spotLight.distance = 5000; // Distância máxima da luz

            spotLight.castShadow = true; // ativar sombras
            spotLight.shadow.mapSize.width = 2048; // Resolução do mapa de sombras
            spotLight.shadow.mapSize.height = 2048;
            spotLight.shadow.camera.near = 10;
            spotLight.shadow.camera.far = 5000;

            // Apontar a luz para o alvo
            spotLight.target = target;
            this.add(spotLight);
            this.add(spotLight.target);

            return spotLight;
        };

        // Criar luzes para cada estante
        createSpotLight(le + le * 0.75, aa, ce / 3 - lp * 3, estante1);
        createSpotLight(0, aa, ce / 3 - lp * 3, estante2);
        createSpotLight(-le - le * 0.75, aa, ce / 3 - lp * 3, estante3);
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
