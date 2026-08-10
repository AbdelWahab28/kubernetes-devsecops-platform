# 🔐 Kubernetes RBAC

## Présentation

Cette partie présente la mise en place du contrôle d'accès basé sur les rôles (**Role-Based Access Control — RBAC**) dans le cluster Kubernetes.

L'objectif est de contrôler précisément les actions qu'un utilisateur ou un composant peut effectuer sur les ressources Kubernetes.

La configuration suit le principe du **moindre privilège** : chaque identité reçoit uniquement les permissions nécessaires à son rôle.

---

## 🎯 Objectifs

La mise en place de RBAC permet de :

- contrôler l'accès aux ressources Kubernetes ;
- séparer les responsabilités ;
- limiter les privilèges accordés aux utilisateurs et services ;
- éviter l'utilisation excessive des permissions administrateur ;
- appliquer le principe du moindre privilège.

---

## 🏗️ Architecture RBAC

La configuration repose principalement sur quatre objets Kubernetes :

```text
ServiceAccount / User
        │
        ▼
 Role / ClusterRole
        │
        ▼
RoleBinding / ClusterRoleBinding
        │
        ▼
Permissions sur les ressources
```

### Role

Définit les permissions disponibles dans un namespace.

### ClusterRole

Définit des permissions pouvant s'appliquer à l'ensemble du cluster ou être réutilisées dans un namespace.

### RoleBinding

Associe un Role à une identité dans un namespace.

### ClusterRoleBinding

Associe un ClusterRole à une identité au niveau du cluster.

---

## 📁 Structure

```text
rbac/
├── README.md
├── rbac-regle.yaml
└── script-dev-only
```

Selon les besoins de la plateforme, des `ClusterRole` et `ClusterRoleBinding` peuvent également être ajoutés.

---

## ⚙️ Déploiement

Appliquer les roles :

```bash
kubectl apply -f rbac-regle.yaml
```

Appliquer les scripts :

```bash
chmod +x create-users.sh
sudo ./create-users.sh

chmod +x script-testrbac.sh
sudo ./script-testrbac.sh
```

---

## 🔎 Vérification

Lister les rôles :

```bash
kubectl get roles -A
```

Lister les RoleBindings :

```bash
kubectl get rolebindings -A
```

Afficher les permissions d'un rôle :

```bash
kubectl describe role <role-name>
```

Vérifier les permissions d'une identité :

```bash
kubectl auth can-i get pods --as=<identity>
```

Exemple :

```bash
kubectl auth can-i get pods --as=system:serviceaccount:default:app-serviceaccount
```

---

## 🔐 Principe du moindre privilège

Une identité ne doit pas disposer de permissions administratives lorsqu'elles ne sont pas nécessaires.

Par exemple, une application qui doit uniquement consulter des Pods ne devrait pas disposer des permissions suivantes :

```text
create
delete
update
patch
```

sur l'ensemble des ressources du cluster.

La politique RBAC doit donc être définie en fonction du besoin réel du composant ou de l'utilisateur.

---

## ✅ Résultat

La mise en place de RBAC permet d'ajouter une couche de contrôle d'accès au cluster et de réduire les risques liés aux privilèges excessifs.

Cette configuration constitue l'un des mécanismes de sécurité intégrés à la plateforme Kubernetes DevSecOps.