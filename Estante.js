'use strict';

// Define a classe `Estante` que estende de THREE.Object3D
class Estante extends THREE.Object3D {

  // Função construtora para inicializar a estante com as dimensões especificadas e opções de material
  constructor(largura, altura, profundidade, vidro, armazem) {
    super();

    // Armazena as dimensões como propriedades da classe
    this.largura = largura;
    this.altura = altura;
    this.profundidade = profundidade;

    // Cria a base da estante
    var base1 = Estante.createMesh(new THREE.CubeGeometry(largura, altura, profundidade), armazem);
    this.add(base1); // Adiciona a base à estante

    // Se a opção de vidro for verdadeira, aplica o material de vidro à base
    if (vidro === true) {
      var glassMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000, // Define a cor como preto
        specular: 0xffffff, // Define a cor especular como branco para reflexos semelhantes ao vidro
        shininess: 100000, // Ajusta o valor de brilho para controlar a intensidade dos reflexos
        transparent: true, // Torna o material transparente
        opacity: 0.5 // Define o valor de opacidade para controlar a transparência do vidro
      });
      base1.children[0].material = glassMaterial; // Aplica o material de vidro ao primeiro filho da base
    }
  }

  // Método estático para criar um mesh com uma geometria fornecida e opção de material de armazém
  static createMesh(geom, armazem) {
    if (armazem === true) {
      let meshMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 }); // Define a cor como cinzento
      meshMaterial.side = THREE.DoubleSide; // Garante que o material é de dupla face

      let wireFrameMat = new THREE.MeshBasicMaterial();
      wireFrameMat.wireframe = true; // Define o modo de wireframe

      // Cria um objeto multimaterial utilizando a geometria e ambos os materiais
      let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

      return mesh; // Retorna o mesh criado
    } else {
      // Cria um material com cor branca
      let meshMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
      meshMaterial.side = THREE.DoubleSide; // Garante que o material é de dupla face

      let wireFrameMat = new THREE.MeshBasicMaterial();
      wireFrameMat.wireframe = true; // Define o modo de wireframe

      // Cria um objeto multimaterial utilizando a geometria e ambos os materiais
      let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

      return mesh; // Retorna o mesh criado
    }
  }
}
