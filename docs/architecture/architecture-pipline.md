# 🏗️ Architecture de la pipeline CI/CD DevSecOps

## 📌 Objectif

L'objectif de cette pipeline est d'automatiser le cycle de vie d'une application Full Stack tout en intégrant des contrôles de sécurité à chaque étape du processus de livraison.

Contrairement à un déploiement manuel, cette approche permet de garantir des déploiements reproductibles, de réduire les erreurs humaines et de détecter les vulnérabilités avant la mise en production.

---

# 🎯 Architecture globale

La pipeline repose sur une chaîne d'automatisation permettant de passer du code source jusqu'au déploiement de l'application sur Kubernetes.

```text
                   Développeur
                        │
                 Git Commit / Push
                        │
                        ▼
              GitLab Repository
                        │
                        ▼
             GitLab CI/CD Pipeline
                        │
     ┌──────────────────┼──────────────────┐
     │                  │                  │
     ▼                  ▼                  ▼
 Build Docker       Semgrep           Trivy
     │                  │                  │
     └──────────────────┼──────────────────┘
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

Chaque étape possède un rôle précis afin de garantir la qualité, la sécurité et l'automatisation du déploiement.

---

# 1️⃣ Gestion du code source

Le développement de l'application est centralisé dans un dépôt GitLab.

Chaque modification du code est enregistrée à l'aide de Git puis envoyée vers le dépôt distant.

```
Developer

↓

Git Commit

↓

Git Push

↓

GitLab Repository
```

Le dépôt constitue le point d'entrée de la pipeline CI/CD.

---

# 2️⃣ Déclenchement de la pipeline

À chaque **Push** sur une branche surveillée, GitLab déclenche automatiquement l'exécution de la pipeline.

Cette automatisation garantit que chaque nouvelle version suit exactement le même processus de validation avant son déploiement.

---

# 3️⃣ Construction des images Docker

La première étape consiste à construire les images Docker des différents composants de l'application :

- Frontend React
- Backend Laravel

Chaque composant possède son propre Dockerfile afin d'assurer une séparation claire des responsabilités.

À l'issue de cette étape, les images Docker sont prêtes à être analysées.

---

# 4️⃣ Analyse de sécurité du code

Le code source est analysé avec **Semgrep**.

Cette analyse statique (SAST) permet notamment de détecter :

- les erreurs de sécurité ;
- les mauvaises pratiques de développement ;
- les vulnérabilités connues ;
- certaines erreurs de configuration.

L'objectif est d'identifier les problèmes avant la création des images Docker.

---

# 5️⃣ Analyse des images Docker

Une fois les images construites, elles sont analysées avec **Trivy**.

Le scan permet d'identifier notamment :

- les vulnérabilités du système d'exploitation ;
- les dépendances vulnérables ;
- les bibliothèques obsolètes ;
- les CVE connues.

Cette étape permet de réduire le risque de déployer des images contenant des vulnérabilités.

---

# 6️⃣ Publication dans le Container Registry

Si les contrôles sont validés, les images Docker sont publiées dans le **GitLab Container Registry**.

Le registre devient ainsi la source officielle des images utilisées par Kubernetes.

```
Docker Build

↓

GitLab Container Registry
```

Cette approche garantit que les déploiements utilisent toujours des images versionnées et contrôlées.

---

# 7️⃣ Déploiement sur Kubernetes

La dernière étape consiste à déployer automatiquement la nouvelle version de l'application sur le cluster Kubernetes.

Le pipeline applique les manifests Kubernetes afin de mettre à jour :

- les Deployments ;
- les Services ;
- les ConfigMaps ;
- les Ingress.

Le cluster récupère ensuite les nouvelles images depuis le GitLab Container Registry.

---

# 🔒 Intégration du DevSecOps

L'un des objectifs principaux de cette architecture est d'intégrer la sécurité directement dans le pipeline de livraison.

Les contrôles de sécurité sont exécutés avant le déploiement afin d'éviter qu'une application vulnérable soit mise en production.

Les principaux outils utilisés sont :

| Étape | Outil |
|--------|-------|
| Gestion du code | GitLab |
| Build | Docker |
| Analyse SAST | Semgrep |
| Scan des images | Trivy |
| Registry | GitLab Container Registry |
| Déploiement | Kubernetes |

Cette approche illustre le principe fondamental du **DevSecOps** : intégrer la sécurité tout au long du cycle de développement plutôt qu'à la fin du projet.

---

# 📈 Résultat attendu

À l'issue de cette architecture :

- Chaque modification du code déclenche automatiquement une pipeline.
- Les images Docker sont construites et versionnées.
- Le code source est analysé avant le déploiement.
- Les images Docker sont scannées à la recherche de vulnérabilités.
- Les images validées sont publiées dans le GitLab Container Registry.
- L'application est automatiquement déployée sur Kubernetes.

Cette architecture constitue une base solide pour l'évolution de la plateforme vers des pratiques plus avancées telles que le GitOps, le déploiement progressif (Canary ou Blue/Green) et l'observabilité du cluster.