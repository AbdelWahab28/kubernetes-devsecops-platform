# Architecture de l'application Full Stack

## Objectif

Cette application constitue le premier workload déployé sur le cluster Kubernetes construit dans les étapes précédentes.

Elle permet de valider le bon fonctionnement de l'infrastructure Kubernetes avant l'intégration de la chaîne CI/CD DevSecOps.

---

# Architecture générale

L'application est composée de trois services indépendants.

```
                 Utilisateur
                       │
                       ▼
             React Frontend
                       │
             HTTP / REST API
                       ▼
            Laravel Backend
                       │
                    MySQL
                       │
               Persistent Volume
```

Chaque composant est exécuté dans son propre conteneur Docker puis déployé dans Kubernetes sous forme de Deployment.

---

# Frontend

## Technologie

- React

## Rôle

Le frontend constitue l'interface utilisateur de l'application.

Il communique avec l'API Laravel afin de récupérer et envoyer les données.

Le frontend est conteneurisé grâce à son propre Dockerfile.

---

# Backend

## Technologie

- Laravel

## Rôle

Le backend expose une API REST utilisée par le frontend.

Il assure notamment :

- le traitement des requêtes ;
- la logique métier ;
- l'accès à la base de données ;
- la gestion de l'authentification (si activée).

Le backend est également conteneurisé à l'aide d'un Dockerfile dédié.

---

# Base de données

## Technologie

- MySQL

## Rôle

La base MySQL stocke les données de l'application.

Afin de garantir leur persistance, un Persistent Volume et un Persistent Volume Claim sont utilisés dans Kubernetes.

---

# Conteneurisation

Chaque composant possède son propre Dockerfile.

```
Frontend
 └── Dockerfile

Backend
 └── Dockerfile

```

Pour les phases de développement local, l'ensemble des services peut être lancé à l'aide d'un fichier :

```
docker-compose.yml
```

Cette approche permet de tester rapidement l'application avant son déploiement dans Kubernetes.

---

# Déploiement Kubernetes

Chaque composant est déployé indépendamment.

Les principales ressources Kubernetes utilisées sont :

- Deployment
- Service
- ConfigMap
- Secret
- Persistent Volume
- Persistent Volume Claim

Cette séparation facilite :

- la maintenance ;
- les mises à jour ;
- la montée en charge ;
- les évolutions futures.

---

# Évolutions prévues

Cette architecture servira de base pour les prochaines étapes du projet :

- Intégration GitLab CI/CD
- Analyse de sécurité avec Semgrep
- Scan des images Docker avec Trivy
- Déploiement automatisé sur Kubernetes
- Mise en œuvre des stratégies Blue/Green et Canary
- Observabilité avec Prometheus, Grafana et Loki