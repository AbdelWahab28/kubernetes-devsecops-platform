# 📊 Stack de monitoring

## Prometheus

Prometheus collecte les métriques exposées par les composants Kubernetes et les applications.

Les données peuvent être utilisées pour analyser :

- CPU ;
- mémoire ;
- disponibilité des Pods ;
- état des Nodes ;
- consommation des ressources.

## Grafana

Grafana utilise Prometheus comme source de données afin de construire des dashboards permettant de suivre l'état de la plateforme.

## Loki

Loki centralise les logs des workloads Kubernetes et permet leur consultation depuis Grafana.

## Complémentarité

Les trois composants répondent à des besoins différents :

| Composant | Données | Utilisation |
|---|---|---|
| Prometheus | Métriques | Mesurer |
| Grafana | Métriques + logs | Visualiser / analyser |
| Loki | Logs | Rechercher / analyser |

L'association de ces composants permet d'obtenir une vision plus complète de l'état opérationnel de la plateforme.