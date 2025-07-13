# 🔧 Configuração do Projeto

## 🚨 Problema Atual
O projeto está funcionando em **modo de desenvolvimento** sem Supabase configurado. O erro de URL inválida foi corrigido.

## ✅ Solução Temporária (Modo de Desenvolvimento)

O projeto agora funciona com **credenciais de teste**:

### 🔑 Credenciais de Teste
- **Cliente**: `cliente@teste.com` / `123456`
- **Prestador**: `prestador@teste.com` / `123456`

### 🎯 Funcionalidades Disponíveis
- ✅ Login com credenciais de teste
- ✅ Cadastro (simulado)
- ✅ Logout
- ✅ Navegação entre páginas
- ✅ Proteção de rotas
- ✅ Página 404
- ✅ Modo mock sem erros de URL

## 🚀 Configuração Completa (Produção)

### 1. Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto
4. Aguarde a configuração inicial

### 2. Obter Credenciais
No painel do Supabase:
1. Vá para **Settings > API**
2. Copie:
   - **Project URL**
   - **anon public** key

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_project_url_aqui
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

### 4. Configurar Banco de Dados
1. No Supabase, vá para **SQL Editor**
2. Execute o script `supabase-setup.sql`
3. Isso criará a tabela `profiles` e as políticas RLS

### 5. Configurar Storage (Opcional)
Para upload de avatares:
1. Vá para **Storage** no Supabase
2. Crie um bucket chamado `avatars`
3. Configure as políticas de acesso

### 6. Configurar URLs Permitidas
1. Vá para **Authentication > Settings**
2. Configure:
   - **Site URL**: `http://localhost:5173`
   - **Redirect URLs**: `http://localhost:5173/**`

## 🔄 Modo de Desenvolvimento vs Produção

### Modo de Desenvolvimento (Atual)
- ✅ Funciona sem Supabase
- ✅ Credenciais mock
- ✅ Todas as funcionalidades simuladas
- ✅ Ideal para desenvolvimento

### Modo de Produção
- ✅ Supabase configurado
- ✅ Autenticação real
- ✅ Banco de dados persistente
- ✅ Upload de arquivos
- ✅ Segurança completa

## 🧪 Testando o Sistema

### 1. Iniciar o Projeto
```bash
npm run dev
```

### 2. Acessar
- URL: `http://localhost:5173`
- Página inicial: `/`

### 3. Testar Login
- Use as credenciais de teste
- Teste ambos os tipos de usuário
- Verifique o logout

### 4. Testar Navegação
- Verifique se as rotas protegidas funcionam
- Teste a página 404
- Verifique a responsividade

## 🐛 Troubleshooting

### Erro de Variáveis de Ambiente
```
Missing Supabase environment variables
```
**Solução**: O projeto agora funciona em modo mock. Configure o Supabase para produção.

### Erro de Login
```
Email ou senha incorretos
```
**Solução**: Use as credenciais de teste ou configure o Supabase.

### Página em Branco
```
Tela branca sem conteúdo
```
**Solução**: Verifique o console do navegador para erros.

## 📝 Próximos Passos

1. **Desenvolvimento**: Continue usando o modo mock
2. **Testes**: Teste todas as funcionalidades
3. **Produção**: Configure o Supabase quando necessário
4. **Deploy**: Configure as variáveis de ambiente no servidor

## 🎉 Status Atual

✅ **Projeto funcionando em modo de desenvolvimento**
✅ **Erro de URL inválida corrigido**
✅ **Cliente Supabase mock implementado**
✅ **Todas as funcionalidades implementadas**
✅ **Interface responsiva**
✅ **Sistema de autenticação completo**
✅ **Banner de modo de desenvolvimento**

## 🔑 Credenciais de Teste

Use estas credenciais para testar o sistema:

- **Cliente**: `cliente@teste.com` / `123456`
- **Prestador**: `prestador@teste.com` / `123456`

## 🌐 Acesso

O projeto está rodando em: **http://localhost:8081/**

**Pronto para desenvolvimento e testes!** 🚀 