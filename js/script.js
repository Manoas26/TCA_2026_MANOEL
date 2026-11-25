const user = prompt("Insira nome de usuário.\n Nome deve ser maior que 3 caracteres e menor que 15 caracteres.");
const { createClient } = supabase;
const sendButton = document.querySelector('#send');
const active = document.querySelector("#active");
const ronaldo = document.querySelector("#ronaldo");
const messagesContainer = document.querySelector('.messages');
const chats = document.querySelectorAll('input[name="batepapo"]');
const busca_box = document.querySelector('#busca-box');
const busca_btn = document.querySelector('#busca-btn');
const encontrado = document.querySelector('#encontrado');

let chat = 0;
let message = document.querySelector('#message');
let localMessages = [];
let found = [];
let abriuAgora = true;

const banco = createClient(
    config.url,
    config.publishableKey
)

if (!user || user.length < 3 || user.length > 15) {
    alert("Nome de usuário inválido. Por favor, insira um nome entre 3 e 15 caracteres.");
    window.location.reload();
}

async function getMessages() {
    let _, data = await banco
    .from('mensagem')
    .select('*')
    .eq('chat', chat)

    localMessages = await data.data;
    showMessages();
     console.log(data);
    return data
}

async function showMessages() {
    messagesContainer.innerHTML = '';
            localMessages.forEach(mensagem => {
                messagesContainer.innerHTML += `
                    <div class="message-card" id="message-${mensagem.id}">
                        <p>${mensagem.texto} (${mensagem.hora})</p>
                    </div>
                `;
            });

    if (isNearBottom(messagesContainer) || abriuAgora) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        abriuAgora = false;
    }
}

async function sendMessages(text, chat) {
    let _, data = await banco
    .from('mensagem')
    .insert({ chat: chat, hora: new Date().toLocaleString('sv-SE').replace(',', ''), texto: text })

    console.log(data);
    message.value = "";
    return data
}

// LOGIN
async function entrar() {
    const email = config.email

    const senha = config.senha

    const { data, error } =
        await banco.auth.signInWithPassword({
            email: email,
            password: senha
        });

    if (error) {
        console.log( error.message);
        return;
    }
}

function isNearBottom(con) {
  return ((con.scrollHeight - con.scrollTop - con.clientHeight) <= 80);
}

async function main() {
    await entrar();
    getMessages(chat);
    setInterval(getMessages, 200);
}

main();

active.innerHTML = 'usuario atual: '+user;

ronaldo.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessages(user+": "+message.value, chat);
})

chats.forEach((radio) => {
    radio.addEventListener('change', (event) => {
        abriuAgora = true;
        chat = parseInt(event.target.value);
      console.log(chat);
    });
  });

busca_btn.addEventListener('click', async () => {
    let _, data = await banco
    .from('mensagem')
    .select('*')
    .ilike('texto', `%${busca_box.value}%`)

    found = await data.data;
     console.log(data);

    if (busca_box.value === '') {
        encontrado.innerHTML = '';
        return;
    }
    if (found.length === 0) {
        encontrado.innerHTML = 'Nada encontrado';
        return;
    }

     encontrado.innerHTML = '';
            found.forEach(mensagem => {
                encontrado.innerHTML += `
                    <div class="found-card" id="found-${mensagem.id}">
                        <p>${mensagem.texto} (${mensagem.hora}, chat: ${mensagem.chat})</p>
                    </div>
                `;
            });

    return data
});

  //aprende a usar realtime para atualizar a tela sem precisar ficar dando refresh, e tbm aprende a usar o .on() para ficar escutando os eventos do banco de dados