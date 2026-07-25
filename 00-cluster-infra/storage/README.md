# 💾 NFS StorageClass INSI M2 - Production Ready

**NFS persistant + PVC Bound = 100% OK** ✅ **Prêt pour MySQL/Laravel**

---

## 📊 **Statut Déploiement (Validé)**

| Composant | Statut | Détails |
|-----------|--------|---------|
| **NFS Server** | ✅ **LIVE** | `192.168.88.190:/nfs/insi-m2/` |
| **StorageClass** | ✅ **Créé** | `nfs-insi-m2` (RWX) |
| **PersistentVolume** | ✅ **Bound** | `nfs-pv-mysql-insi` (5Gi) |
| **PVC** | ✅ **Bound** | `mysql-pvc-insi → nfs-pv-mysql-insi` |
| **Dossiers NFS** | ✅ **777** | `/nfs/insi-m2/mysql` + `/nfs/insi-m2/apps` |

---

## 🚀 **Déploiement 1-CLIC (Reproductible)**

```bash

cd ~/insi-k8s-projet-m2/infra/storage

```

# 1. NFS Server (MANAGER uniquement)

```bash

sudo apt update
sudo apt install -y nfs-kernel-server
sudo systemctl enable nfs-kernel-server

sudo mkdir -p /nfs/insi-m2/mysql /nfs/insi-m2/apps
sudo chmod 777 /nfs/insi-m2/mysql /nfs/insi-m2/apps

echo "/nfs/insi-m2 *(rw,sync,no_subtree_check,no_root_squash)" | sudo tee /etc/exports
sudo exportfs -ra && sudo systemctl restart nfs-kernel-server

```

# 2. K8s Storage (kubectl)

```bash

kubectl apply -f pv-nfs-mysql.yaml nfs-storageclass.yaml nfs-pvc-mysql.yaml

```
# 3. Test Persistance (MySQL)
# Déployer MYSQL

```bash

kubectl apply -f mysql-deployment.yaml

kubectl get pods,svc,pvc -o wide

```

# Test données persistantes

```bash

kubectl port-forward svc/mysql-service 3306:3306 &
mysql -h127.0.0.1 -uroot -pinsi2026 -e "CREATE TABLE test_persist(id INT);"
sudo ls -la /nfs/insi-m2/mysql/  

```
# test pipeline mer. 01 juil. 2026 12:46:18 EAT
# fix namespace react-node mer. 01 juil. 2026 12:55:23 EAT
# test pipeline infra mer. 01 juil. 2026 13:00:06 EAT
