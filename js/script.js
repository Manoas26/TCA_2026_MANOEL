const { createClient } = supabase;

const banco = createClient(
    config.url,
    config.publishableKey
)

// async function buscarPersonagens (){
//     let _, data = await banco
//     .from('personagens')
//     .select("*")
    
//     // console.log(data)
//     return  await data
// }

// async function getItens() {
//     let _, data = await banco
//     .from('itens')
//     .select('*')
    
//     // console.log(data)
//     return data
// }

async function getMessages() {
    let _, data = await banco
    .from('mensagem')
    .select('usuario.nome, mensagem.texto, mensagem.hora')
    
    // console.log(data)
    return data
}

async function sendMessages(texto) {
    let _, data = await banco
    .from('mensagem')
    .insert({ usuario: 1, chat: 1, hora: '0001-01-01 01:01:01', texto: this.texto })
// programar um sign in/login rudimentar mais funcional
// na real tem que fazer verificadores pra todos os bgls do insert :/

// dar uma olhada nos codigos do telecken pra ver como faz os botoes e como enviar ngc
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