# 🚀 Présentation de la plateforme Kubernetes DevSecOps

## Objectif

Cette plateforme a été conçue afin de fournir un environnement de déploiement Cloud Native intégrant les principaux composants d'une chaîne DevSecOps moderne.

Elle permet de déployer, sécuriser, superviser et administrer des applications Full Stack dans un cluster Kubernetes tout en s'appuyant sur des pratiques proches de celles rencontrées en entreprise.

L'objectif est de disposer d'une plateforme reproductible servant de support à l'apprentissage des technologies Cloud Native, de l'automatisation et de la sécurité des applications.

---

## Architecture générale

La plateforme est constituée des briques suivantes :

- Infrastructure virtualisée avec Proxmox VE
- Cluster Kubernetes déployé avec kubeadm
- Réseau Kubernetes basé sur Calico
- Stockage persistant via un serveur NFS
- Application Full Stack (React, Laravel, MySQL)
- Pipeline GitLab CI/CD
- Analyse de sécurité avec Semgrep
- Scan des images Docker avec Trivy
- GitLab Container Registry
- Sauvegarde automatisée de la base MySQL
- Observabilité (Prometheus, Grafana et Loki)

---

## Fonctionnalités

La plateforme permet notamment de :

- Déployer des applications conteneurisées
- Automatiser les déploiements avec GitLab CI/CD
- Intégrer des contrôles de sécurité dans la pipeline
- Gérer un stockage persistant
- Automatiser les sauvegardes
- Superviser les applications et le cluster
- Expérimenter des stratégies de déploiement modernes

---

## État actuel du projet

| Composant | Statut |
|-----------|--------|
| Infrastructure | ✅ |
| Cluster Kubernetes | ✅ |
| Application Full Stack | ✅ |
| Pipeline CI/CD | ✅ |
| Sécurité DevSecOps | ✅ |
| Sauvegarde MySQL | ✅ |
| Observabilité | 🚧 |

---

## Évolutions prévues

Les prochaines évolutions porteront sur :

- l'observabilité du cluster ;
- les stratégies de déploiement (Rolling Update, Blue/Green, Canary) ;
- le GitOps avec Argo CD ;
- le renforcement de la sécurité Kubernetes.