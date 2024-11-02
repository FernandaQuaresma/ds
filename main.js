  const express = require("express");
  const rotas = express();
  const Sequelize = require("sequelize");
  
  const cors = require("cors");
  rotas.use(cors());
  
  
  const conexaoComBanco = new Sequelize("projeto", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });
  
  // Tabela aluno
  const aluno = conexaoComBanco.define("aluno", {
      nome_aluno: {
          type: Sequelize.STRING,
      },
      email_aluno: {
          type: Sequelize.STRING,
      },
  });

  //Tabela professor
  const professor = conexaoComBanco.define("professor", {
      nome_professor: {
          type: Sequelize.STRING,
      },
      email_professor: {
          type: Sequelize.STRING,
      },
      materia: {
          type: Sequelize.TEXT, 
      },
  });


  //Tabela nota 
  const nota = conexaoComBanco.define("nota", {
      id_aluno: {
          type: Sequelize.INTEGER,
          allowNull: false,
          References: {
              model: aluno,
              key: "id"
          }
      },
      id_professor: {
          type: Sequelize.INTEGER,
          allowNull: false,
          References: {
              model: professor,
              key: "id"
          }
      },
      nota: {
          type: Sequelize.FLOAT,
      },
      materia: {
          type: Sequelize.TEXT,
          allowNull: false,
          References: {
              model: professor,
              key: "materia"
          }
      },
  });

  aluno.sync({ force: false });
  professor.sync({ force: false });
  nota.sync({ force: false });


  aluno.create({
    nome_aluno: "Mariana Rios Barbosa",
    email_aluno: "mari.rios@gmail.com",
  });



  professor.create({
    nome_aluno: "Marcela Rodrigues de Oliveira",
    email_aluno: "prof.marcelaoliveira@gmail.com",
  });


  nota.create({
    id_aluno: "Mariana Rios Barbosa",
    id_professor: "Marcela Rodrigues de Oliveira",
    nota: "8,5",
    materia: "História",
  });




  rotas.get("/", function (req, res) {
    res.send("Rota principal");
  });
  
  rotas.get("/salvar/:nome_aluno/:email_aluno", async function (req, res) {
    const { id, nome_aluno, email_aluno} = req.params;
  
    const novoAluno = await Estoque.create({ id, nome_aluno, email_aluno}); //função que espera
  
    res.json({
      resposta: "Aluno cadastrado com sucesso",
      Produto: novoAluno,
    });
  });
  
  rotas.get("/deletar/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10); // Converte o ID para número
  
    const deleted = await Estoque.destroy({
      where: { id: idNumber },
    });
  
    if (deleted) {
      res.json({ mensagem: "Aluno deletado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
  });
  
  rotas.get("/editar/:nome_aluno/:email_aluno", async function (req, res) {
    const { id, nome_aluno, email_aluno } = req.params;
    const idNumber = parseInt(id, 10); // Converte o ID para número
  
    const [updated] = await projeto.update(
      {id, nome_aluno, email_aluno},
      {
        where: { id: idNumber }, // Usa o ID numérico
      }
    );
  
    res.json({
      mensagem: "Produto atualizado com sucesso",
    });
  });
  
  rotas.get("/mostrar", async function (req, res) {
    try {
        const projeto = await aluno.findAll(); // Busca todos os registros
        res.json(projeto); // Retorna os registros em formato JSON
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar aluno: ${error}` }); // Retorna erro ao cliente
    }
  });
  
  
  
  //###Servidor###
  rotas.listen(3031, function () {
    console.log("Server is running on port 3306");
  });