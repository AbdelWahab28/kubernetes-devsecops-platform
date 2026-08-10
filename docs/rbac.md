# 🔐 Contrôle d'accès Kubernetes avec RBAC

## 1. Introduction

Kubernetes intègre un mécanisme de contrôle d'accès appelé **Role-Based Access Control (RBAC)**.

RBAC permet de définir les opérations qu'une identité peut effectuer sur les ressources du cluster.

Dans cette plateforme, RBAC est utilisé afin de mettre en œuvre une gestion des permissions basée sur les rôles et le principe du moindre privilège.

---

## 2. Modèle de fonctionnement

Le modèle RBAC peut être représenté de la manière suivante :

```text
             Identité
        ┌────────┴────────┐
        │                 │
      User          ServiceAccount
        │                 │
        └────────┬────────┘
                 │
                 ▼
             Binding
        ┌────────┴────────┐
        │                 │
   RoleBinding    ClusterRoleBinding
        │                 │
        ▼                 ▼
      Role          ClusterRole
        │                 │
        └────────┬────────┘
                 ▼
             Permissions
                 │
                 ▼
          Ressources Kubernetes
```

Le système sépare ainsi :

1. **l'identité** ;
2. **les permissions** ;
3. **l'association entre identité et permissions**.

---

## 3. Les principaux objets RBAC

### Role

Un `Role` définit un ensemble de permissions dans un namespace donné.

Exemple conceptuel :

```yaml
rules:
  - apiGroups: [""]
    resources:
      - pods
    verbs:
      - get
      - list
      - watch
```

L'identité associée peut alors consulter les Pods autorisés sans disposer automatiquement d'autres permissions.

---

### ClusterRole

Un `ClusterRole` permet de définir des permissions à portée cluster.

Il peut notamment être utilisé lorsqu'un composant doit accéder à des ressources situées dans plusieurs namespaces ou à des ressources globales du cluster.

---

### RoleBinding

Un `RoleBinding` associe un `Role` à une identité.

```text
Identity
   │
   ▼
RoleBinding
   │
   ▼
Role
   │
   ▼
Permissions
```

Les permissions restent limitées au namespace concerné.

---

### ClusterRoleBinding

Un `ClusterRoleBinding` associe un `ClusterRole` à une identité au niveau du cluster.

Il doit être utilisé avec prudence car il peut accorder des permissions beaucoup plus larges.

---

## 4. ServiceAccount

Les `ServiceAccounts` permettent d'identifier les applications et composants exécutés dans Kubernetes.

Dans une architecture sécurisée, une application ne devrait pas utiliser inutilement une identité disposant de privilèges élevés.

Une ServiceAccount dédiée permet de contrôler précisément les permissions nécessaires à l'application.

---

## 5. Principe du moindre privilège

La configuration RBAC doit respecter le principe :

> Accorder uniquement les permissions nécessaires à l'exécution d'une tâche.

Les permissions sont définies à partir de trois éléments :

```text
API Group
    +
Resource
    +
Verb
```

Exemple :

```text
API Group : ""
Resource  : pods
Verb      : get
```

L'identité peut alors effectuer uniquement l'opération autorisée sur la ressource concernée.

---

## 6. Vérification des permissions

Kubernetes fournit la commande `kubectl auth can-i` pour vérifier si une identité possède une permission donnée.

Exemple :

```bash
kubectl auth can-i get pods --as=<identity>
```

Une réponse :

```text
yes
```

indique que l'action est autorisée.

Une réponse :

```text
no
```

indique que l'action n'est pas autorisée.

Cette vérification permet de valider que la politique RBAC correspond bien au niveau d'accès attendu.

---

## 7. Vérifications complémentaires

Lister les Roles :

```bash
kubectl get roles -A
```

Lister les ClusterRoles :

```bash
kubectl get clusterroles
```

Lister les RoleBindings :

```bash
kubectl get rolebindings -A
```

Lister les ClusterRoleBindings :

```bash
kubectl get clusterrolebindings
```

Afficher le détail d'un rôle :

```bash
kubectl describe role <role-name>
```

---

## 8. Considérations de sécurité

Une mauvaise configuration RBAC peut entraîner une élévation de privilèges.

Il est donc recommandé de :

- limiter l'utilisation des `ClusterRoleBinding` ;
- éviter d'utiliser `cluster-admin` sans nécessité ;
- créer des identités dédiées aux applications ;
- limiter les permissions aux ressources nécessaires ;
- limiter les permissions aux namespaces nécessaires ;
- vérifier régulièrement les permissions existantes ;
- tester les autorisations avec `kubectl auth can-i`.

---

## 9. Intégration dans la plateforme

RBAC constitue une couche complémentaire de la plateforme DevSecOps.

```text
                 Kubernetes Platform
                         │
        ┌────────────────┴────────────────┐
        │                                 │
   Observabilité                      Sécurité
        │                                 │
 Prometheus / Grafana / Loki             RBAC
        │                                 │
        └────────────────┬────────────────┘
                         ▼
                 Exploitation sécurisée
```

L'observabilité permet de comprendre l'état du système tandis que RBAC permet de contrôler les actions pouvant être réalisées sur celui-ci.

Ces deux mécanismes participent à une exploitation plus fiable et plus sécurisée du cluster Kubernetes.