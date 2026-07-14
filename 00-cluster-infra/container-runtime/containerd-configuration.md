# Configuration du runtime containerd

## Introduction

Kubernetes utilise un runtime de conteneurs afin d'exécuter les workloads applicatifs.

Dans cette architecture, le runtime choisi est :

**containerd**

---

## Pourquoi containerd ?

containerd est un runtime léger conforme aux standards Kubernetes.

Avantages :

* utilisé largement dans les environnements Kubernetes ;
* séparation entre orchestration et moteur de conteneurs ;
* meilleure intégration avec kubelet.

---

## Architecture

```text
Kubernetes

     |
   kubelet

     |

 containerd

     |

  Containers
```

---

## Docker

Docker est utilisé pour la création et le packaging des images applicatives.

Le workflow est donc :

```text
Application

↓

Dockerfile

↓

Image Docker

↓

Container Registry

↓

Kubernetes

↓

containerd
```

---

## Configuration appliquée

Les nœuds Kubernetes utilisent :

* containerd comme runtime d'exécution ;
* Docker pour la construction des images applicatives.
