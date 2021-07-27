import { SiteClient } from 'datocms-client'

export default async function recebedordeRequest(request, response){
    
    if (request.method == 'POST'){
        const TOKEN = "35ea0cbec1b084f4791408f4ac5403";
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "1005626", // model ID
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "http://github.com/celsorgjr.png",
            // createSlug: "celsorgjr"
        })
    
        response.json({
            dados: "alguma dados aqui",
            registroCriado: registroCriado
        })

        return;
    }

    response.status(404).json({
        message : "Ainda não implementado method G"
    })
}