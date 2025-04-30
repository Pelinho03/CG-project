'use strict';

// Define a classe `Webgl` para configurar e renderizar uma cena 3D
class Webgl {

  // Função construtora para inicializar o ambiente WebGL
  constructor() {
        
    this.clock = new THREE.Clock(); // Relógio para medir o tempo entre frames

    this.scene = new THREE.Scene(); // Cria uma nova cena
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); // Cria uma câmara perspetiva

    this.group = new THREE.Group(); // Cria um grupo para organizar objetos na cena
    

    // Cria um renderizador e define o seu tamanho
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0xEEEEEE); // Define a cor de fundo do renderizador
    this.renderer.setSize(window.innerWidth, window.innerHeight); // Define o tamanho do renderizador
    this.renderer.shadowMapEnabled = true; // Ativa o mapeamento de sombras

    // Posiciona e orienta a câmara para o centro da cena
    this.camera.position.x = 100;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
    this.camera.lookAt(this.scene.position);
        
    // Configura os controlos da câmara (TrackballControls)
    this.trackballControls = new THREE.TrackballControls(this.camera);
    this.trackballControls.rotateSpeed = 1.0;
    this.trackballControls.zoomSpeed = 1.0;
    this.trackballControls.panSpeed = 1.0;
    this.trackballControls.staticMoving = true;

    // Configura os controlos da câmara (FirstPersonControls)
    this.CamControls = new THREE.FirstPersonControls(this.camera);
    
    // Configura os controlos da câmara (FlyControls)
    this.FlyControls = new THREE.FlyControls(this.camera);

    // Configura os controlos da câmara (OrbitControls)
    this.orbitControls = new THREE.OrbitControls(this.camera);
    
    // Adiciona a saída do renderizador ao elemento HTML
    $("#WebGL-output").append(this.renderer.domElement);

    this.gui = new GUI(this); // Cria a interface gráfica do utilizador (GUI)
  }
  
  // Método para renderizar a cena
  render() {
    let delta = this.clock.getDelta(); // Obtém o tempo desde o último frame
    this.trackballControls.update(delta); // Atualiza os controlos Trackball
    this.orbitControls.update(delta); // Atualiza os controlos Orbit
    this.CamControls.update(delta); // Atualiza os controlos de Primeira Pessoa
    this.FlyControls.update(delta); // Atualiza os controlos de Voo
    
    // Renderiza a cena
    this.renderer.render(this.scene, this.camera);
  }

}
