import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos enviados pelo multer para que ele permaneça com o nome correto no windows
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ storage });

const routes = (app) => {
  // Habilita o servidor a interpretar dados no formato JSON nas requisições
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota para listar todos os posts (método GET)
  app.get("/posts", listarPosts);

  // Rota para criar um novo post (método POST)
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem (método POST)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  // Rota para atualizar o nome da imagem no banco (método PUT)
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;