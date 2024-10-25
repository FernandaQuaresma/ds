const Sequelize = require("sequelize");

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

aluno.sync();
professor.sync();
nota.sync();



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

