## 🎬 Quadro a Quadro

Bem-vindo ao **Quadro a Quadro**\! 🍿

Este repositório contém o sistema de gerenciamento de cinema desenvolvido como trabalho prático da disciplina **Análise e Projeto de Software Orientado a Objeto (APSOO)**.

O objetivo do Quadro a Quadro é fornecer uma **aplicação desktop moderna e intuitiva** para a gestão completa de um cinema, abrangendo desde a **programação de sessões** . O projeto é construído com um stack de desenvolvimento atual e robusto, priorizando a manutenibilidade e a performance.

-----

## 🚀 Tecnologias Essenciais

| Tecnologia | Categoria | Descrição e Aplicação no Projeto |
| :--- | :--- | :--- |
| **Electron** | *Framework* Desktop | Utilizado para empacotar o aplicativo, permitindo que a aplicação *web* (Chromium) rode como um **programa desktop multiplataforma** (Windows, macOS e Linux), com acesso aos recursos de sistema via Node.js. |
| **React** | Biblioteca UI | Biblioteca JavaScript fundamental para a construção de **interfaces de usuário reativas** e organizadas, baseada no princípio de componentes reutilizáveis. |
| **Vite** | Ferramenta de *Build* | Atua como um **servidor de desenvolvimento e *build tool***, garantindo o carregamento instantâneo (*Hot Module Replacement*) e uma alta produtividade durante o desenvolvimento. |
| **TypeScript** | Linguagem | Superset do JavaScript que adiciona **tipagem estática**, essencial para garantir a robustez, legibilidade e **detecção precoce de erros** em projetos de médio a grande porte. |
| **Tailwind CSS** | Estilização | *Framework* de CSS utilitário que acelera o desenvolvimento de interfaces, oferecendo um controle granular sobre o estilo diretamente nas classes HTML. |
| **shadcn/ui** | Componentes | Coleção de **componentes React modernos e acessíveis**, construída sobre o Tailwind CSS, que assegura uma interface de usuário profissional e coesa. |
| **SQLite3** | Banco de Dados | Sistema de **banco de dados leve, sem servidor e local**, ideal para aplicações *desktop*. Armazena todos os dados de forma persistente no arquivo `.db` do usuário. |

-----

## 🧠 Conceitos de APSOO e Arquitetura Aplicados

O projeto foi estruturado para demonstrar a aplicação prática de conceitos-chave de Análise e Projeto de Software:

  * **Modelagem Orientada a Objetos (OO):** Implementação de classes de domínio com foco em atributos, métodos e relacionamentos coerentes.
  * **Arquitetura em Camadas:** Utilização da **Clean Architecture** para separar claramente a Interface, a Lógica de Aplicação e a Infraestrutura de Dados.
  * **Coesão e Encapsulamento:** Garantia de que cada classe, componente e módulo possua uma **responsabilidade única e bem definida**.
  * **Reutilização e Componentização:** Uso extensivo do React para criar componentes de interface independentes e reutilizáveis, simplificando a manutenção e a escalabilidade.
  * **Persistência de Dados:** Gerenciamento dos dados do sistema de forma permanente e local via **SQLite3**, implementando o padrão Repository para isolar a lógica de acesso ao banco.

-----

## 🎟️ Funcionalidades Implementadas

O Quadro a Quadro oferece as seguintes funcionalidades principais:

  * 🎞️ **Gerenciamento de Filmes:** CRUD (Cadastro, Consulta, Atualização e Exclusão) de filmes em cartaz.
  * 🎥 **Gerenciamento de Salas:** CRUD (Cadastro, Consulta, Atualização e Exclusão) de salas de cinema.

-----

## 💻 Como Executar o Projeto

Para configurar e iniciar o Quadro a Quadro em seu ambiente local, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/cineflow.git
    cd cineflow
    ```

2.  **Instale as dependências:**
    Utilize seu gerenciador de pacotes preferido:

    ```bash
    npm install
    # ou yarn install
    ```

3.  **Inicie o Ambiente de Desenvolvimento:**
    Execute os comandos em terminais separados:

      * **Interface (React/Vite):** Inicia o servidor de desenvolvimento.
        ```bash
        npm run dev
        ```
      * **Processo Principal (Electron):** Empacota e executa a aplicação *desktop*.
        ```bash
        npm run electron
        ```

> 🔔 **Banco de Dados:** O **SQLite3** é inicializado automaticamente no processo principal do Electron, criando o arquivo local `quadroaquadro.db` para persistência dos dados.

-----

## 🧾 Licença

Este projeto foi desenvolvido **exclusivamente para fins acadêmicos**, como parte da avaliação da **Disciplina de APSOO**.

Todos os direitos reservados aos integrantes do grupo.
