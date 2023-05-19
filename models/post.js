const db = require("./banco")

const Registro = db.sequelize.define('registro',{
    nome:{
        type: db.Sequelize.STRING
    },
    marca:{
        type: db.Sequelize.STRING
    },
    modelo:{
        type: db.Sequelize.STRING
    },
    palavra:{
        type: db.Sequelize.TEXT
    },
    descricao:{
        type: db.Sequelize.TEXT
    }
})

//Registro.sync({force:true})

module.exports = Registro