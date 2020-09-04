# Coddera_CallbackWidegt

## Requerimentos

  Para o desenvolvimento e publicação você precisará apenas do Node.js e do Git instalados em seu ambiente.

### Node
- #### Instalação do Node no Windows

  Acesse [official Node.js website](https://nodejs.org/) e faça o download do instalador.

- #### Instalação do Node no Ubuntu
  Instale o nodejs e o npm via apt install, basta executar os seguintes comandos.
  
      $ sudo apt install nodejs
      $ sudo apt install npm

  Verifique de as instalações foram feitas com socesso.
    (Não há necessidade de versão específica para o Node nem para o NPM)
    
    $ node --version
    v10.16.3

    $ npm --version
    6.9.0

Se você precisar atualizar o `npm`, poderá fazê-lo usando o` npm`! 

    $ npm install npm -g

### Git
- #### Instalação do Git no Windows

  Acesse (https://git-scm.com/downloads) e faça o download do instalador.

- #### Instalação do Git no Ubuntu
  Instale o git via apt install, basta executar os seguintes comandos.
  
      $ sudo apt-get install git

  Verifique de as instalações foram feitas com socesso.
    (Não há necessidade de versão específica para o Git)
    
    $ git --version
    git version 2.26.0


## Instalação

    $ git clone https://github.com/PrototypeIdeas/Coddera_CallbackWidegt.git
    $ cd Coddera_CallbackWidegt
    $ npm install

## Configure a Aplicação

  Abra `/app/public/coddera_widget.js` e edite a variável host na primeira primeira linha com o host público do servidor onde está sendo instalado.

  No arquivo /config/purecloudConfig.js estão as configurações do Purecloud que poderão ser editadas conforme conveniência.

## Rodando o projeto
  
  Na pasta raiz execute o comando.
  
    $ node app.js
  
  Para produção é aconselhado utilizadar um gerenciador de processos Node.js. Ex: PM2 (https://pm2.keymetrics.io/)

## Utilizando widget

Inserir as seguintes linhas na página.
	
	<div id="purecloud-callback"></div>
	
	<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" 		crossorigin="anonymous"></script>
	
	<script type="text/javascript" src="http://localhost:3000/coddera_widget.js"></script>

O widget será construido na div - purecloud-callback (atenção para o host na chamada do coddera_widget.js, alterar se necessário)

## API
  
  Utilizando a API de Callback Purecloud

  URL: http://localhost:3000/coddera-callback-widget/create
  
  Body: {
	        "name":"Teste",
	        "phone":"11999972564"
        }
  (name e phone são obrigatórios)
  
  Respostas:
    
    Sucess:
      status: 201 Created
      body: {
                "conversation": {
                    "id": "ed5d228d-8ca6-4f46-8cf1-af3b2e5dee5c",
                    "selfUri": "/api/v2/conversations/ed5d228d-8ca6-4f46-8cf1-af3b2e5dee5c"
                },
                "callbackIdentifiers": [
                    {
                        "type": "EXTERNAL",
                        "id": "3079bf78-3b12-4eb6-b8b1-f7a476c7d896"
                    },
                    {
                        "type": "ACD",
                        "id": "31247109-e860-4388-b1e4-da0f3aeb3460"
                    }
                ]
            }
            
     Error:
      status: 400 BadRequest (Parametro phone vazio)
      body: [
              {
                  "location": "body",
                  "param": "phone",
                  "msg": "Parametro {phone} é obrigatório",
                  "value": ""
              }
            ]
      
      
      status: 400 BadRequest (Parametro name vazio)
      body: [
              {
                  "location": "body",
                  "param": "name",
                  "msg": "Parametro {name} é obrigatório",
                  "value": ""
              }
            ]
    
  
