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

// async function buscarPersonagens (){
//     let _, data = await banco
//     .from('personagens')
//     .select("*")
    
//     // console.log(data)
//     let _, data = await banco
//     return  await data
// }

// async function getItens() {
//     .from('itens')
//     .select('*')
    
//     // console.log(data)
//     return data
// }

async function getMessages() {
    let _, data = await banco
    .from('mensagem')
    .select('*')
    .contains('chat', chat)
    /*.limit(20 + m)
    
    var m = 0;
    m += 20;*/
    localMessages = await data.data;
    showMessages();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
     //console.log(data)
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

async function sendMessages(text) {
    let _, data = await banco
    .from('mensagem')
    .insert({ usuario: 1, chat: 1, hora: new Date().toLocaleString('sv-SE').replace(',', ''), texto: text })
// programar um sign in/login rudimentar mais funcional
// na real tem que fazer verificadores pra todos os bgls do insert :/

// dar uma olhada nos codigos do telecken pra ver como faz os botoes e como enviar ngc
    //console.log(data);
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
    getMessages();
    setInterval(getMessages, 200);
    // let personagens = await buscarPersonagens();
    // console.log(personagens);
}

main();

active.innerHTML = 'usuario atual: '+user;

ronaldo.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessages(user+": "+message.value);
})

chats.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      chat = parseInt(event.target.value);
      console.log(chat);
    });
  });