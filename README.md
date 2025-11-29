<img width="2560" height="1440" alt="Banner" src="https://github.com/user-attachments/assets/4619ba65-f068-461f-83fe-9903191444ae" />

# Pawgress

**Pawgress** é um aplicativo móvel abrangente projetado para ajudar donos de animais de estimação a acompanhar e gerenciar a saúde e o bem-estar de seus pets. Construído com **React Native** e **Expo**, oferece uma experiência segura e fluida para monitorar o progresso dos seus amigos peludos.

## 🚀 Principais Funcionalidades

*   **🔐 Autenticação Segura**:
    *   Cadastro e Login de Usuários.
    *   **Autenticação Local**: Sistema de login seguro com criptografia de senha (SHA-256) e persistência de dados local.
*   **🐾 Gestão de Pets**:
    *   **Adicionar e Editar Perfis**: Crie perfis detalhados para cada um dos seus pets, incluindo fotos e detalhes pessoais.
    *   **Painel do Pet**: Uma visão centralizada para gerenciar todos os seus animais.
*   **📈 Acompanhamento de Saúde e Bem-estar**:
    *   Monitore métricas vitais de saúde e mantenha um histórico do bem-estar do seu pet.
*   **👤 Perfil do Usuário**:
    *   Configurações de usuário personalizáveis e gerenciamento de perfil.
*   **🎨 UI/UX Moderna**:
    *   Design bonito e responsivo usando **Lucide Icons**, **Linear Gradients** e **Efeitos de Blur**.

## 🛠️ Stack Tecnológica

Este projeto utiliza uma stack tecnológica moderna e robusta:

*   **Framework Principal**: [React Native](https://reactnative.dev/) (v0.81.5) com [Expo](https://expo.dev/) (v52).
*   **Navegação**: [React Navigation](https://reactnavigation.org/) (Native Stack) para transições de tela suaves.
*   **Gerenciamento de Estado**: React Context API (`PetContext`) para gerenciamento de estado global.
*   **Persistência de Dados**: `@react-native-async-storage/async-storage` para salvamento de dados local.
*   **Integração com Dispositivo**:
    *   `expo-camera` & `expo-image-picker` para gerenciamento de fotos.
    *   `expo-local-authentication` para segurança biométrica.
*   **Estilização**: `react-native-svg`, `expo-linear-gradient`, e `expo-blur` para uma experiência visual polida.

## 🏗️ Arquitetura

O projeto segue uma estrutura de diretórios limpa e escalável:

```
pawgress/
├── src/
│   ├── context/        # Gerenciamento de Estado Global (PetContext)
│   ├── engine/         # Lógica e Utilitários (LocalAuthEngine)
│   ├── navigation/     # Configuração de Navegação (AppNavigator)
│   ├── screens/        # Telas da Aplicação
│   │   ├── Login/SignUp
│   │   ├── Home (Dashboard)
│   │   ├── Gestão de Pets (Adicionar/Editar/Escolher)
│   │   └── Perfil e Configurações
│   └── style/          # Estilos Globais e Temas
├── assets/             # Assets Estáticos (Imagens, Fontes)
├── App.js              # Ponto de Entrada da Aplicação
└── package.json        # Dependências e Scripts
```

### Fluxo de Dados
O aplicativo usa a **Context API** (`PetContext`) para gerenciar os dados dos pets em toda a aplicação, garantindo que atualizações (como adicionar um novo pet) sejam refletidas imediatamente no Painel e em outras telas sem a complexidade de "prop drilling".

## 🏁 Começando

Siga estas instruções para rodar o projeto localmente.

### Pré-requisitos

*   **Node.js** (versão LTS recomendada)
*   **Expo Go** app instalado no seu dispositivo iOS ou Android.

### Instalação

1.  **Clone o repositório** (se ainda não o fez):
    ```bash
    git clone https://github.com/seuusuario/pawgress.git
    cd pawgress
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

### Rodando o App

Inicie o servidor de desenvolvimento:

```bash
npx expo start
```

*   **Escaneie o QR code** exibido no terminal usando o aplicativo **Expo Go** no seu celular.
*   Alternativamente, pressione `a` para rodar em um Emulador Android ou `i` para o Simulador iOS (requer configuração).

## 📄 Licença

Este projeto é para uso educacional e pessoal.



