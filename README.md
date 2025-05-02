# **CG-PROJECT**

Simulador de Armazém com WebGL e Interface Gráfica em JavaScript

Este repositório contém a implementação de um simulador 3D interativo desenvolvido no âmbito da unidade curricular de **Computação Gráfica**, do curso de **Engenharia Informática**. O projeto visa representar, de forma visual e funcional, um **armazém automatizado** com **robôs móveis**, **estantes**, **caixas**, e uma interface gráfica que permite manipular e observar o funcionamento do sistema.

---

## Objetivo

O principal objetivo deste projeto é:

-   Desenvolver uma simulação gráfica 3D de um **armazém automatizado** com WebGL.
-   Implementar a lógica de movimentação e comportamento de **robôs que transportam caixas**.
-   Criar uma **interface gráfica (GUI)** interativa com controlos para gerir o sistema.
-   Aplicar conceitos de **modelação 3D**, **transformações geométricas**, **renderização WebGL** e **programação orientada a objetos em JavaScript**.

---

## Funcionalidades

### Simulação do Armazém

-   Visualização 3D de um armazém com **estantes**, **caixas** e **robôs**.
-   Simulação do comportamento dos robôs, que vão buscar caixas às estantes e colocam-nas noutras posições.
-   Representação realista das dimensões e espaços no ambiente.

### Interface Gráfica (GUI)

-   **Seleção de robôs e caixas**.
-   Atribuição de comandos diretamente através da interface.
-   Visualização em tempo real das ações no cenário 3D.
-   Controlo da **câmera e perspetiva** para observar diferentes zonas do armazém.

---

## Tecnologias Utilizadas

-   **JavaScript (ES6+)**
-   **WebGL** – Renderização gráfica 3D
-   **HTML5** – Estrutura da aplicação
-   **CSS3** – Estilização base
-   **Dat.GUI** – Interface gráfica interativa

---

## Estrutura do Projeto

```bash
CG-PROJECT/
│
├── Armazem.js         # Representação e lógica do armazém
├── Caixa.js           # Classe e comportamentos das caixas
├── Estante.js         # Classe para estruturas de estantes
├── Robot.js           # Comportamento e lógica dos robôs
├── MyGui.js           # Criação da interface com dat.GUI
├── Webgl.js           # Setup e renderização do WebGL
├── projeto.html       # Entrada principal da aplicação (front-end)
└── README.md          # Este documento

```

---

## Como Executar o Projeto

1.  **Clonar o repositório:**

```bash
git clone https://github.com/Pelinho03/CG-project.git

```

2.  **Navegar para o diretório do projeto:**

```bash
cd CG-project

```

3.  **Abrir o projeto no browser:**

Abre o ficheiro `projeto.html` com o teu navegador preferido (de preferência o **Chrome** ou **Firefox**).

> **Nota:** Certifica-te que estás a servir os ficheiros com um servidor local (ex. extensão Live Server no VS Code), pois o WebGL pode ter restrições ao correr ficheiros localmente (`file://`).

---

## Ideia Central

> Este projeto simula o funcionamento de um **armazém automatizado**, integrando conceitos de computação gráfica e programação em tempo real. Através da utilização de WebGL e lógica orientada a objetos, o sistema permite observar como robôs podem cooperar para movimentar objetos num espaço tridimensional.

---

## Desenvolvido por

**Paulo Guimarães**  
[GitHub](https://github.com/Pelinho03)
