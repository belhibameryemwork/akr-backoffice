# AKR Smart Consulting - Back-Office Application

Bienvenue sur le dépôt du projet Back-Office d'AKR Smart Consulting. Cette application sur mesure a été conçue pour optimiser et simplifier la gestion interne de l'entreprise. Elle offre une interface élégante et réactive permettant d'administrer les utilisateurs, de suivre les rendez-vous clients, et d'analyser l'activité via un tableau de bord dynamique.

## 🚀 Fonctionnalités Principales

- **Authentification Sécurisée & Autorisation**
  - Connexion via JSON Web Tokens (JWT).
  - Gestion des rôles avec contrôle d'accès : **ADMIN** (accès complet, gestion des utilisateurs) et **AGENT** (accès limité aux rendez-vous et au tableau de bord).

- **Tableau de Bord (Dashboard) Dynamique**
  - Statistiques en temps réel : nombre total de rendez-vous, confirmés, en attente et annulés.
  - Graphique de répartition visuel interactif.
  - Flux d'activité récent (affichage des 5 dernières actions).

- **Gestion des Rendez-vous (Appointments)**
  - CRUD complet (Création, Lecture, Modification, Suppression).
  - Pagination côté serveur pour optimiser les performances.
  - Recherche par nom de client et filtrage par statut (Confirmé, En attente, Annulé).

- **Gestion des Utilisateurs (Users) - *Admins Uniquement***
  - CRUD complet pour gérer l'équipe.
  - Recherche dynamique par nom et filtrage par rôle (Admin, Agent).

- **Expérience Utilisateur (UX) Premium**
  - Design moderne (Glassmorphism), animations fluides, et gestion des erreurs intégrée (alertes inline, feedback visuel).

---

## 🛠️ Stack Technique

Ce projet s'appuie sur une architecture robuste séparant le front-end du back-end, entièrement typée grâce à TypeScript :

### Front-end
- **Framework :** [Next.js](https://nextjs.org/) (React)
- **Langage :** TypeScript
- **Styling :** CSS Modules (Vanilla CSS avec variables globales, sans dépendances lourdes pour des performances optimales)
- **Routage :** App Router de Next.js

### Back-end
- **Framework :** [Node.js](https://nodejs.org/) avec [Express.js](https://expressjs.com/)
- **Langage :** TypeScript
- **Base de données :** PostgreSQL
- **ORM :** [Prisma](https://www.prisma.io/)
- **Sécurité :** `bcryptjs` pour le hachage des mots de passe, `jsonwebtoken` pour la sécurisation des routes, et `cors` pour la communication inter-origines.

---

## ⚙️ Installation & Démarrage en Local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18+ recommandée)
- [PostgreSQL](https://www.postgresql.org/) installé et en cours d'exécution localement ou via un service cloud (ex: Supabase, Neon).

### 1. Cloner le projet
```bash
git clone <votre-url-de-depot>
cd akr-backoffice
```

### 2. Configuration du Back-end
```bash
cd backend
npm install
```
Créez un fichier `.env` à la racine du dossier `backend` et configurez vos variables :
```env
PORT=5000
JWT_SECRET="votre_cle_secrete_super_securisee"
DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/akr-backoffice"
DIRECT_URL="postgresql://utilisateur:motdepasse@localhost:5432/akr-backoffice"
FRONTEND_URL="http://localhost:3000"
```
Initialisez la base de données et peuplez-la avec l'utilisateur Administrateur par défaut :
```bash
npx prisma generate
npx prisma db push
npx prisma db seed  # Crée un premier compte Admin pour vous connecter
```
Démarrez le serveur de développement :
```bash
npm run dev
```
*Le serveur tournera par défaut sur http://localhost:5000.*

### 3. Configuration du Front-end
Ouvrez un nouveau terminal et naviguez vers le dossier front-end :
```bash
cd frontend
npm install
```
Créez un fichier `.env.local` à la racine du dossier `frontend` :
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
Démarrez l'application front-end :
```bash
npm run dev
```
*L'application sera accessible sur http://localhost:3000.*

---

## 👨‍💻 Identifiants par Défaut
Après avoir exécuté la commande `npx prisma db seed` côté back-end, vous pourrez vous connecter avec les identifiants générés dans votre script de seed (par exemple `admin@akr.com` / `password123` ou selon la configuration de votre projet).

---
*Développé avec soin pour AKR Smart Consulting.*
