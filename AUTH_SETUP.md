# Configuração da Autenticação com Supabase

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase

## 🚀 Configuração

### 1. Configurar Variáveis de Ambiente

Copie o arquivo `env.example` para `.env` e preencha com suas credenciais do Supabase:

```bash
cp env.example .env
```

Edite o arquivo `.env`:
```env
VITE_SUPABASE_URL=sua_url_do_projeto_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

### 2. Configurar Banco de Dados

No painel do Supabase, vá para **SQL Editor** e execute o script `supabase-setup.sql`.

### 3. Configurar Autenticação

No painel do Supabase:

1. Vá para **Authentication > Settings**
2. Configure as URLs permitidas:
   - Site URL: `http://localhost:5173` (desenvolvimento)
   - Redirect URLs: `http://localhost:5173/**`

### 4. Configurar Políticas de Segurança

As políticas RLS já estão configuradas no script SQL, mas você pode ajustá-las conforme necessário.

## 🎯 Funcionalidades Implementadas

### Login
- ✅ Autenticação com email/senha
- ✅ Validação de credenciais
- ✅ Redirecionamento baseado no tipo de usuário
- ✅ Tratamento de erros
- ✅ Loading states

### Cadastro
- ✅ Criação de conta com tipo (usuário/prestador)
- ✅ Validação de senha
- ✅ Criação automática de perfil
- ✅ Campos específicos para prestadores
- ✅ Tratamento de erros

### Tipos de Usuário
- **Usuário**: Acesso ao dashboard de cliente
- **Prestador**: Acesso ao dashboard de prestador

## 🔧 Estrutura de Arquivos

```
src/
├── lib/
│   └── supabase.ts          # Configuração do cliente Supabase
├── hooks/
│   └── useAuth.ts           # Hook personalizado para autenticação
├── components/
│   ├── AuthForm.tsx         # Formulário reutilizável
│   └── AuthToggle.tsx       # Toggle para tipo de usuário
└── pages/
    ├── Login.tsx            # Página de login
    └── Register.tsx         # Página de cadastro
```

## 🎨 Interface

- Design responsivo com Tailwind CSS
- Toggle entre login e cadastro
- Seleção de tipo de usuário
- Validação em tempo real
- Estados de loading
- Mensagens de erro amigáveis

## 🔒 Segurança

- Row Level Security (RLS) habilitado
- Políticas de acesso configuradas
- Validação de entrada
- Sanitização de dados
- Tokens JWT seguros

## 🚀 Uso

1. Configure as variáveis de ambiente
2. Execute o script SQL no Supabase
3. Inicie o projeto: `npm run dev`
4. Acesse: `http://localhost:5173/login`

## 📝 Notas

- Os usuários são redirecionados automaticamente baseado no tipo de conta
- Prestadores têm campos adicionais (serviços, descrição)
- O sistema suporta expansão futura para mais tipos de usuário 