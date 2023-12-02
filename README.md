# Sistema de detecção de placas e controle de veículos de carga

## Integrantes

- Luís Henrique Lima Santos
- Luiz Eduardo Bronzeado Pessoa
- Lucas Bivar Fonseca Tavares
- João Victor Negreiros da Silva
- Jorge Vinicius Castro


## Descrição

A aplicação é voltada para controle do fluxo de veículos de carga, como caminhões em rodovias interestaduais.

O fluxo de pesagem passa a ser o seguinte:

1. Veículo de carga para em uma primeira cancela, onde são coletadas as informações da sua placa, as informações do motorista e informações de carga por intermédio da nota fiscal.
2. Após etapa 1, o veículo passa para uma plataforma, onde novamente ficará atrás de uma segunda cancela. O automóvel será pesado. Toda essa informação será guardada e atualizada em tempo real, podendo ser checada por meio de um aplicativo web.
3. Após pesagem e verificação dos dados e histórico do motorista, o veículo passa a segunda cancela, e é descarregado.
4. Após a descarga do veículo de carga, ele volta pela mesma segunda cancela e é pesado novamente. Nesta etapa é calculada a diferença de peso e comparada com o peso da carga descrito na nota fiscal.
5. Caso não haja nada suspeito e tudo esteja conforme, o automóvel será carregado e poderá seguir viagem
6. Caso contrário, motorista será encaminhado e veículo é detido

## Objetivo

Por meio do desenvolvimento desta aplicação, espera-se obter a automação parcial/total das etapas de verificação de veículos de carga.

O protótipo visa auxiliar no processo de coleta de informações de placas de veículos e dos seus motoristas, possibilitando um melhor controle no fluxo destes automíveis.

## Funcionamento

A tecnologia possibilitará realizar a detecção de placas por meio de uma camêra. Após a leitura e captura da placa, os dados são enviados para um servidor web mediante o protocolo MQTT, onde será confirmado os dados lidos e então é realizado a pesagem do veículo de carga e identificação do motorista. Com todos os dados coletados, é então feita a verificação se os dados cadastrados estão de acordo. Caso positivo, o fluxo é liberado, caso contrário, segue-se os protocolos policiais.

## Justificativa

Realizar monitaramente e controle de veículos de carga, bem como garantir que os mesmos circulando corretamente de acordo com normas fiscais, de valor de carga máxima permitida, até motorista cadastrado

## Requisitos funcionais

- Uma camêra, que permita a captura dos dados da placa
- Cadastro do motorista no sistema de controle
- Permitir a conexão entre a camêra $\Longleftrightarrow$ ESP 32 $\Longleftrightarrow$ api

## Requisitos não funcionais

- Garantir que não haja latência na comunicação entre os serviços
- Interface simples e intuitiva no aplicativo web, sempre guiando os proximos passos, para que os fiscais consiga realizar o controle sem complicações

## Softwares utilizados no projeto:

- **Linguagem de programação Python**: Utilizada para treinar um modelo de reconhecimento de placas de veículos
- **Linguagem de programação Javascript**: Utilizada para desenvolvimento da aplicação back-end e front-end
- **Linguagem de programação C**: Utilizada para funções no microcontrolador
- **MongoDB**: Banco de dados não relacional utilizado para armazenar todos os dados coletados


## Recursos para realização do projeto

- **1 ESP32**
- **1 web cam**
- **Plataforma de isopor**
- **Jumper**
- **Resistores**
- **Protoboard**
- **Serviço de hospedagem em cloud**
