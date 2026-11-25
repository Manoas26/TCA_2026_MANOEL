# Chat-O

> Aplicação web de bate-papo de texto com múltiplos chats simultâneos, identificação rápida do usuário ao acessar a página e armazenamento de mensagens no Supabase.

## Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)

## Sobre o Projeto

Este projeto permite que usuários entrem em uma aplicação web e participem de diferentes salas ou canais de conversa simultâneos. Ao abrir o site, o usuário informa seu nome por meio de um `prompt`, escolhe ou alterna entre os chats disponíveis e troca mensagens de texto persistidas no banco de dados do **Supabase**, sem depender de frameworks pesados ou servidor backend próprio.

## Funcionalidades

- [x] 3 chats ativos simultaneamente
- [x] Troca de texto entre usuários em cada sala/chat
- [x] Solicitação do nome do usuário ao entrar no site
- [x] Armazenamento de mensagens no banco de dados Supabase
- [ ] Atualização de mensagens em tempo real com Supabase Realtime

## Tecnologias Utilizadas

- **HTML5** — Estrutura da interface e áreas de chat
- **CSS3** — Estilização e layout das salas e mensagens
- **JavaScript (Vanilla JS)** — Captura do nome do usuário, alternância entre chats, envio/exibição de mensagens e comunicação com o Supabase
- **Supabase** — Banco de dados PostgreSQL e SDK/API para persistência das mensagens

## Estrutura do Projeto

```text
[TCA_2026_MANOEL]/
├── bdd/
|   └── bancoDeDados.sql
├── css /
|   ├── main.css
|   ├── modern-normalize.css
|   └── variables.css
├── js/
|   ├── script.js
|   └── env.js
├── index.html
└── README.md
