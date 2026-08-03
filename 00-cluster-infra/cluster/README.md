# ☸️ Plateforme Kubernetes DevSecOps

## 📌 Présentation

Cette plateforme a été conçue afin de fournir un environnement pédagogique permettant de reproduire les principales briques d'une infrastructure Cloud Native moderne.

Elle s'appuie sur un cluster Kubernetes déployé avec **kubeadm** et intègre progressivement les composants nécessaires à l'automatisation, à la sécurité, au stockage, à la supervision et à l'exploitation des applications.

L'objectif est de proposer une architecture proche de celles utilisées en entreprise afin d'illustrer les pratiques DevOps et DevSecOps.

---

# 🏗️ Architecture globale

```
                        Développeur
                             │
                        Git Repository
                             │
                             ▼
                     GitLab CI/CD Pipeline
                             │
           ┌─────────────────┴─────────────────┐
           │                                   │
           ▼                                   ▼
       Semgrep                           Trivy Scan
           │                                   │
           └─────────────────┬─────────────────┘
                             ▼
                GitLab Container Registry
                             │
                             ▼
                  Cluster Kubernetes
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   Frontend React      Backend Laravel        MySQL
                                                  │
                                                  ▼
                                         Persistent Storage
                                                  │
                                                  ▼
                                           Backup CronJob

                             ▼
                   Monitoring & Observabilité
                 Prometheus • Grafana • Loki
```

---

# 🖥️ Infrastructure

Le cluster repose sur une infrastructure virtualisée sous **Proxmox VE**.

| Nœud | Rôle | CPU | RAM |
|------|------|-----|-----|
| Manager | Control Plane | 2 vCPU | 4 Go |
| Worker 1 | Worker | 2 vCPU | 2 Go |
| Worker 2 | Worker | 2 vCPU | 2 Go |

Container Runtime :

- containerd

Réseau :

- Calico

Stockage :

- NFS

---

# 📦 Déploiement des applications

La plateforme héberge une application Full Stack composée de :

- Frontend React
- Backend Laravel
- Base de données MySQL

Les applications sont déployées via :

- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- Horizontal Pod Autoscaler

---

# 🔄 CI/CD DevSecOps

La chaîne CI/CD automatise :

- Build Docker
- Analyse SAST avec Semgrep
- Scan des images avec Trivy
- Publication dans GitLab Container Registry
- Déploiement Kubernetes

---

# 💾 Gestion du stockage

Le stockage persistant repose sur un serveur **NFS**.

Les applications utilisent :

- Persistent Volumes
- Persistent Volume Claims

afin de garantir la persistance des données.

---

# 🔐 Gestion des certificats

Les communications sécurisées sont assurées grâce aux certificats du cluster Kubernetes.

Les certificats permettent notamment :

- l'authentification des composants du cluster ;
- la sécurisation des communications entre les nœuds ;
- le chiffrement des échanges avec l'API Server.

---

# 🗄️ Sauvegarde

Afin d'améliorer la résilience de la plateforme, une stratégie de sauvegarde automatique a été mise en place.

Un **CronJob Kubernetes** exécute régulièrement une sauvegarde de la base MySQL.

Cette approche permet :

- d'automatiser les sauvegardes ;
- de limiter les pertes de données ;
- de faciliter les opérations de restauration.

---

# 📊 Observabilité (en cours)

La prochaine évolution de la plateforme consistera à intégrer une solution complète d'observabilité basée sur :

- Prometheus
- Grafana
- Loki

Cette pile permettra :

- la collecte des métriques ;
- la visualisation des performances ;
- la centralisation des journaux ;
- la supervision du cluster Kubernetes.

---

# 🚀 État d'avancement

| Composant | Statut |
|-----------|--------|
| Infrastructure Proxmox | ✅ |
| Cluster Kubernetes | ✅ |
| Réseau Calico | ✅ |
| Stockage NFS | ✅ |
| Application Full Stack | ✅ |
| CI/CD GitLab | ✅ |
| Semgrep | ✅ |
| Trivy | ✅ |
| GitLab Registry | ✅ |
| Ingress | ✅ |
| HPA | ✅ |
| Certificats Kubernetes | ✅ |
| Sauvegarde MySQL (CronJob) | ✅ |
| Prometheus | 🚧 |
| Grafana | 🚧 |
| Loki | 🚧 |

---

# 🎯 Perspectives

Les prochaines évolutions de la plateforme porteront sur :

- l'observabilité du cluster ;
- les stratégies de déploiement avancées (Rolling Update, Blue/Green, Canary) ;
- le GitOps avec Argo CD ;
- le renforcement de la sécurité (Kyverno, OPA Gatekeeper, Secret Detection) ;
- la supervision complète de l'infrastructure et des applications.