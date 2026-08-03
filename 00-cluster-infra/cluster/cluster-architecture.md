# ☸️ Architecture du cluster Kubernetes

## Présentation

Le cluster Kubernetes constitue le cœur de la plateforme DevSecOps.

Il est déployé avec **kubeadm** sur une infrastructure virtualisée Proxmox VE et se compose d'un nœud de contrôle et de deux nœuds de travail.

---

## Infrastructure

| Nœud | Adresse IP | Rôle |
|------|------------|------|
| managernode | 192.168.88.190 | Control Plane |
| workernode1 | 192.168.88.189 | Worker |
| workernode2 | 192.168.88.188 | Worker |

---

## Caractéristiques techniques

### Hyperviseur

- Proxmox VE

### Système d'exploitation

- Ubuntu Desktop (Control Plane)
- Ubuntu Server (Workers)

### Runtime

- containerd

### Réseau

- Plugin CNI : Calico
- Réseau des Pods : **10.244.0.0/16**
- Réseau des Services : **10.96.0.0/12**

### Stockage

- Serveur NFS
- Persistent Volumes
- Persistent Volume Claims

---

## Architecture logique

```
                     Control Plane
                   192.168.88.190
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
 Worker Node 1                       Worker Node 2
192.168.88.189                     192.168.88.188
```

Les applications sont distribuées sur les nœuds workers tandis que le Control Plane assure la gestion du cluster.

---

## Composants déployés

Le cluster héberge actuellement :

- Frontend React
- Backend Laravel
- Base de données MySQL
- Ingress Controller
- Horizontal Pod Autoscaler
- Pipeline CI/CD
- Sauvegarde MySQL (CronJob)

Les prochains composants concerneront l'observabilité avec Prometheus, Grafana et Loki.