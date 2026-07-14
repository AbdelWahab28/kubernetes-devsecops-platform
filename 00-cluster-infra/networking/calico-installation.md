# Configuration réseau Kubernetes avec Calico

## Objectif

Kubernetes nécessite un plugin réseau CNI permettant la communication entre les Pods.

Le plugin choisi est :

**Calico**

---

## Pourquoi Calico ?

Calico apporte :

* communication réseau entre Pods ;
* isolation réseau ;
* support des Network Policies ;
* compatibilité avec Kubernetes.

---

## Plan d'adressage réseau

### Réseau Pods

```
10.244.0.0/16
```

Ce réseau est utilisé pour attribuer les adresses IP aux Pods Kubernetes.

### Réseau Services

```
10.96.0.0/12
```

Ce réseau est utilisé pour les Services Kubernetes internes.

---

## Architecture réseau

```text
                Kubernetes Cluster


        Service Network
          10.96.0.0/12

                |

             Services


                |

        Pod Network
          10.244.0.0/16

                |

              Pods
```

---

## Installation

Le plugin Calico est déployé avec :

```bash
kubectl apply -f calico.yaml
```

---

## Validation

Commande :

```bash
kubectl get pods -n kube-system
```

Résultat attendu :

Les Pods Calico doivent être en état Running.
