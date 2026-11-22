const { createClient } = supabase;
const user = prompt("Insira seu nome");
const sendButton = document.querySelector('#send');
const active = document.querySelector("#active");
const ronaldo = document.querySelector("#ronaldo");
const messagesContainer = document.querySelector('.messages');
const chats = document.querySelectorAll('input[name="batepapo"]');
let chat = 0;
let message = document.querySelector('#message');
let localMessages = [];

const banco = createClient(
    config.url,
    config.publishableKey
)

async function getMessages() {
    let _, data = await banco
    .from('mensagem')
    .select('*')
    .eq('chat', chat)
    /*.limit(20 + m)
    
    let m = 0;
    m += 20;*/
    localMessages = await data.data;
    showMessages();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
}

async function sendMessages(text, chat) {
    let _, data = await banco
    .from('mensagem')
    .insert({ usuario: 1, chat: chat, hora: new Date().toLocaleString('sv-SE').replace(',', ''), texto: text })

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
    // console.log(data.user.email);
}

async function main() {
    await entrar();
    getMessages(chat);
    setInterval(getMessages, 200);
    // let personagens = await buscarPersonagens();
    // console.log(personagens);
}

main();

active.innerHTML = 'usuario atual: '+user;

ronaldo.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessages(user+": "+message.value, chat);
})

chats.forEach((radio) => {
    radio.addEventListener('change', (event) => { //conserta isso
      chat = parseInt(event.target.value);
      console.log(chat);
    });
  });

  //aprende a usar realtime para atualizar a tela sem precisar ficar dando refresh, e tbm aprende a usar o .on() para ficar escutando os eventos do banco de dados