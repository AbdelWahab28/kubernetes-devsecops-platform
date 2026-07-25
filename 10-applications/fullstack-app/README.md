# 🚀 Déploiement d'une application Full Stack sur Kubernetes

## 📌 Présentation

Cette partie du projet présente le déploiement d'une application Full Stack conteneurisée dans un environnement Cloud Native.

L'objectif est de valider la capacité de la plateforme Kubernetes à héberger une application composée de plusieurs services indépendants :

- Frontend React
- Backend API Laravel
- Base de données MySQL

L'application est d'abord exécutée localement avec Docker Compose afin de valider son fonctionnement, puis déployée sur le cluster Kubernetes mis en place précédemment.

---

# 🏗️ Architecture applicative

L'application suit une architecture trois tiers :

```
                 Utilisateur
                     |
                     |
              React Frontend
                     |
              REST API HTTP
                     |
              Laravel Backend
                     |
                  MySQL
                     |
            Persistent Storage
```

Chaque composant est isolé dans son propre conteneur.

---

# 🛠️ Technologies utilisées

## Frontend

- React
- Node.js
- Docker

## Backend

- Laravel
- PHP
- Composer
- Docker

## Base de données

- MySQL
- Persistent Storage Kubernetes

## Conteneurisation

- Docker
- Docker Compose

## Orchestration

- Kubernetes
- Deployments
- Services
- Ingress
- ConfigMaps
- Secrets
- Horizontal Pod Autoscaler (HPA)

---

# 📁 Structure du projet

```
fullstack-app/
│
├── frontend/
│   ├── Dockerfile
│   └── application React
│
├:── backend/
│   ├── Dockerfile
│   └── application Laravel
│
├── docker-compose.yml
│
└── k8s/
    │
    ├── react/
    │   ├── react-deployment.yaml
    │   ├── react-service.yaml
    │   └── react-ingress.yaml
    │
    ├── laravel/
    │   ├── laravel-deployment.yaml
    │   ├── laravel-service.yaml
    │   ├── laravel-ingress.yaml
    │   └── laravel-hpa.yaml
        └── laravel-configmap.yaml
    │
    ├── mysql/
    │   ├── mysql-deployment.yaml
    │   ├── mysql-service.yaml
    │   ├── mysql-configmap.yaml
    │
    └──README
```

---

# 🐳 Déploiement local avec Docker Compose

## Prérequis

- Docker installé
- Docker Compose installé

Vérification :

```bash
docker --version

docker compose version
```

---

## Lancement de l'application

Depuis le dossier :

```bash
fullstack-app/
cd frontend/
docker build -t frontend-react:v1 .

cd backend/
docker build -t backend-laravel:v1 .
```

Lancer les services :

```bash
cd fullstack-app/
docker compose up -d
```

---

## Vérification des conteneurs

```bash
docker ps
```

Services attendus :

```
frontend
backend
mysql
```

---

## Accès à l'application

Frontend :

```
http://localhost:3000
```

Backend API :

```
http://localhost:8080
```

Base de données :

```
localhost:3306
```

---

## Arrêt des services

```bash
docker compose down -v
```

---

# ☸️ Déploiement Kubernetes

## Prérequis

- Cluster Kubernetes opérationnel
- kubectl configuré
- Ingress Controller installé
- StorageClass disponible

Vérification :

```bash
kubectl get nodes
```

---

# 1. Création du namespace

```bash
kubectl create namespace fullstack-app
```

---

# 2. Déploiement de la base MySQL

Création du stockage persistant :

```bash
kubectl apply -f 00-cluster-infra/storage/nfs-storageclass.yaml
kubectl apply -f 00-cluster-infra/storage/nfs-pv-mysql.yaml
kubectl apply -f 00-cluster-infra/storage/nfs-pvc-mysql.yaml
```

Déploiement MySQL :

```bash
kubectl apply -f kubernetes/mysql/
```

Vérification :

```bash
kubectl get pods -n fullstack-app
```

---

# 3. Déploiement du backend Laravel

Création des configurations :

```bash
kubectl apply -f kubernetes/backend/configmap.yaml
```

Déploiement :

```bash
kubectl apply -f kubernetes/backend/
```

Vérification :

```bash
kubectl get deployment -n fullstack-app
```

---

# 4. Déploiement du frontend React

Déploiement :

```bash
kubectl apply -f kubernetes/frontend/
```

Vérification :

```bash
kubectl get pods -n fullstack-app
```

---

# 5. Configuration Ingress

L'Ingress permet d'exposer l'application via une URL unique.

Déploiement :

```bash
kubectl apply -f kubernetes/ingress.yaml
```

Vérification :

```bash
kubectl get ingress -n fullstack-app
```

Architecture réseau :

```
Utilisateur

      |
      |
   Ingress

      |
      |
-------------------
|                 |
Frontend       Backend

                    |
                  MySQL
```

---

# 6. Mise en place du HPA

Le Horizontal Pod Autoscaler permet d'ajuster automatiquement le nombre de réplicas selon la consommation CPU.

Exemple :

```bash
kubectl apply -f kubernetes/frontend/hpa.yaml

kubectl apply -f kubernetes/backend/hpa.yaml
```

Vérification :

```bash
kubectl get hpa -n fullstack-app
```

---

# 🔎 Vérification globale

Voir les ressources déployées :

```bash
kubectl get all -n fullstack-app
```

Voir les services :

```bash
kubectl get svc -n fullstack-app
```

Voir les pods :

```bash
kubectl get pods -n fullstack-app
```

---

# ✅ Résultat attendu

À la fin de cette étape :

✔️ L'application Full Stack fonctionne localement avec Docker Compose

✔️ Chaque composant est conteneurisé

✔️ L'application est déployée sur Kubernetes

✔️ Les communications entre services sont gérées par Kubernetes

✔️ Les configurations sont externalisées

✔️ Les données MySQL sont persistantes

✔️ La montée en charge automatique est configurée

---

# 🔜 Prochaine évolution

La prochaine étape consiste à intégrer cette application dans une chaîne DevSecOps complète :

- Build automatique des images Docker
- Push vers GitLab Container Registry
- Analyse du code avec Semgrep
- Scan des images avec Trivy
- Déploiement automatique dans Kubernetes

➡️ Partie suivante :
**Mise en place d'une pipeline CI/CD DevSecOps**