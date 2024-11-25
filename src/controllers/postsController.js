import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js"; // quando exportamos mais de uma função, precisamos especificar elas num objeto.
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req,res){
    // Criando uma rota GET para buscar todos os posts.
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (sucesso) e os posts no formato JSON.
    res.status(200).json(posts); // Substituimos o .send por .json
}

export async function postarNovoPost(req,res) {
    const novoPost = req.body; //envia os dados no body da mensagem
    //tenta fazer mas se não fizer, não quebra o sistema
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"}); // Utilizamos uma mensagem padrão e não enviamos o erro pro cliente por questões de segurança.
    }
}

export async function uploadImagem(req,res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    
    }; //envia os dados no body da mensagem
    //tenta fazer mas se não fizer, não quebra o sistema
    
    
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);//biblioteca de arquivo do node
        res.status(200).json(postCriado);
    } catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"}); // Utilizamos uma mensagem padrão e não enviamos o erro pro cliente por questões de segurança.
    }
}

export async function atualizarNovoPost(req,res) {
    const id = req.params.id; 
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"}); // Utilizamos uma mensagem padrão e não enviamos o erro pro cliente por questões de segurança.
    }
}