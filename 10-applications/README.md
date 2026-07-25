# Déploiement d'une application Full Stack

## Objectif

Cette étape consiste à déployer une application Full Stack sur le cluster Kubernetes afin de valider le bon fonctionnement de l'infrastructure mise en place lors des étapes précédentes.

L'application est composée de trois services indépendants :

- Frontend
- Backend API
- Base de données

Chaque composant est déployé séparément afin de faciliter la maintenance, les mises à jour et l'évolution de l'application.

---

## Architecture

```
Utilisateur

↓

Frontend

↓

Backend API

↓

MySQL

↓

Persistent Volume
```

---

## Ressources Kubernetes utilisées

- Deployment
- Service
- ConfigMap
- Secret
- Persistent Volume
- Persistent Volume Claim
- Ingress

---

## Objectifs pédagogiques

- Déployer une application multi-services
- Comprendre la communication entre les composants
- Gérer la configuration avec ConfigMaps
- Sécuriser les informations sensibles avec Secrets
- Mettre en œuvre un stockage persistant
- Préparer l'intégration dans une chaîne CI/CD DevSecOps

---

## Résultat

À cette étape, la plateforme dispose :

- d'un cluster Kubernetes opérationnel ;
- d'une application Full Stack fonctionnelle ;
- d'une architecture modulaire ;
- d'une base prête à être automatisée avec GitLab CI/CD.

---

➡️ La prochaine étape portera sur l'automatisation du déploiement avec GitLab CI/CD et l'intégration de contrôles de sécurité dans le pipeline.