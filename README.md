# Bienvenue sur l'application Walis

Le demonstrateur a pour objectif de visulaliser une une série de prévisions d’ensemble issu du modèle de bilan hydrique en viticulture WaLIS .

Le modèle prend en entrée :
<ul>
    <li> une série de données observées (i.e. des données passées) à partir du 29/03 de l’année en cours pour plusieurs variables météo. </li>
    <li> une série de prévisions. Dans le cas des prévisions d’ensemble, la série est composée de 50 scénarios différents i.e. 50 données pour chaque date et pour les mêmes variables météo. </li>
</ul>

Il retourne une série contenant la variable calculée par le modèle (FTSW).


## Contributeurs


Contacts : Francois Brun 


Développeur : Vincent ARMANT 



## Comment installer le projet
```
git clone https://github.com/ElVinto/walis.git
cd walis
npm install
```

### Compilation et rechargement automatique du client
```
cd walis/client
npm run serve
```

### Compilation et rechargement automatique du serveur
```
cd walis/
npm run dev
```

### Déploiement automatique pour les utilisateurs autorisés
```
git push
```