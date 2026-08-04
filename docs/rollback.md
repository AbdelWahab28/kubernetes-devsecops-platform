# Rollback Kubernetes

## Présentation

Malgré les validations réalisées avant une mise en production, une nouvelle version peut contenir des erreurs fonctionnelles ou provoquer une dégradation des performances.

Kubernetes permet de revenir rapidement à une version précédente grâce au mécanisme de Rollback.

Cette fonctionnalité repose sur l'historique des révisions des Deployments.

## Commandes utiles

Afficher l'historique :

```bash
kubectl rollout history deployment <deployment-name>
```

Vérifier le statut :

```bash
kubectl rollout status deployment <deployment-name>
```

Revenir à la version précédente :

```bash
kubectl rollout undo deployment <deployment-name>
```

Le rollback constitue un mécanisme essentiel pour limiter l'impact d'un déploiement défectueux et rétablir rapidement le service.