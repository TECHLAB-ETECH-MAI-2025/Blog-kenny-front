# Blog Kenny Front

Ce projet est l'interface front-end d'une application de blog complète, développée avec Next.js 15. Il s'agit de la partie cliente qui interagit avec une API backend développée en Symfony.

## 🚀 Fonctionnalités

- 📱 Interface responsive et moderne
- 🔐 Panneau d'administration complet
- 📝 Gestion des articles
- 🏷️ Gestion des catégories
- 💬 Gestion des commentaires
- 🎨 Thème clair/sombre
- 🔄 Pagination des données

## 🛠️ Technologies Utilisées

- [Next.js 15.3.3](https://nextjs.org/) - Framework React avec rendu côté serveur et Turbopack
- [React 19](https://react.dev/) - Bibliothèque UI avec les dernières fonctionnalités
- [TypeScript 5](https://www.typescriptlang.org/) - Pour un code plus robuste et typé
- [Tailwind CSS 4](https://tailwindcss.com/) - Pour le style et la mise en page
- [Radix UI](https://www.radix-ui.com/) - Composants UI accessibles et sans style
- [React Hook Form 7](https://react-hook-form.com/) - Gestion des formulaires performante
- [Zod](https://zod.dev/) - Validation de schéma TypeScript
- [Axios](https://axios-http.com/) - Client HTTP pour les appels API
- [Sonner](https://sonner.emilkowal.ski/) - Notifications élégantes
- [Lucide React](https://lucide.dev/) - Pack d'icônes moderne

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- pnpm (gestionnaire de paquets recommandé)
- Le backend Symfony doit être en cours d'exécution

## 🚀 Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/TECHLAB-ETECH-MAI-2025/Blog-kenny-front.git
   cd Blog-kenny-front
   ```

2. Installez les dépendances :

   ```bash
   pnpm install
   ```

3. Créez un fichier `.env.local` en vous basant sur `.env.example` et configurez vos variables d'environnement.

4. Lancez le serveur de développement :

   ```bash
   pnpm dev
   ```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## 📁 Structure du Projet

- `/app` - Pages et routes de l'application (routing basé sur les dossiers)
- `/components` - Composants réutilisables
  - `/ui` - Composants UI de base
  - `/form` - Composants de formulaire
  - `/admin` - Composants spécifiques à l'administration
- `/src/services` - Services pour l'interaction avec l'API
- `/src/types` - Types TypeScript
- `/lib` - Utilitaires et configurations
- `/hooks` - Hooks React personnalisés

## 🔑 Fonctionnalités Principales

### Panel Administrateur

- Gestion complète des articles (CRUD)
- Gestion des catégories
- Modération des commentaires
- Interface utilisateur intuitive

### Interface Publique

- Lecture des articles
- Système de commentaires
- Navigation par catégories
- Design responsive

## 🔧 Scripts Disponibles

- `pnpm dev` - Lance le serveur de développement
- `pnpm build` - Crée une version de production
- `pnpm start` - Démarre l'application en mode production
- `pnpm lint` - Vérifie le code avec ESLint

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

##

Développé avec ❤️ par Kenny
