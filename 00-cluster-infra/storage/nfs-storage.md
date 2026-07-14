# Stockage persistant NFS

## Objectif

Les applications Kubernetes nécessitent un stockage persistant indépendant du cycle de vie des Pods.

La solution retenue est :

**NFS (Network File System)**

---

## Pourquoi NFS ?

NFS permet :

* un stockage partagé entre plusieurs nœuds ;
* la persistance des données ;
* une solution adaptée à un environnement pédagogique.

---

## Architecture

```text
                 Kubernetes Cluster


 Worker 01  ---------
                    |
                    |
 Worker 02  ---- NFS Server
                    |
                    |
              Persistent Storage
```

---

## Utilisation prévue

Le stockage NFS sera utilisé pour :

* bases de données ;
* fichiers applicatifs ;
* volumes persistants Kubernetes (PV/PVC).
