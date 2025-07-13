# Modificações no Sistema de Cadastro

## Modificações Implementadas

### 1. Campos de Endereço Detalhados (Usuários)
- **Campo "Nome Completo"**: Substitui os campos "Nome" e "Sobrenome" separados
- **Busca automática de CEP**: Integração com API ViaCEP para preenchimento automático do endereço
- **Campos de endereço**:
  - CEP (com busca automática)
  - Endereço (Rua, Avenida, etc.)
  - Número
  - Cidade
  - Estado

### 2. Modificações para Prestadores de Serviço
- **Campo "Nome Completo ou da Empresa"**: Permite inserir nome da empresa ou nome pessoal
- **Campo "Como quer se identificar no aplicativo"**: Nome que aparecerá para os clientes
- **Dropdown de Serviços com Busca**: Lista completa de serviços com funcionalidade de busca por digitação

### 3. Lista Completa de Serviços
O dropdown inclui todos os serviços:
- Contabilidade e Auditoria
- Advocacia
- Arquitetura
- Engenharia
- Design gráfico e web
- Diarista
- Serviços de limpeza e conservação predial
- Portaria e segurança privada
- Clínicas médicas e odontológicas
- Psicologia
- Fonoaudiologia
- Terapia Ocupacional
- Fisioterapia
- Cuidadores
- Motorista
- Professores
- Aulas de idiomas
- Aulas de música
- Aulas de dança
- Aulas de teatro
- Transporte urbano de passageiros
- Transporte escolar
- Entregadores e motofretes
- Motoristas de aplicativos
- Serviços de frete e mudança
- Desenvolvimento de software e aplicativo
- Manutenção de computadores
- Oficinas mecânicas
- Funilarias
- Reparos de eletrodomésticos
- Conserto de celulares
- Conserto de eletrônicos
- Serviços de chaveiro
- Pintura
- Pedreiro - Alvenaria e Reformas
- Encanadores
- Eletricistas
- Instalação de ar-condicionado
- Jardinagem
- Paisagismo
- Marcenaria
- Móveis planejados
- Cabeleireiras (os)
- Barbeiros
- Manicure
- Pedicure
- Esteticistas
- Dermopigmentadores
- Depiladores
- Maquiadores (as)
- Massoterapeutas
- Tatuadores (as) e Body piercers
- Personal trainers
- Instrutores (as) de yoga
- Instrutores (as) de pilates
- Produção de eventos
- DJs
- Músicos
- Bandas
- Atores
- Atrizes
- Artistas plásticos
- Organizadores de eventos
- Cerimonialistas
- Filmagem
- Fotografia
- Cozinheiros (as)
- Garçons
- Lavanderia
- Guias turísticos

## Arquivos Modificados

### 1. `src/components/AuthForm.tsx`
- Adicionado campo `displayName` no estado do formulário
- Modificado label do campo nome para prestadores: "Nome Completo ou da Empresa"
- Adicionado campo "Como quer se identificar no aplicativo" para prestadores
- Substituído campo de texto de serviços por dropdown com busca por digitação
- Importado componentes `Popover` e `Command` do shadcn/ui para interface de busca avançada

### 2. `supabase-setup.sql`
- Adicionado campo `display_name TEXT` na tabela `profiles`

### 3. `src/lib/supabase.ts`
- Adicionado `display_name?: string` na interface `UserProfile`

## Funcionalidades

### Busca Automática de CEP
- Integração com API ViaCEP
- Preenchimento automático de endereço, cidade e estado
- Validação de CEP com 8 dígitos

### Busca de Serviços
- Interface de busca por digitação no dropdown
- Filtro em tempo real conforme o usuário digita
- Lista completa de 67 serviços organizados
- Indicador visual de seleção (checkmark)
- Mensagem quando nenhum serviço é encontrado

### Interface Responsiva
- Layout adaptativo para mobile e desktop
- Grid responsivo para campos de endereço
- Dropdown com busca por digitação para seleção de serviços
- Interface de busca avançada com filtro em tempo real

### Validação
- Campos obrigatórios para prestadores
- Validação de senha (mínimo 6 caracteres)
- Confirmação de senha

## Como Usar

### Para Usuários Comuns
1. Selecione "Usuário" no tipo de conta
2. Preencha nome completo
3. Digite o CEP para preenchimento automático do endereço
4. Complete os demais campos

### Para Prestadores de Serviço
1. Selecione "Prestador de Serviço" no tipo de conta
2. Preencha "Nome Completo ou da Empresa"
3. Digite "Como quer se identificar no aplicativo"
4. Digite o CEP para preenchimento automático do endereço
5. Clique no dropdown de serviços e digite para buscar o serviço oferecido
6. Complete a descrição do perfil
7. Finalize o cadastro

## Configuração

### Variáveis de Ambiente
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### Banco de Dados
Execute o script `supabase-setup.sql` no seu projeto Supabase para criar a tabela com os novos campos.

## Notas Técnicas

- O sistema mantém compatibilidade com o formato anterior de dados
- Campos de endereço são convertidos para o formato `location` para compatibilidade
- Nome completo é dividido em `first_name` e `last_name` automaticamente
- O campo `display_name` é específico para prestadores de serviço 