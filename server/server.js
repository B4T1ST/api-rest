const express = require('express');
const app = express();
const sql = require('mssql');
const port = 3001;

const config = {
    user: 'banco',
    password: '33580887',
    server: '',
    database: 'teste1',
    options: {
        encrypt: false,
    }
};

app.use(express.json());

// rota para criaçao de novo produto
app.post('/api/itens', async(req,res) => {
    try {
        const pool = await sql.connect(config);
        const {nome, descricao, valor} = req.body;
        const id = 0;
        const newId = id + 1;
        const result = await pool
            .request()
            .input('Id',sql.Int, newId)
            .input('Nome', sql.VarChar, nome)
            .input('Descricao', sql.VarChar, descricao)
            .input('Valor', sql.Int, valor)
            .query('INSERT INTO Itens (Id, Nome, Descricao, Valor) VALUES(@id, @Nome, @Descricao, @Valor)');
        res.status(201).json({ message: 'item criado com sucesso'});
    } catch (error){
        res.status(500).json({ error: 'Ocorreu um erro na criaçao do item'});
    }
});
// rota para consultar todos itens
app.get('/api/itens', async (req, res) =>{
    try{
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Itens');

        res.status(200).json(result.recordset);
    } catch(error) {
        res.status(500).json({ error: 'Ocorreu um erro na exibiçao dos usuarios'});
    }
});
//rota para dar update no produto
app.put('/api/itens/:id', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const { id } = req.params;
        const { Nome, Descricao, Valor} = req.body;
        const result = await pool
            .request()
            .input('Nome', sql.VarChar, nome)
            .input('Descricao', sql.VarChar, descricao)
            .input('Valor', sql.Int, valor)
            .input('Id', sql.Int, id)
            .query('UPDATE Itens SET Nome = @Nome, Descricao = @Descricao, Valor = @Valor WHERE Id = @Id');
        res.status(200).json({ message: 'item modificado com sucesso'});
    } catch(error){
        res.status(500).json({error: 'Ocorreu um erro na atualizaçao do produto'});
    }
});
//rota para deletar produto
app.delete('/api/items/:id', async (req, res) => {
    try {
      const pool = await sql.connect(config);
      const { id } = req.params;
      const result = await pool
        .request()
        .input('Id', sql.Int, id)
        .query('DELETE FROM Items WHERE Id = @Id');
  
      res.status(200).json({ message: 'Item excluído com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
  });

app.listen(port, () => {
    console.log(`Servidor rodando na porta '${port}`);
});