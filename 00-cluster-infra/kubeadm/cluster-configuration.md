# Configuration du cluster Kubernetes

## Technologies utilisées

| Composant              | Technologie |
| ---------------------- | ----------- |
| Orchestrateur          | Kubernetes  |
| Installation           | kubeadm     |
| Runtime conteneur      | containerd  |
| Conteneurs applicatifs | Docker      |
| Réseau CNI             | Calico      |
| Stockage               | NFS         |

---

## Topologie Kubernetes

Le cluster est composé de :

* 1 Control Plane
* 2 Workers

```
              Kubernetes Cluster

                    |
             Control Plane

              /          \

        Worker 01      Worker 02
```

---

## Objectifs

Cette étape permet de mettre en place :

* un cluster Kubernetes fonctionnel ;
* une base pour les futurs déploiements applicatifs ;
* un environnement prêt pour l'intégration CI/CD DevSecOps.
