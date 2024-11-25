import express from "express"; // estamos chamando o arquivo express dentro da pasta express no node_modules
import routes from "./src/routes/postsRoutes.js";

// Criação do servidor Express
const app = express();
app.use(express.static("uploads")); // serve arquivos estáticos mostrando essa pasta local para os clientes
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
app.listen(3000, () => {
    console.log("Servidor escutando");
}); // A porta 3000 é utilizada como padrão para servidores locais

// // Função para  percorrer o array de posts e encontrar a posição específica
// // Number -> return Number
// function buscarPostPorID(id){
//     return posts.findIndex((post) => {
//         return post.id === Number(id); // === compara sem transformar o valor, obrigando o programador a fazer direito
//     });
// };

// //Criando uma rota para extrair 1 post específico
// app.get("/posts/:id", (req,res) =>{
//     const index = buscarPostPorID(req.params.id);
//     res.status(200).json(posts[index]); // Substituimos o .send por .json
// });


// // Criando dados em memória no começo da aplicação para testar a aplicação(MOCK)
// const posts = [
//     {
//         id: 1,  
//         descricao: "Uma foto teste",
//         imagem: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 2,
//         descricao: "Gato fazendo yoga",
//         imagem: "https://placecats.com/yoga/300/200"
//     },
//     {
//         id: 3,
//         descricao: "Gatinho com um chapéu",
//         imagem: "https://placecats.com/hat/250/300"
//     },
//     {
//         id: 4,
//         descricao: "Paisagem com um gato",
//         imagem: "https://placecats.com/landscape/400/300"
//     },
//     {
//         id: 5,
//         descricao: "Gato dormindo em uma caixa",
//         imagem: "https://placecats.com/box/350/250"
//     } //objeto da lista
// ]; // Lista de dados
