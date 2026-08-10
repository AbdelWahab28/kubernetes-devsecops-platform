# 🏗️ Architecture de l'observabilité

## Vue générale

L'architecture d'observabilité repose sur trois fonctions complémentaires :

```text
Applications / Kubernetes
          │
     ┌────┴─────┐
     │          │
 Metrics       Logs
     │          │
     ▼          ▼
Prometheus    Loki
     │          │
     └────┬─────┘
          ▼
       Grafana
          │
          ▼
    Visualisation
```

Prometheus assure la collecte des métriques, Loki centralise les logs et Grafana fournit l'interface de visualisation.

Cette séparation permet de disposer d'une architecture modulaire pouvant évoluer indépendamment selon les besoins de la plateforme.