# 💾 Sauvegarde automatique de la base MySQL

## Objectif

La base de données constitue un composant critique de la plateforme.

Afin de garantir la disponibilité des données et de faciliter leur restauration en cas d'incident, une stratégie de sauvegarde automatique a été mise en place.

---

## Solution retenue

Les sauvegardes sont exécutées à l'aide d'un **CronJob Kubernetes**.

Ce mécanisme permet de lancer automatiquement une tâche planifiée à intervalles réguliers sans intervention manuelle.

---

## Fonctionnement

Le CronJob réalise les opérations suivantes :

1. Connexion au serveur MySQL
2. Exécution d'un `mysqldump`
3. Génération d'un fichier de sauvegarde
4. Stockage du fichier sur le volume de sauvegarde

Le processus est entièrement automatisé par Kubernetes.

---

## Architecture

```
CronJob Kubernetes
        │
        ▼
mysqldump
        │
        ▼
Base MySQL
        │
        ▼
Fichier SQL
        │
        ▼
Volume de sauvegarde
```

---

## Avantages

Cette approche permet :

- d'automatiser les sauvegardes ;
- de réduire les risques de perte de données ;
- de simplifier les opérations de restauration ;
- d'intégrer la stratégie de sauvegarde directement dans le cluster Kubernetes.

---

## Perspectives

Les prochaines évolutions pourront inclure :

- la rotation automatique des sauvegardes ;
- la compression des fichiers SQL ;
- la sauvegarde vers un stockage distant (S3, MinIO, NAS) ;
- la surveillance des tâches de sauvegarde via Prometheus.