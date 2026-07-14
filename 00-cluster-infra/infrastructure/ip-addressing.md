# Plan d'adressage IP

## Machines virtuelles Kubernetes

| VMID | Nom         | Adresse IP     | Rôle          |
| ---- | ----------- | -------------- | ------------- |
| 111  | managernode | 192.168.88.190 | Control Plane |
| 112  | workernode1 | 192.168.88.189 | Worker        |
| 113  | workernode2 | 192.168.88.188 | Worker        |

---

## Réseaux Kubernetes

| Réseau          | CIDR          | Utilisation                  |
| --------------- | ------------- | ---------------------------- |
| Pod Network     | 10.244.0.0/16 | Communication entre Pods     |
| Service Network | 10.96.0.0/12  | Services Kubernetes internes |

---

## Vue globale

```text
Infrastructure VM

192.168.88.0/24


managernode
192.168.88.190

worker1
192.168.88.189

worker2
192.168.88.188


Kubernetes Overlay Network

Pods:
10.244.0.0/16


Services:

10.96.0.0/12
```
