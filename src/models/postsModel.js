import "dotenv/config"; // addon pra fazer as varoáveis de ambiente serem enxergadas pela cloud
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";// No front, não precisa do .js, no node, precrisa. ../ volta uma pasta

// conecta ao banco de dados utilizando a string de conexão utilizando a variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); 

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-instaby'.
    const db = conexao.db("imersao-instaby");
    // Seleciona a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection("posts");
    // Retorna todos os documentos (posts) da coleção como um array.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    // Seleciona o banco de dados 'imersao-instaby'.
    const db = conexao.db("imersao-instaby");
    // Seleciona a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection("posts");
    // função padrão da documentação do mongo
    return colecao.insertOne(novoPost);
    
}

export async function atualizarPost(id, novoPost) {
    // Seleciona o banco de dados 'imersao-instaby'.
    const db = conexao.db("imersao-instaby");
    // Seleciona a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id); // coloca o id num objeto entendido pelo mongo

    // função padrão da documentação do mongo
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
    
}