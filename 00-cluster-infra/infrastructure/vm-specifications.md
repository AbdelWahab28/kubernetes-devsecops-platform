# Spécifications des machines virtuelles

## Vue d'ensemble

Le cluster Kubernetes est déployé sur une infrastructure virtualisée avec Proxmox VE.

L'architecture repose sur trois machines virtuelles :

* 1 nœud Control Plane
* 2 nœuds Workers

Chaque machine a été dimensionnée selon son rôle dans le cluster.

---

# Control Plane

| Ressource | Configuration            |
| --------- | ------------------------ |
| Rôle      | Orchestration Kubernetes |
| CPU       | 2 vCPU                   |
| RAM       | 4 Go                     |
| Stockage  | 60 Go                    |
| Système   | Ubuntu Desktop           |

Responsabilités :

* Gestion de l'API Kubernetes
* Gestion de l'état du cluster
* Planification des workloads
* Administration des composants Kubernetes

---

# Worker Nodes

| Ressource | Configuration           |
| --------- | ----------------------- |
| Nombre    | 2                       |
| Rôle      | Exécution des workloads |
| CPU       | 2 vCPU                  |
| RAM       | 2 Go                    |
| Stockage  | 30 Go                   |
| Système   | Ubuntu Server           |

Responsabilités :

* Exécution des Pods
* Hébergement des applications
* Gestion des conteneurs applicatifs

---

# Remarque

Cette architecture correspond à un environnement pédagogique proche d'un environnement professionnel.

Dans un contexte de production, des ressources supplémentaires et une architecture haute disponibilité seraient nécessaires.
