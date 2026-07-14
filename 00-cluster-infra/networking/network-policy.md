# Network Policies Kubernetes

## Objectif

Les Network Policies permettent de contrôler les communications réseau entre les Pods Kubernetes.

Elles constituent une première couche de sécurité réseau dans le cluster.

---

## Principe

Sans Network Policy :

```text
Pod A  <---------------->  Pod B
```

Toutes les communications sont autorisées.

Avec Network Policy :

```text
Pod A

   |
   | Autorisé uniquement
   |

Pod B
```

---

## Utilisation future

Cette fonctionnalité sera utilisée dans les prochaines étapes afin de sécuriser :

* frontend ;
* backend API ;
* base de données.
