# Sistema de detecção de placas e controle de veículos de carga

Leia sobre nosso projeto clicando [aqui](./README.md)

Acesso nosso projeto em: [sistema de detecção de placas](https://jifxwj4sxqahefy5o-projetos-faculdade.svc.zcloud.ws/)

## Pré-requisitos

Antes de fazer da aplicação, você precisará instalar:

**Back-end**:
- Instalação do [Node.js](https://nodejs.org/en)
- Instalação do [MongoDB](https://www.mongodb.com/docs/manual/installation/)
- Definir variáveis de ambiente

```shell
touch .env
```

No arquivo `.env`, defina:

```txt
MONGO_CONNECTION_URL=mongodb+srv://user:pass@cluster
DB_NAME=PrototipagemDb
```

**Front-end**
- Instalação do [Node.js](https://nodejs.org/en)

Nos arquivos `utils/api.js` e `utils/websocket.js` alterar as URLs da api e do webscoket caso deseje se conectar com o backend rodando na sua maquina local


**Para detecção de placas de veículos**
- Instalação do [Python](https://www.python.org/)

**Nota**:

Para que as bibliotecas funcionem corretamente, recomendamos que utilize a versão 3.11.5 (intale clicando nesse [link](https://www.python.org/downloads/release/python-3115/)). Isso porque a biblioteca ultralytics é melhor compatível com essa versão

Além disso, todo o projeto foi pensado para rodar localmente em sistema linux. Caso encontre algum erro, leia a seção [Seção de possíveis erros](#erros-e-soluções)

## Executando

```shell
git clone git@github.com:joaovictornsv/projeto-prototipagem.git
```

É possível executar as 3 partes do projeto separadamente

**Front-end**

```shell
$ cd frontend
$ npm install
$ npm run dev
```

**Back-end**

```shell
$ cd backend
$ npm install 
$ npm run start
```

Para ter acesso a documentação dos endpoints, execute o comando abaixo:
```shell
$ npx jsdoc ./ ./collections
```

A documentação estará em um arquivo index.html dentro de uma pasta out.

**Broker MQTT**

Instalando o Mosquitto

```shell
$ sudo apt-get update -y && sudo apt-get upgrade -y
$ sudo apt-get install mosquitto
$ sudo apt-get install mosquitto
```

Configurando o Mosquitto

-  Crie um arquivo de configuração:
```shell
$ sudo vim /etc/mosquitto/conf.d/default.conf
```

- Dentro do arquivo insira:
```
listener 1883 0.0.0.0
allow_anonymous true
```

- Reinicie o Mosquitto:
```shell
$ service mosquitto stop
$ service mosquitto start
```

**Detecção de placas**

- Configurando script:
    - No arquivo main, localize a constante BROKER e altere o seu valor "BROKER_IP" para o IP do seu Broker MQTT.
```py
BROKER = "BROKER_IP"
```

- Rodando script:
```shell
$ cd plate-recognition
$ pip install -r requirements
$ python3 main.py
```

**ESP 32**

- Configurando Firwmare:
    - Identifique no código as constantes abaixo e faça a substituição da sua rede de internet, a senha, e o IP do seu Broker MQTT.
```cpp
const char* ssid = "SEU_SSID";
const char* password =  "SUA_PASSWORD";
const char* mqttServer = "IP_BROKER_MQTT";
```

### Tecnologias
- Node.js
- Python
- Linguagem C++
- React.js
- MongoDB
- Mosquitto

### Erros e soluções

- [Instalação do ultralytics](https://stackoverflow.com/questions/75356032/error-in-installing-ultralytics-in-python-as-they-have-conflicting-dependencies)
- [(Github Issue) AttributeError: module 'PIL.Image' has no attribute 'ANTIALIAS' #1077
](https://github.com/JaidedAI/EasyOCR/issues/1077)
- [(Stackoverflow) AttributeError: module 'PIL.Image' has no attribute 'ANTIALIAS'](https://stackoverflow.com/questions/76616042/attributeerror-module-pil-image-has-no-attribute-antialias)
- [No module named 'ultralytics.utils' #3856](https://github.com/ultralytics/ultralytics/issues/3856)
