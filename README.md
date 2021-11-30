# Projet 6 OpenClassrooms
## So Pekocko :hot_pepper:	

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Ce sixième projet du parcours WebDev de OpenClassrooms repose sur la mise en place d'une API Rest.
L'application permettera aux utilisateurs d'évaluer des sauces piquantes existantes, ou de rajouter leurs sauces favorites.

Ce projet repose sur les axes suivants :  

* L'implémentation d'un modèle de données sécurisé et conforme aux réglementations. 
* La mise en place d'opérations sécurisées en suivant une logique CRUD.
* Le stockage de données, lui même sécurisé, par l'intérmédiaire d'une base de données.

### Installation :computer:

Clonez le repo, le fork de OC contenant le frontend y est déjà présent.  
Si besoin voici [le lien vers le repo OC](https://github.com/OpenClassrooms-Student-Center/dwj-projet6.git)  

#### Pour lancer le frontend procédez ainsi : 
* Placez vous dans le dossier frontend
* Dans le terminal exécutez la commande `npm install` nécessaire à l'utilisation des dépendances
* Installez sass via la commande `npm install node-sass`
* Démarrez le frontend en tapant `npm start`
* Dans votre navigateur allez sur la page `http://localhost:4200`

#### Pour le backend suivez ces instructions :
* Placez vous dans le dossier backend
* Installez Nodemon via `npm install -g nodemon`afin que le serveur se mette à jour à chaque modification
* Lancez le service en tapant `nodemon`


### Informations complémentaires :white_check_mark:	

Lors de la création d'un user via l'application le mot de passe doit contenir :  
Au moins 8 caractères, une majuscule, une minuscule, un chiffre, et ne doit pas contenir d'espace  

Par ailleurs pour éviter certaines attaques vous avez droit à 5 essais de connexion via la même IP, sans quoi vous serez bloqués durant 10 minutes :warning:	


