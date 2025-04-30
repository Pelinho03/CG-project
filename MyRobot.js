'use strict';

// Define a classe `MyRobot` que estende de THREE.Object3D
class MyRobot extends THREE.Object3D {
  // Função construtora para inicializar o robô com as dimensões especificadas
  constructor(largura, altura, raio, tubo) {
    super();

    // Armazena as dimensões como propriedades da classe
    this.largura = largura;
    this.altura = altura;
    this.raio = raio;

    // Cria o corpo do robô como uma caixa
    const bodyGeometry = new THREE.BoxGeometry(largura, altura, largura);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xFFCC00 }); // Cor amarela
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.add(bodyMesh); // Adiciona o corpo à cena

    // Cria as rodas como esferas com cor vermelha
    const wheelGeometry = new THREE.SphereGeometry(raio, 32, 32);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 }); // Cor vermelha
    const wheelMeshes = [];
    for (let i = 0; i < 4; i++) {
      const wheelMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
      // Posiciona as rodas em torno do corpo
      wheelMesh.position.x = (i % 2 === 0 ? 1 : -1) * (largura / 2);
      wheelMesh.position.y = -altura / 2;
      wheelMesh.position.z = (i < 2 ? 1 : -1) * (largura / 2);
      wheelMeshes.push(wheelMesh);
      this.add(wheelMesh); // Adiciona a roda à cena
    }

    // Cria o braço como um cilindro com cor verde
    const armGeometry = new THREE.CylinderGeometry(1, 1, tubo, 32);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00 }); // Cor verde
    const armMesh = new THREE.Mesh(armGeometry, armMaterial);
    // Posiciona o braço conforme desejado
    armMesh.position.y = altura / 2;
    armMesh.position.z = largura / 2;
    this.add(armMesh); // Adiciona o braço à cena
  }
}
