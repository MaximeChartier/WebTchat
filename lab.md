
# Lab

I have provided a basic React application such as the one we did toguether
during our last session. We will make a few improvements to it.

J'ai fourni une application React de base telle que celle que nous avons créée ensemble
lors de notre dernière session. Nous y apporterons quelques améliorations.

## 1 - Architecture - Level easy

It is now the right time to **re-organize/refactor** our code. Split this monolithic
react Component into multiple section. In the end, we should end up with the
following components: 'Header', 'Footer', 'Main', 'Channels', 'Channel',
'Messages', 'MessageSend':

- 'App.js' file uses 'Header.js', 'Main.js', 'Footer.js'
- 'Main.js' file uses 'Channels.js', 'Channel.js'
- 'Channels.js' prints the list of channels
- 'Channel.js' prints the messages, uses 'Messages.js' and 'MessageSend.js'
- 'Messages.js' prints the list of messages inside the current channel
- 'Message.js' display one message
- 'MessageForm.js' send a new message


C'est maintenant le bon moment pour ** réorganiser / refactoriser ** notre code. Divisez ce monolithique
Réagissez le composant en plusieurs sections. En fin de compte, nous devrions nous retrouver avec le
composants suivants: 'Header', 'Footer', 'Main', 'Channels', 'Channel',
'Messages', 'MessageSend':

- Le fichier 'App.js' utilise 'Header.js', 'Main.js', 'Footer.js'
- Le fichier 'Main.js' utilise 'Channels.js', 'Channel.js'
- 'Channels.js' imprime la liste des chaînes
- 'Channel.js' imprime les messages, utilise 'Messages.js' et 'MessageSend.js'
- 'Messages.js' imprime la liste des messages à l'intérieur du canal actuel
- 'Message.js' affiche un message
- 'MessageForm.js' envoie un nouveau message


```

+--------------------------------------------+
|                  Header                    |
+--------------------------------------------+
|   Channels    |          Channel           |
|               | +------------------------+ |
|               | |    Messages / Message  | |
|               | +------------------------+ |
|               | |      MessageSend       | |
|               | +------------------------+ |
+--------------------------------------------+
|                  Footer                    |
+--------------------------------------------+

```

## 2 - Styles - Level easy

Give it some styles, use CSS to make it looks good. Possible source of
improvements include changing the colors, replacing the HTML "send" button with
an icon, working on the header, providing day/night themes ... be creative

## 3 - Use an external library - Level medium

Format the date in a human readable format. While the date is generated on the
server side to ensure its relevance and prevent from forgery, it must be
displayed according to the user browser local. The
[Moment.js](https://momentjs.com/) library has been the library of choice for
many years to accomplish date formatting. Read what is displayed on the top
right corner of their homepage, it is now depreciated. Read the reasons and act
accordingly.


## 2 - Styles - Niveau facile

Donnez-lui des styles, utilisez CSS pour lui donner une belle apparence. Source possible de
les améliorations incluent la modification des couleurs, le remplacement du bouton HTML "envoyer" par
une icône, travaillant sur l'en-tête, fournissant des thèmes jour / nuit ... soyez créatif

## 3 - Utiliser une bibliothèque externe - Niveau moyen

Formatez la date dans un format lisible par l'homme. Alors que la date est générée le
côté serveur pour garantir sa pertinence et éviter la falsification, il doit être
affiché en fonction du navigateur de l'utilisateur local. le
La bibliothèque [Moment.js] (https://momentjs.com/) a été la bibliothèque de choix pour
plusieurs années pour accomplir le formatage de la date. Lisez ce qui est affiché en haut
coin droit de leur page d'accueil, il est désormais amorti. Lisez les raisons et agissez
par conséquent.