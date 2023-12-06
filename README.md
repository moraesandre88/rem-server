# REM-Server

Olá! Seja bem-vindo. Esse é um servidor para um sistema de gerenciamento imobiliário utilizando Node.js, Express.js e MongoDB. Ele faz parte do projeto REM junto ao [REM-System](https://github.com/moraesandre88/rem-system) e o REM-Site, todos em desenvolvimento. 

## Configurações iniciais

Uma vez que esteja com o Rem-Server na sua máquina, algumas configurações terão de ser feitas para que o servidor e alguns de seus serviços operem de forma correta. As etapas estão detalhadas na listagem logo abaixo.

### 1. Npm

Antes de mais nada, vale lembrar de instalar as dependências necessárias para que o projeto funcione. No seu terminal, navegue até a pasta do projeto `rem-server` e execute o comando: `npm i`. Uma vez que tudo esteja instalado, pode avançar para as demais etapas.

### 2. MongoDB

Como dito anteriormente, o servidor utiliza o [MongoDB](https://www.mongodb.com/pt-br) para armazenar seu banco de dados. Caso já possua uma conta e um cluster ativo, pode utilizá-los. Do contrário, utilize o link acima para acessar o serviço e criar os mesmos. Uma vez criados, será necessário estabelecer a conexão com o projeto. Para tal, acesse sua conta, seu cluster e vá em `Connect`. Selecione a opção `Drivers` em `Connect to your application`. Copie o link que aparecerá na opção `Add your connection string into your application code`. De volta ao REM-Server, crie um aquivo `.env` na raiz do projeto nele, crie um variavel chamada `DATABASE_URI`. Essa é a variável que irá armazenar o link copiado do MongoDB. Modifique as informações do link para inserir sua senha. 

### 3. Cloudinary

Para a hospedagem das fotos, foi utilzado o [Cloudinary](https://cloudinary.com/). Assim como o MongoDB, será necessário criar uma conta para sua utilização, caso já não possua uma. Acessando o link acima, será direcionado para a home page do serviço onde poderá se cadastrar. Feito isso, acesse sua conta verifique as variáveis necessárias para configurar o serviço em seu porjeto. São três: `cloud_name`, `api_key` e `api_secret`. As duas primeiras são públicas, mas é terceira está protegida. Para acessá-la, vá até o menu lateral e clique em `Settings`. Em seguida, no menu lateral, busque por `Access Keys`. Uma página será aberta com sua `API Key` e `API Secret`, com essa última ainda protegida. Para visualizá-la, passe o cursor por cima da mesma e a opção de visualização irá aparecer a direita. Clique nela. Uma senha será enviada para o e-mail cadastrado confirmando para que confirme que deseja verificar a variável. Digite essa senha no campo indicado e poderá vê-la e copiá-la. De volta ao REM-Server, vá até o arquivo `.env` e crie três variáveis: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` e `CLOUDINARY_API_SECRET`. Salve as variáveis de configuração nas suas respectivas variáveis de ambiente para terminar. Há mais uma `configuração opcional` que pode ser feita. É possível definir uma pasta `default` para armazenar suas fotos no Cloudinary. Para tal, vá de novo em `Settings` na sua conta e depois em `Upload`. Busque por `Upload presets` na página que abrir. Lá, você pode criar sua pasta padrão, nomeá-la e, no REM-Server, utilizar a mesma ao fazer upload das imagens. Para tal, abra o arquivo `imagesStoring.js` em `config` e defina a mesma em `upload_preset`. Note que essa foi a abordagem adotada na criação do arquivo e que a pasta se chama `assets`. Como mencionado, essa ação é `opcional`. Caso não queira realizá-la, basta não criar a pasta no Cloudinary e deletar o objeto que contém o nome da pasta em `imagesStoring.js`.

## Iniciando o servidor

Após a configuração, abra seu terminal, vá para `rem-server` e execute o comando `npm run dev`. Pronto, seu servidor já está rodando e pronto para ser usado. 

## Observações

Ao utilizar o [REM System](https://github.com/moraesandre88/rem-system) para acessar o sistema e fazer requisições ao servidor, você precisará criar usuário e senha. Ao criar o primeiro usuário, serão criados também os `tokens de acesso e de refresh`. Ambos serão armazenados no arquivo `.env` e será necessário reiniciar seu servidor nesse momento. Essa ação deve ser feita somente nessa vez.

É possível também não utilizar o sistema e testar o servidor utilzando o [Thunder Client](https://www.thunderclient.com/) ou o [Postman](https://www.postman.com/). Em ambos os casos, será necessário alterar as configurações de segurança para o uso de cookies em dois arquivos: `authController.js` e `refreshTokenController.js`. Na linha de código onde o cookie está sendo criado, mude a opção `secure` de `true` para `false`. Isso é necessário para o envio de cookies quando se utiliza um dos dois serviços e um servidor local. 
