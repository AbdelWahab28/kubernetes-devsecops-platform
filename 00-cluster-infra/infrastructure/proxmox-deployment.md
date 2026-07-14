# Déploiement de l'infrastructure virtuelle

## Hyperviseur

L'infrastructure Kubernetes est hébergée sur Proxmox VE.

Proxmox permet de :

* créer les machines virtuelles nécessaires ;
* gérer les ressources CPU/RAM/stockage ;
* simuler un environnement d'entreprise local.

---

## Architecture virtuelle

```
Proxmox VE

 ├── Kubernetes Control Plane
 │       ├── 2 vCPU
 │       ├── 4 GB RAM
 │       └── 60 GB Storage
 │
 ├── Kubernetes Worker 01
 │       ├── 2 vCPU
 │       ├── 2 GB RAM
 │       └── 30 GB Storage
 │
 └── Kubernetes Worker 02
         ├── 2 vCPU
         ├── 2 GB RAM
         └── 30 GB Storage
```

---

## Objectif

Cette couche fournit le socle d'infrastructure nécessaire au déploiement du cluster Kubernetes.
