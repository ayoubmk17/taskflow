TaskFlow
- TP3
Q1

On utilise <Navigate /> parce que c’est plus simple dans ce cas.
C’est un composant qu’on met directement dans le return pour rediriger.

navigate() on l’utilise plutôt dans une fonction (ex: après un submit).

Q2

navigate(from) → ajoute une page dans l’historique
navigate(from, { replace: true }) → remplace la page actuelle

- Le replace: true sert à éviter que l’utilisateur retourne au login après connexion.

Q3

On fait :

setProjects(prev => [...prev, data])

parce que c’est plus rapide.

- Pas besoin de refaire un GET, ça évite une requête et ça rend l’app plus fluide.

Q4
/dashboard sans login → redirige vers login
/projects/1 sans login → login aussi
/nimportequoi → dashboard
/ → dashboard
bouton retour → revient à la page précédente (sauf si replace utilisé)
Q5

Link → lien normal
NavLink → lien avec état actif

- On utilise NavLink pour savoir quel projet est sélectionné.

Q6

Le composant est le même mais :

POST → champs vides
PUT → champs déjà remplis
bouton change
fonction change (post vs put)
Q7

Si json-server est OFF → erreur

- Axios catch l’erreur et affiche “Erreur serveur”.

Q8

fetch → ne donne pas erreur pour 404
Axios → oui

- Axios est plus simple à gérer.

- TP4
Q1

Avec MUI → 0 CSS
Avant → plusieurs lignes

- tout est dans sx.

Q2
MUI → plus clair
Bootstrap → plus court
MUI → meilleur pour gros projets
Q3

sx → plus flexible
className → plus simple

- je préfère sx.

Q4

Je choisis MUI parce que :

plus moderne
plus de composants
mieux pour apps complexes
- BDD
Q5

React ne peut pas parler direct avec MySQL parce que :

problème sécurité
navigateur ne supporte pas ça
Q6

json-server pas pour prod :

pas sécurisé
lent
pas de vraie logique
Q7

Firebase marche direct parce que :

il a un backend intégré
sécurité gérée côté serveur
- Réflexion
Q8

Pour prod :

ajouter backend (Node)
vraie base de données
auth sécurisée
déploiement
Q9

Risques :

lourd (bundle)
dépendance
mises à jour cassent le code
Q10

Pour chat temps réel :

Firebase ou backend custom

- json-server impossible
