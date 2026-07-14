# 🏗️ Construction du cluster Kubernetes avec kubeadm

## 📌 Objectif

Cette étape correspond à la construction du socle d'infrastructure de la plateforme Kubernetes DevSecOps.

L'objectif est de mettre en place un cluster Kubernetes fonctionnel permettant d'accueillir les futures applications Full Stack et d'intégrer progressivement les composants DevSecOps (CI/CD, sécurité et observabilité).

Le cluster est déployé sur une infrastructure virtualisée avec **Proxmox VE** et configuré manuellement avec **kubeadm** afin de maîtriser les différents composants Kubernetes.

---

# 🏛️ Architecture du cluster

Le cluster Kubernetes est composé de :

* 1 nœud Control Plane
* 2 nœuds Workers

```
                    Proxmox VE

                        |
        --------------------------------

        |              |              |

  managernode     workernode1    workernode2

 Control Plane       Worker          Worker

192.168.88.190   192.168.88.189  192.168.88.188
```

---

# 🖥️ Infrastructure virtuelle

| VMID | Nom         | Rôle          | CPU    | RAM  | Disque | OS             |
| ---- | ----------- | ------------- | ------ | ---- | ------ | -------------- |
| 111  | managernode | Control Plane | 2 vCPU | 4 Go | 50 Go  | Ubuntu Desktop |
| 112  | workernode1 | Worker        | 2 vCPU | 2 Go | 30 Go  | Ubuntu Server  |
| 113  | workernode2 | Worker        | 2 vCPU | 2 Go | 30 Go  | Ubuntu Server  |

---

# 🛠️ Technologies utilisées

| Domaine              | Technologie |
| -------------------- | ----------- |
| Hyperviseur          | Proxmox VE  |
| Orchestration        | Kubernetes  |
| Installation cluster | kubeadm     |
| Runtime conteneur    | containerd  |
| Construction images  | Docker      |
| Réseau CNI           | Calico      |
| Stockage persistant  | NFS         |

---

# 🌐 Configuration réseau Kubernetes

## Réseau Pods

```
10.244.0.0/16
```

Utilisé par Calico pour la communication entre les Pods.

---

## Réseau Services

```
10.96.0.0/12
```

Utilisé pour les Services Kubernetes internes.

---

# 📂 Organisation du dossier

```
00-cluster-infra/

├── architecture/
│   ├── cluster-topology.png
│   └── network-topology.png
│
├── infrastructure/
│   ├── vm-specifications.md
│   ├── proxmox-deployment.md
│   └── ip-addressing.md
│
├── kubeadm/
│   ├── cluster-configuration.md
│   ├── init-control-plane.sh
│   └── join-worker.sh
│
├── container-runtime/
│   └── containerd-configuration.md
│
├── networking/
│   ├── calico-installation.md
│   └── network-policy.md
│
├── storage/
│   └── nfs-storage.md
│
└── screenshots/
```

---

# ✅ Validation du cluster

La validation de cette étape consiste à vérifier :

## État des nœuds

```bash
kubectl get nodes
```

Résultat attendu :

```
NAME            STATUS
managernode     Ready
workernode1     Ready
workernode2     Ready
```

---

## État des composants Kubernetes

```bash
kubectl get pods -A
```

Les composants Kubernetes et Calico doivent être opérationnels.

---

# 📚 Documentation complète

La documentation technique détaillée de cette étape sera disponible dans :

```
documentation/cluster-kubernetes-kubeadm.pdf
```

Elle présente :

* la conception de l'architecture ;
* le dimensionnement des machines ;
* la préparation des nœuds ;
* l'installation Kubernetes ;
* la configuration réseau ;
* la mise en place du stockage.

---

# 🚀 Prochaine étape

Une fois le cluster Kubernetes opérationnel, la prochaine phase consiste à déployer une première application Full Stack composée de :

* Frontend
* Backend API
* Base de données

en utilisant les ressources Kubernetes :

* Deployments
* Services
* ConfigMaps
* Secrets
* Persistent Volumes
