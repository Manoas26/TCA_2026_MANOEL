const { createClient } = supabase;
const sendButton = document.querySelector('#send');
const messagesContainer = document.querySelector('.messages');
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
    /*.limit(20 + m)
    
    var m = 0;
    m += 20;*/
    localMessages = await data.data;
    showMessages();
     console.log(data)
    return data
}

async function showMessages() {
    messagesContainer.innerHTML = '';
            localMessages.forEach(mensagem => {
                messagesContainer.innerHTML += `
                    <div class="message-card" id="message-${mensagem.id}">
                        <p>${mensagem.usuario}: ${mensagem.texto} (${mensagem.hora})</p>
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
    console.log(data);
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
    // let personagens = await buscarPersonagens();
    // console.log(personagens);
}

main();

sendButton.addEventListener('click', (event) => {
    sendMessages(message.value);
})