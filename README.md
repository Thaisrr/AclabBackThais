

# Lancer l'api

Un Dockerfile est présent à la racine du projet, mais n'est potentiellement pas fonctionnel pour le moment.

Docker ne fonctionnant pas sur mon ordinnateur actuel ( pc de remplacement temporaire ), je n'ai pas pu tester mes commandes pour le moment.

Une mise à jour trés rapide doit arriver. 

En attendant il est possible de lancer le projet via node.

Commencez par cloner le repo :

<code>git clone https://github.com/Thaisrr/TP-cybersecu.git </code>

Ensuite, à la racine du dossier : 

<code>npm install</code>

Il est ensuite possible de migrer les entités vers la base de donnée : 

<code>sequelize db:migrate</code>

Enfin, pour lancer le projet ( sur le port 8080 ):

<code>npm start</code>

Le fichier postman.json, présent à la racine, permet de tester les différentes routes de l'API.
