# 🎬 Quadro a Quadro

Bem-vindo ao **CineFlow**! 🍿
Um sistema de cinema desenvolvido como projeto da disciplina **Análise e Projeto de Software Orientado a Objeto (APSOO)**.

O objetivo é criar uma aplicação moderna e intuitiva que permita **gerenciar sessões, escolher filmes e realizar vendas de ingressos** — tudo dentro de um aplicativo desktop elegante, feito com **Electron + React + Vite + TypeScript**, estilizado com **Tailwind CSS + shadcn/ui**, e com **SQLite3** como banco de dados local.

---

## 🚀 Tecnologias Utilizadas

### ⚡ Electron

O **Electron** permite criar **aplicações desktop multiplataforma** (Windows, macOS e Linux) usando **tecnologias web**.
Ele combina o **Chromium** (para renderizar a interface) com o **Node.js** (para acessar recursos do sistema, como arquivos e banco de dados).
👉 Na prática, é o que transforma nossa aplicação web em um programa instalável de computador.

---

### ⚛️ React

O **React** é uma biblioteca JavaScript criada pelo Facebook para construir **interfaces de usuário (UI)** de forma reativa e organizada.
A ideia central é dividir a tela em **componentes reutilizáveis**, como botões, formulários e listas de filmes.

---

### ⚙️ Vite

O **Vite** é uma **ferramenta de build e servidor de desenvolvimento** extremamente rápida ⚡.
Ela permite **recarregar o app instantaneamente** durante o desenvolvimento e melhora muito a produtividade.
É o motor que faz nosso projeto React funcionar de forma leve e eficiente.

---

### 🧠 TypeScript

O **TypeScript** é um **superset do JavaScript**, ou seja, é o mesmo JavaScript, mas com **tipagem estática**.
Isso ajuda o desenvolvedor a **evitar erros antes mesmo da execução**, garantindo um código mais confiável e fácil de manter.

---

### 🎨 Tailwind CSS

O **Tailwind CSS** é um **framework de estilização** baseado em classes utilitárias.
Em vez de criar arquivos CSS separados, o Tailwind permite **escrever o estilo direto no componente**, usando classes como `bg-blue-500` (fundo azul) ou `text-center` (texto centralizado).
💡 Isso torna o desenvolvimento **rápido, consistente e altamente personalizável** — e é a base de estilização do **shadcn/ui**.

---

### 🪄 shadcn/ui

O **shadcn/ui** é uma **coleção de componentes React pré-prontos**, construída sobre o **Tailwind CSS**.
Ele fornece **componentes modernos e acessíveis**, como botões, inputs, modais e cards, totalmente personalizáveis.
👉 Ideal para criar uma interface bonita e coerente em pouco tempo.

---

### 🔔 Lucide Icons

O **Lucide** é um conjunto de **ícones em SVG** com visual limpo e moderno.
Ele é leve, fácil de integrar ao React e deixa o app mais visual e intuitivo (🎟️, 🎥, 🍿…).

---

### 🗃️ SQLite3

O **SQLite3** é um **banco de dados leve e local**, ideal para aplicações desktop.
Diferente de bancos como MySQL ou PostgreSQL, ele **não precisa de servidor** — todos os dados ficam armazenados em um arquivo `.db`.
🔹 Perfeito para manter os dados do cinema (filmes, sessões, ingressos) no próprio computador do usuário.

---

## 💻 Como Executar o Projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/cineflow.git
   cd cineflow
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

   ou, se preferir:

   ```bash
   yarn
   ```

3. **Execute o ambiente de desenvolvimento**

   ```bash
   npm run dev
   ```

   Isso iniciará o Vite com React e abrirá a interface no navegador.

4. **Inicie o Electron**

   ```bash
   npm run electron
   ```

   Esse comando empacota o React dentro de uma janela desktop.

5. **Banco de Dados**
   O SQLite3 é inicializado automaticamente (ou via script configurado).
   Ele cria um arquivo local `cineflow.db` para armazenar filmes, sessões e ingressos.

---

## 🎟️ Funcionalidades Principais

* 🎞️ **Listagem de filmes em cartaz**
* 🕐 **Escolha de sessões e horários**
* 🪑 **Seleção de assentos**
* 💳 **Compra e emissão de ingressos**
* 📊 **Relatórios de vendas (opcional)**

---

## 🧠 Conceitos de APSOO Aplicados

* **Orientação a Objetos**: modelagem de classes como `Filme`, `Sessao`, `Ingresso` e `Cliente`.
* **Camadas de Arquitetura**: separação entre interface (React), lógica (services) e dados (SQLite).
* **Reutilização e Componentização**: uso de componentes independentes no React.
* **Persistência de Dados**: armazenamento permanente com SQLite3.
* **Coesão e Encapsulamento**: cada classe e componente tem uma responsabilidade clara.

---

## 🧾 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos — **Disciplina de APSOO**.
Todos os direitos reservados aos integrantes do grupo.
