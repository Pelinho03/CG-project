'use strict';

// Define uma nova classe `MyTable` que estende de THREE.Object3D
class MyTable extends THREE.Object3D {
  
  // Função construtora para inicializar o objeto mesa com as dimensões especificadas
  constructor(largura, altura, profundidade, espessura) {
    super(); // Chama o construtor da classe pai
    var inclinacao = 90 * Math.PI / 180; // Converte 90 graus para radianos para efeitos de rotação

    // Cria o primeiro painel lateral usando as dimensões especificadas
    var ladog1 = MyTable.createMesh(new THREE.CubeGeometry(largura, altura, profundidade)); 
    
    // Armazena as dimensões como propriedades da classe
    this.largura = largura;
    this.altura = altura;
    this.profundidade = profundidade;
    this.espessura = espessura;
    
    // Cria o painel base da mesa
    var ladobase = MyTable.createMesh(new THREE.CubeGeometry(largura, profundidade, espessura));
    ladobase.position.x += ladog1.position.x; // Alinha com a posição x do primeiro painel lateral
    ladobase.position.y -= altura / 2 - profundidade / 2; // Posiciona corretamente no eixo y
    ladobase.position.z += espessura / 2 + profundidade / 2; // Posiciona corretamente no eixo z

    // Cria o segundo painel lateral, idêntico ao primeiro
    var ladog2 = MyTable.createMesh(new THREE.CubeGeometry(largura, altura, profundidade)); 
    ladog2.position.y = ladog1.position.y; // Alinha a posição y com o primeiro painel lateral
    ladog2.position.x = ladog1.position.x; // Alinha a posição x com o primeiro painel lateral
    ladog2.position.z = profundidade + espessura; // Posiciona corretamente no eixo z

    // Cria o primeiro painel vertical com rotação
    var ladp1 = MyTable.createMesh(new THREE.CubeGeometry(espessura, altura - profundidade, profundidade)); 
    ladp1.rotation.y += inclinacao; // Roda 90 graus em torno do eixo y
    ladp1.position.y += profundidade / 2; // Posiciona corretamente no eixo y
    ladp1.position.z += espessura / 2 + profundidade / 2; // Posiciona corretamente no eixo z
    ladp1.position.x += largura / 2 - profundidade / 2; // Posiciona corretamente no eixo x

    // Cria o segundo painel vertical com rotação
    var ladp2 = MyTable.createMesh(new THREE.CubeGeometry(espessura, altura - profundidade, profundidade)); 
    ladp2.rotation.y += inclinacao; // Roda 90 graus em torno do eixo y
    ladp2.position.y += profundidade / 2; // Posiciona corretamente no eixo y
    ladp2.position.z += espessura / 2 + profundidade / 2; // Posiciona corretamente no eixo z
    ladp2.position.x -= largura / 2 - profundidade / 2; // Posiciona corretamente no eixo x

    // Adiciona todas as partes ao objeto mesa
    this.add(ladog1);
    this.add(ladog2);
    this.add(ladobase);
    this.add(ladp1);
    this.add(ladp2);
  }
  
  // Método estático para criar uma malha com uma geometria dada
  static createMesh(geom) {
    // Cria um material com uma cor sólida
    let meshMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    meshMaterial.side = THREE.DoubleSide; // Assegura que o material é de dupla face
    
    // Cria um material de wireframe (malha de arame)
    let wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true; // Define o modo wireframe
    
    // Cria um objeto multimaterial usando a geometria e ambos os materiais
    let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh; // Retorna a malha criada
  }
}
