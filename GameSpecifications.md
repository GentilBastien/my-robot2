# MyRobot2
MyRobot2 est un jeu de combats de robots tour par tour dans un univers de fiction (très vraisemblablement Star Wars car lore infini).

## Principe
Chaque joueur possède son propre robot. Il est nommé et amélioré à sa guise. Chaque jour, le joueur fait combattre son
robot contre d'autres robots (IA ou le/les robots d'autres joueurs), trouve de meilleures stratégies et l'améliore.

Au début, le robot sort de l'usine à robots. C'est au joueur de lui donner un nom et de choisir un sponsor. Il en existe
plusieurs et sont détaillés plus bas.

Un robot est limité à CINQ combats par jour. À l'issue de chaque combat, une quantité d'expérience est donnée (6 ou 4
selon victoire/défaite). L'expérience permet au robot de monter au niveau supérieur. À chaque nouveau niveau, trois
améliorations sont proposées aléatoirement au joueur ; une seule devra être choisie.

## Attributs
Chaque robot possède des attributs qui définissent la plupart de ses actions et réactions en jeu.
- PUISSANCE (**POW**) Dégâts et soins des attaques et compétences
- MOBILITE (**MOB**) Portée de déplacement, chances d'esquiver les dégâts directs
- CHASSIS (**CHS**) PV du robot et réduction de dégât
- PROCESSEUR (**CPU**) Augmente les soins et boucliers reçus/donnés et les chances de toucher sa cible
- ENERGIE (**ENE**) Réduit la quantité de surchauffe et la résistance aux surcharges
- INTERFACE (**INTF**) Augmente la sécurité interne du robot et l'initiative

## Statistiques
Chaque robot possède des statistiques qui définissent ses performances en combat
- **PV** Augmente les points de vie du robot
- **dégâts** Augmente les dégâts des attaques et compétences du robot
- **précision** Augmente la précision lorsque le robot fait des attaques directes
- **esquive** Augmente les chances d'esquiver les attaques directes
- **critique** Augmente les chances de doubler un dégât d'attaque
- **réduction dégât** Augmente la réduction de dégâts du robot
- **armure** Augmente l'armure du robot
- **vitesse de déplacement** Augmente la portée de déplacement du robot

## Ressources
- Surchauffe. Utiliser une compétence engendre de la chaleur. Être en surchauffe paralyse le robot jusqu'à dissipation complète de la chaleur
- Modules d'Énergie : certaines compétences peuvent être utilisées en consommant un Module d'Énergie, ce qui la rendra plus puissante

## Types de dégâts
- Énergétique : dégâts de base
- Ionique : dégâts qui ignorent les boucliers s'il y en a
- EMP : dégâts qui bloquent les compétences du robot ennemi (silence)
- Corrosion : dégâts qui ignorent une partie l'armure du robot
- Surcharge : dégâts classiques qui ont une chance de faire de plus gros dégâts aléatoirement
- Feu : applique des dégâts sur la durée

## Règles du jeu
Les robots se déplacent sur une grille de cases héxagonales horizontales en mode tour par tour.
L'initiative de chaque robot déterminera lequel jouera en premier.

### Améliorations
Lorsqu'un robot reçoit une amélioration, celle-ci est nécessairement obtenable et pas encore apprise.
Une amélioration consiste en recevant :
- soit une nouvelle arme parmi toutes les armes disponibles pas encore obtenues
- soit un nouvel item d'équipement parmi tous les items d'équipement disponibles pas encore obtenus
- soit une nouvelle compétence parmi toutes les compétences disponibles et utilisables (la compétence de niveau 3 ne sera pas proposée si le niveau 2 n'a pas encore été appris)
- soit un bonus d'attribut dont la valeur est aléatoire
- soit un bonus de statistique dont la valeur est aléatoire

### Combats
- Il faut faire tomber les PV d'un robot ennemi pour le mettre KO.
- La quantité de bouclier s'ajoute devant la quantité de points de vie d'un robot. Les dégâts réduisent d'abord les boucliers avant de réduire la vie.
- Lorsqu'un robot est étourdi, ses chances d'esquive sont divisées par 2.
- Un coup critique fait des dégâts doublés.




