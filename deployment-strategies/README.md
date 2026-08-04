# 🚀 Stratégies de déploiement Kubernetes

## Présentation

Cette partie du projet présente plusieurs stratégies de déploiement permettant de mettre à jour une application Kubernetes tout en limitant les interruptions de service et les risques liés à une mise en production.

Dans un environnement de production, remplacer brutalement une version d'une application peut entraîner une indisponibilité du service ou impacter les utilisateurs. Kubernetes propose plusieurs mécanismes permettant d'assurer des déploiements progressifs et des retours arrière rapides en cas de problème.

Cette section illustre trois stratégies couramment utilisées :

- Rolling Update
- Blue/Green Deployment
- Canary Deployment

---

# 🎯 Objectifs

Les objectifs sont les suivants :

- Comprendre les différentes stratégies de déploiement Kubernetes.
- Réduire les interruptions de service.
- Faciliter les mises à jour applicatives.
- Permettre un retour arrière rapide (Rollback).
- Comparer les avantages et les limites de chaque approche.

---

# 🏗️ Stratégies mises en œuvre

## 🔄 Rolling Update

La mise à jour est effectuée progressivement en remplaçant les anciens Pods par de nouveaux.

Cette stratégie est celle utilisée par défaut par Kubernetes.

### Avantages

- Pas d'interruption de service
- Déploiement automatique
- Gestion native par Kubernetes

---

## 🔵🟢 Blue/Green

Deux environnements sont maintenus simultanément :

- Blue : version actuellement utilisée.
- Green : nouvelle version.

Une fois les validations terminées, le trafic est redirigé vers la nouvelle version.

### Avantages

- Bascule quasi instantanée
- Rollback très rapide
- Validation complète avant mise en production

---

## 🐤 Canary

La nouvelle version est déployée progressivement auprès d'une partie des utilisateurs.

Le trafic est ensuite augmenté progressivement jusqu'à remplacer complètement l'ancienne version.

### Avantages

- Réduction des risques
- Validation progressive
- Idéal pour les applications fortement utilisées

---

# 📁 Structure

```text
deployment-strategies/
│
├── Blue-Green/
├── Canary/
└── 
```

---

# 📂 Contenu

Chaque stratégie contient :

- les manifests Kubernetes ;
- les Deployments ;
- les Services ;
- les fichiers Ingress (si nécessaires) ;
- les captures de validation.

---

# ✅ Résultat

Cette partie permet de comprendre comment Kubernetes peut assurer des mises à jour d'applications de manière fiable tout en limitant les interruptions de service et en facilitant les opérations de rollback.

---

# 🔜 Étape suivante

La prochaine étape consistera à mettre en place une solution complète d'observabilité avec :

- Prometheus
- Grafana
- Loki

afin de superviser l'état du cluster Kubernetes et des applications déployées.