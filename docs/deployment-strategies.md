# Déploiement d'applications dans Kubernetes

## Pourquoi utiliser une stratégie de déploiement ?

Déployer une nouvelle version d'une application en production peut entraîner des interruptions de service ou impacter les utilisateurs si la mise à jour échoue.

Les stratégies de déploiement permettent de contrôler la manière dont les nouvelles versions sont mises en production afin de réduire ces risques.

Dans ce projet, trois approches sont présentées :

- Rolling Update
- Blue/Green
- Canary

Chaque stratégie répond à un besoin spécifique selon le niveau de criticité de l'application et les contraintes de disponibilité.

L'objectif est de fournir une vue d'ensemble des mécanismes de déploiement modernes proposés par Kubernetes.