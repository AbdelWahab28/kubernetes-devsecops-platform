# 🔄 Pipeline CI/CD DevSecOps

## 📌 Présentation

Cette partie du projet présente la mise en place d'une chaîne **CI/CD DevSecOps** permettant d'automatiser le cycle de vie d'une application Full Stack déployée sur Kubernetes.

L'objectif est de reproduire un pipeline proche des pratiques utilisées en entreprise, où chaque modification du code source déclenche automatiquement les différentes étapes nécessaires à la livraison de l'application.

Au-delà de l'automatisation des déploiements, cette pipeline intègre également des contrôles de sécurité afin d'appliquer les principes du **DevSecOps**.

---

# 🎯 Objectifs

Cette pipeline permet de :

- Automatiser les builds des images Docker
- Vérifier la qualité du code
- Intégrer des contrôles de sécurité
- Publier les images dans un registre privé
- Déployer automatiquement l'application sur Kubernetes
- Garantir des déploiements reproductibles

---

# 🏗️ Architecture de la pipeline

```
                 Développeur
                      │
                 Git Push
                      │
                      ▼
              GitLab Repository
                      │
                      ▼
              GitLab CI/CD Pipeline
                      │
      ┌───────────────┼────────────────┐
      │               │                │
      ▼               ▼                ▼
   Build Docker    Semgrep         Trivy
      │               │                │
      └───────────────┼────────────────┘
                      │
                      ▼
      GitLab Container Registry
                      │
                      ▼
              Cluster Kubernetes
                      │
                      ▼
        Application Full Stack
```

---

# 🛠️ Technologies utilisées

## Gestion du code

- Git
- GitLab

## CI/CD

- GitLab CI/CD
- GitLab Runner

## Conteneurisation

- Docker

## Registry

- GitLab Container Registry

## Sécurité

- Semgrep (SAST)
- Trivy (Container Image Scanning)

## Déploiement

- Kubernetes
- kubectl

---

# 📁 Structure du dossier

```
ci/
│   ├── backend.yml
│   ├── deploy.yml
│   └── frontend.yml
│   ├── security.yml
│   ├── verify.yml
│
└── README.md
```

---

# ⚙️ Workflow de la pipeline

À chaque **Git Push**, la pipeline exécute automatiquement les étapes suivantes.

## 1️⃣ Build

Construction des images Docker du :

- Frontend React
- Backend Laravel

Les images sont ensuite taguées avec la version du commit.

---

## 2️⃣ Analyse du code (SAST)

Le code source est analysé avec **Semgrep** afin de détecter :

- vulnérabilités connues ;
- mauvaises pratiques de développement ;
- erreurs de configuration ;
- failles de sécurité courantes.

---

## 3️⃣ Scan des images Docker

Les images construites sont analysées avec **Trivy**.

Le scan permet notamment d'identifier :

- vulnérabilités système ;
- dépendances vulnérables ;
- packages obsolètes ;
- CVE connues.

---

## 4️⃣ Publication des images

Si toutes les vérifications sont validées :

les images Docker sont publiées dans le **GitLab Container Registry**.

---

## 5️⃣ Déploiement Kubernetes

La dernière étape consiste à déployer automatiquement la nouvelle version de l'application sur le cluster Kubernetes.

Le pipeline applique les manifests Kubernetes puis met à jour les Deployments.

---

# 🔒 Intégration de la sécurité

La sécurité est intégrée directement dans la chaîne CI/CD.

Les principaux contrôles mis en œuvre sont :

| Contrôle | Outil |
|----------|-------|
| Analyse statique du code (SAST) | Semgrep |
| Scan des images Docker | Trivy |
| Registry privé | GitLab Container Registry |
| Déploiement automatisé | GitLab CI/CD |

Cette approche permet d'identifier les vulnérabilités avant la mise en production.

---

# 📸 Captures disponibles

Le dossier `screenshots/` contient les principales captures du projet :

- Pipeline GitLab
- Build Docker
- Rapport Semgrep
- Rapport Trivy
- GitLab Container Registry
- Déploiement Kubernetes

---

# ✅ Résultat obtenu

À l'issue de cette étape :

- ✔️ Les builds Docker sont automatisés
- ✔️ Le code est analysé avant chaque déploiement
- ✔️ Les images Docker sont scannées automatiquement
- ✔️ Les images sont stockées dans GitLab Container Registry
- ✔️ Les déploiements Kubernetes sont automatisés
- ✔️ La sécurité est intégrée au pipeline CI/CD

---

# 🚀 Perspectives d'évolution

Cette pipeline pourra être enrichie avec plusieurs fonctionnalités avancées :

- GitOps avec Argo CD
- Déploiement via Helm
- Dependency Scanning
- Secret Detection
- DAST (OWASP ZAP)
- Signature des images Docker
- Politique d'admission Kubernetes (Kyverno / OPA Gatekeeper)

---

# 🔜 Étape suivante

La prochaine étape du projet portera sur les **stratégies de déploiement Kubernetes**.

L'objectif sera de mettre en œuvre différentes méthodes de mise à jour des applications afin de limiter les interruptions de service et de sécuriser les mises en production.

Les stratégies étudiées seront notamment :

- Rolling Update
- Blue/Green Deployment
- Canary Deployment
```