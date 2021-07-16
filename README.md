# Projet 6 OpenClassrooms
## So Pekocko :hot_pepper:	

Ce projet repose sur la mise en place d'une API Rest.
L'application permettera aux utilisateurs d'évaluer des sauces piquantes existantes, ou de rajouter leurs sauces favorites.

Ce projet repose sur les axes suivants :  

* L'implémentation d'un modèle de données sécurisé et conforme aux réglementations. 
* La mise en place d'opérations sécurisées en suivant une logique CRUD.
* Le stockage de données, lui même sécurisé, par l'intérmédiaire d'une base de données.

### Installation :computer:

Clonez le repo, le fork de OC contenant le frontend y est déjà présent.

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

Par ailleurs pour éviter certaines attaques vous avez droit à 5 essais de connexion, sans quoi vous serez bloqués durant 10 minutes :warning:	


