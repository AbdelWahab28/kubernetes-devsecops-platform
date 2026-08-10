#!/bin/bash
echo "🧹 CLEANUP INSI M2..."

# Namespace principal
DEFAULT_NS="default"
MON_NS="monitoring"
RN="react-node"
KCTX="kubernetes-admin@kubernetes"

# --- PROTÉGER PV MySQL (AVANT tout cleanup) ---
echo "🔒 Protection PV MySQL..."
kubectl patch pv nfs-pv-mysql-insi -p '{"spec":{"claimRef": null}}' --context=$KCTX || true

# --- Supprimer les ressources du namespace default ---
echo "⏳ Nettoyage des apps dans $DEFAULT_NS..."
kubectl delete deployment,svc,statefulset,hpa,ingress \
  laravel-insi-m2 react-insi-m2 mysql-insi-m2 \
  laravel-service react-service mysql-service \
  laravel-hpa insi-app-ingress \
  --ignore-not-found=true -n $DEFAULT_NS --context=$KCTX

# --- Supprimer les ressources du namespace monitoring ---
echo "⏳ Nettoyage des services de monitoring dans $MON_NS..."
kubectl delete deployment,svc,daemonset,statefulset \
  grafana loki prometheus \
  node-exporter promtail \
  --ignore-not-found=true -n $MON_NS --context=$KCTX


# --- Supprimer les ressources du namespace react-node ---
echo "⏳ Nettoyage des apps dans $RN..."
kubectl delete deployment,svc,statefulset,hpa,ingress \
  mysql-node node-app react-app \
  mysql-node-service node-app-service react-app-service \
  node-hpa node-react-ingress react-node-ingress \
  --ignore-not-found=true -n $RN --context=$KCTX


# --- Lister l’état actuel des pods après cleanup ---
echo "📋 État des pods dans $DEFAULT_NS et $MON_NS :"
kubectl get all -n $DEFAULT_NS --context=$KCTX
kubectl get all -n $MON_NS --context=$KCTX
kubectl get all -n $RN --context=$KCTX
kubectl get pvc,pv -n $DEFAULT_NS --context=$KCTX
echo "✅ CLEAN ! Prêt pour make test !"
