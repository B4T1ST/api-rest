use "nome do banco"
go

CREATE TABLE Itens (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Descricao VARCHAR(255)
    Valor INT
);