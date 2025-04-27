# Estrutura de Pastas e Explicação dos Componentes

## Estrutura do Projeto

    desafio-final-bootcamp/
    ├── src/
    │ ├── controllers/ # Controladores (manipuladores de rotas)
    │ │ ├── AuthController.ts # Autenticação
    │ │ ├── OrderController.ts # Operações CRUD de pedidos
    │ │ ├── ProductController.ts # Gestão de produtos
    │ │ └── UserController.ts # Gestão de usuários
    │ │
    │ ├── database/ # Configuração do banco de dados
    │ │ └── database.ts # Pool de conexões MariaDB
    │ │
    │ ├── dto/ # Objetos de Transferência de Dados
    │ │ ├── ProductRequestDTO.ts # Validação de entrada de produtos
    │ │ ├── UserRequestDTO.ts # Validação de entrada de usuários
    │ │ └── UserResponseDTO.ts # Formatação de saída de usuários
    │ │
    │ ├── middlewares/ # Middlewares do Express
    │ │ └── validationErrors.ts # Tratamento de erros de validação
    │ │
    │ ├── models/ # Entidades de domínio
    │ │ ├── Order.ts # Modelo de negócio de pedidos
    │ │ ├── Product.ts # Entidade de produtos
    │ │ └── User.ts # Entidade de usuários
    │ │
    │ ├── repositories/ # Camada de acesso a dados
    │ │ ├── OrderRepository.ts # Interface do repositório de pedidos
    │ │ ├── OrderRepositoryImp.ts # Operações no banco
    │ │ ├── ProductRepository.ts # Interface de produtos
    │ │ ├── ProductRepositoryImp.ts # Operações de produtos
    │ │ ├── UserRepository.ts # Interface de usuários
    │ │ └── UserRepositoryImp.ts # Operações de usuários
    │ │
    │ ├── routes/ # Definição de rotas
    │ │ ├── authRouter.ts # Rotas de autenticação
    │ │ ├── orderRouter.ts # Rotas de pedidos
    │ │ ├── productRouter.ts # Rotas de produtos
    │ │ └── userRouter.ts # Rotas de usuários
    │ │
    │ ├── services/ # Lógica de negócios
    │ │ ├── AuthService.ts # Interface de serviço de auth
    │ │ ├── AuthServiceImp.ts # Implementação de auth
    │ │ ├── OrderService.ts # Interface de pedidos
    │ │ ├── OrderServiceImp.ts # Lógica de negócios de pedidos
    │ │ ├── ProductService.ts # Interface de produtos
    │ │ ├── ProductServiceImp.ts # Lógica de produtos
    │ │ ├── UserService.ts # Interface de usuários
    │ │ └── UserServiceImp.ts # Lógica de usuários
    │ │
    │ └── util/ # Utilitários
    │ ├── di-container.ts # Injeção de dependência
    │ ├── CustomError.ts # Erros customizados
    │ └── ... # Outros utilitários
    │
    ├── mariadb/ # Configuração do banco
    │ ├── Dockerfile # Config do container MariaDB
    │ └── init.sql # Schema do banco
    │
    ├── .env.example # Modelo de variáveis de ambiente
    ├── docker-compose.yml # Orquestração de containers
    ├── package.json # Dependências do projeto
    └── tsconfig.json # Configuração do TypeScript

## Papel de Cada Componente

### Models (Modelos)
- Definem as entidades de negócio (Pedido, Produto, Usuário)
- Contêm regras de validação e negócio
- Fazem transformação de dados (conversões DTO)

### Repositories (Repositórios)
- Camada de acesso ao banco de dados
- Implementam operações CRUD
- Executam queries SQL
- Seguem o padrão Repository para acesso a dados

### Services (Serviços)
- Contêm a lógica principal de negócios
- Coordenam entre controllers e repositórios
- Implementam operações específicas do domínio

### Controllers (Controladores)
- Gerenciam requisições/respostas HTTP
- Roteiam para os serviços adequados
- Validam dados de entrada
- Formatam saída para a API

### Routes (Rotas)
- Definem os endpoints da API
- Configuram middlewares (validação, autenticação)
- Mapeiam rotas para métodos dos controllers

### DTOs
- Definem formatos de dados para entrada/saída
- Desacoplam modelos internos das interfaces externas
- Fazem transformação de requisições/respostas

## Fluxo Arquitetural

1. **Requisição**:

Rota → Middleware → Controller → Service → Repository → Banco


2. **Resposta**:

Banco → Repository → Service → Controller → Cliente


## Padrões de Projeto Utilizados

### MVC (Model-View-Controller)
- Separação clara entre dados, lógica e apresentação

### Injeção de Dependência (via inversify)
- Baixo acoplamento entre componentes
- Facilita testes e manutenção

### Repository Pattern
- Abstrage a camada de acesso a dados
- Centraliza operações de banco

### Arquitetura em Camadas
- Apresentação → Aplicação → Domínio → Infraestrutura
