# To-Do List - Backend

Test technique Ikomobi, le sujet était une todolist permettant aux utilisateurs de créer et de gérer des listes de tâches.

Les utilisateurs peuvent s'inscrire, se connecter, créer des tâches et collaborer en invitant d'autres personnes à voir toutes leurs tâches.

## Technologies Utilisées

- **Node.js** avec **Express** pour le serveur  
- **MySQL** comme base de données  
- **Sequelize** comme ORM  
- **JWT** pour l'authentification  
- **bcrypt** pour le hashage des mots de passe  
- **swagger-jsdoc** et **swagger-ui-express** pour la documentation de l'API  

## Installation

### 1. Cloner le dépôt

Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/RoxBibopp/ikomobi-todo-back.git
cd ikomobi-todo-back
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

Créez un fichier `.env` à la racine du projet. Ce fichier doit contenir les variables d'environnement nécessaires pour la connexion à la base de données, le port du serveur, la clé secrète pour JWT, etc.

Exemple de fichier `.env` :

```bash
PORT=3000
DB_HOST=localhost
DB_USER=votre_utilisateur_mysql
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=nom_de_la_base
JWT_SECRET=une_cle_secrete
```

### 4. Lancer le serveur

```bash
npm run dev
# ou
npm start
```

## Structure du Projet

- **src/server.js** : Point d'entrée du serveur
- **src/models/** : Définition des modèles Sequelize (User, Task, Board, etc.)
- **src/controllers/** : Contrôleurs pour l'authentification, la gestion des tâches et la collaboration
- **src/routes/** : Routes des endpoints de l'API
- **src/middlewares/** : Middlewares pour l'authentification
- **.env** : Fichier de configuration à créer manuellement

## Endpoints

### Authentification

- **POST /login** : Connexion d'un utilisateur
- **POST /register** : Inscription d'un utilisateur

### Gestion des Tâches

- **GET /tasks** : Récupérer les tâches de l'utilisateur
- **POST /tasks** : Créer une nouvelle tâche
- **PUT /tasks/:id** : Modifier une tâche
- **DELETE /tasks/:id** : Supprimer une tâche

### Collaboration

- **GET /boards** : Récupérer le groupe de taches de l'utilisateur
- **POST /boards/:boardId/invite** : Inviter un utilisateur à collaborer sur ses taches
- **GET /tasks/collaborations** : Récupérer les tâches des groupes où l'utilisateur est invité

## Documentation de l'API

L'API est documentée avec Swagger. Après avoir lancé le serveur, la docuomentation se trouve sur l'url

```
http://localhost:3000/api-docs
```

