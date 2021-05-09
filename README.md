# Groupe SI02 APP
- Lelievre Louise
- Chartier Maxime

# Lancer les serveurs de développement

```bash
yarn #installer les dépendances avec yarn
npm install #installer les dépendances avec npm

yarn dev #démarrer les serveurs de développement (client , serveur) avec yarn
npm run dev #démarrer les serveurs de développement (client , serveur) avec npm
```

## Tester l'application 

Pour une notation plus rapide, nous avons créé 3 utilisateurs et quelques conversations. (Ca vaut le detour)
Cette version de l'application est displonible sur **l'URL suivante** : https://webchatreact.herokuapp.com/

Comptes de test (déja en base):
- max@ece.fr / max
- louise@ece.fr / louise
- toto@ece.fr / toto

## Auto notation

Nous nous sommes attribué la note de **40/62** pour ce projet. Nous avons fait le maximum dans le temps imparti, nous sommes satisfais du rendu final même si certains points pourraient être améliorés.

## Avancement

- [x] S’authentifier auprès de l’application avec un compte local et un formulaire d’inscription.
- [x] Naviguer au travers de ses channels et des messages du channel sélectionné.
- [x] Partager l’accès au channel avec d’autres utilisateurs.
- [x] Accéder aux channels auxquels il a été ajouté.
- [x] Envoyer un nouveau message.
- [x] Modifier et supprimer son message.
- [x] Système de préférence de compte.
- [x] Bénéficier d’une application sécurisée dans laquelle l’accès aux ressources est vérifié (authentification et autorisation).
- [x] Respect des conventions de nommage / poinnts : 2
- [x] Structure des projets simple, compréhensible et stable, organisation des dossiers, services, composants 4
- [x] Qualité globale du code (indentation, clarté, …) 4
- [x] Apparence globale de l’application web 4
- [x] Sign In, Sign Up, Log Out / points: 4
- [x] Welcome screens / points: 4
- [x] New channel creation  / points: 6
- [x] Channel membership and access / points: 4
- [x] Ressource access control / points: 4
- [x] Invite users to channels / points: 6
- [x] Message modification / points: 2
- [x] Message removal / points: 2
- [x] Account settings  / points: 4
- [x] Gravatar integration  / points: 2
- [x] Avatar selection / points: 4
- [ ] Personal custom avatar / points: 6   

## Bonus
- [ ] Real-time notification
- [ ] Advanced authorization such as declaring a user as an administrator with extended permissions to remove any channels, add users,
- [ ] Smiley integration in the messages.
- [ ] Replace LevelDB with a scalable and distributed alternative (Cassandra, HBase, ...)