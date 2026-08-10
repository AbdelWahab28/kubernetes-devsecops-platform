# 📊 Observabilité Kubernetes

## Présentation

Cette partie du projet présente la mise en place d'une stack d'observabilité permettant de superviser le cluster Kubernetes et les applications qui y sont déployées.

L'objectif est de compléter la plateforme avec les mécanismes nécessaires à l'observation de l'infrastructure et des workloads :

- collecte des métriques ;
- visualisation des données ;
- centralisation des logs ;
- analyse de l'état des applications.

---

# 🎯 Objectifs

La stack d'observabilité doit permettre de :

- Surveiller l'état du cluster Kubernetes
- Collecter les métriques des workloads
- Visualiser les performances des applications
- Centraliser les logs des conteneurs
- Faciliter l'identification des incidents
- Fournir une vision globale de l'état de la plateforme

---

# 🏗️ Architecture

La solution repose sur trois composants principaux :

```text
                 Kubernetes Cluster
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼                             ▼
      Métriques                       Logs
          │                             │
          ▼                             ▼
     Prometheus                       Loki
          │                             │
          └──────────────┬──────────────┘
                         │
                         ▼
                      Grafana
                         │
                         ▼
                  Dashboards
```

---

# 🛠️ Technologies

| Composant | Fonction |
|-----------|----------|
| Prometheus | Collecte et stockage des métriques |
| Grafana | Visualisation et analyse |
| Loki | Centralisation des logs |
| Kubernetes | Plateforme d'exécution |

---

# 📈 Prometheus

Prometheus est utilisé pour collecter les métriques provenant du cluster Kubernetes et des applications.

Les données collectées permettent notamment d'observer :

- utilisation CPU ;
- utilisation mémoire ;
- état des Pods ;
- état des Nodes ;
- performances des workloads.

---

# 📊 Grafana

Grafana permet de visualiser les métriques collectées par Prometheus à travers des dashboards.

Les dashboards permettent d'obtenir une vue synthétique de :

- l'état du cluster ;
- la consommation des ressources ;
- l'état des applications ;
- les performances des workloads.

---

# 📝 Loki

Loki est utilisé pour centraliser les logs provenant des workloads Kubernetes.

Il permet de rechercher et d'analyser les événements générés par les applications sans avoir à consulter individuellement les logs de chaque Pod.

---

# 📁 Organisation

```text
monitoring/
│
├── prometheus/
├── grafana/
├── loki-promtail/
```

---

# 🔎 Vérification

Les composants peuvent être vérifiés avec :

```bash
kubectl get pods -n monitoring
```

```bash
kubectl get svc -n monitoring
```

```bash
kubectl get all -n monitoring
```

---

# ✅ Résultat

À l'issue de cette étape, la plateforme dispose d'une stack permettant :

- ✔️ de collecter les métriques Kubernetes ;
- ✔️ de visualiser les performances avec Grafana ;
- ✔️ de centraliser les logs avec Loki ;
- ✔️ d'analyser l'état des applications ;
- ✔️ de faciliter la détection des problèmes opérationnels.

---

# 🔜 Évolution

Cette stack pourra être enrichie avec :

- Alertmanager
- règles d'alerting Prometheus
- notifications
- dashboards applicatifs personnalisés
- métriques métier
- corrélation métriques / logs