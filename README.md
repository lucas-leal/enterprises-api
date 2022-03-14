# enterprises-api

Para execução da API siga os seguintes passos:

* Certificar que a máquina possui o Docker e Docker Compose instalados
* Clonar o projeto direto do Github
* Na raiz do projeto executar o seguinte comando: `cp .env.dist .env`
* Rodar o comando `docker-compose up`
* Aguardar o build dos projetos
* Em outra aba do terminal executar o comando `./refresh-db.sh` para criar as tabelas e popular o banco de dados

A documentação da API está presente na raiz do projeto no arquivo `api.yml`

A API possui um mecanismo denominado Scopes que gerencia os endpoints que determinado usuário pode utilizar.
Na criação de um usuário é necessário informar um ou mais scopes separados por um espaço em branco.

Scopes e os endpoints que eles dão acesso:
* `users.list` - Listagem de usuários
* `users.create` - Criação de usuários
* `employees.list` - Listagem de funcionários
* `employees.create` - Criação de funcionários
