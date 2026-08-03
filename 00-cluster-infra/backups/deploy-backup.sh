#!/bin/bash
# ---------------------------------------------------
# 🚀 deploy-backup.sh
# MySQL Backup CronJob - INSI-M2 (DevSecOps version)
# ---------------------------------------------------

set -euo pipefail

NAMESPACE="default"
CRONJOB_NAME="mysql-backup-daily"
JOB_TEST_NAME="test-backup-now"

echo "🚀 Déploiement backup INSI-M2..."

# ---------------------------------------------------
# 1️⃣ Vérification prérequis
# ---------------------------------------------------
echo "🔍 Vérification des prérequis..."

kubectl get secret mysql-secrets -n "$NAMESPACE" >/dev/null 2>&1 || {
  echo "❌ Secret 'mysql-secrets' manquant"
  exit 1
}

kubectl get configmap mysql-config -n "$NAMESPACE" >/dev/null 2>&1 || {
  echo "❌ ConfigMap 'mysql-config' manquant"
  exit 1
}

echo "✅ Secrets et ConfigMap OK"

# ---------------------------------------------------
# 2️⃣ Déploiement RBAC
# ---------------------------------------------------
echo "📋 Déploiement RBAC..."
kubectl apply -f rbac-backup.yaml

# ---------------------------------------------------
# 3️⃣ Déploiement CronJob
# ---------------------------------------------------
echo "📦 Déploiement CronJob..."
kubectl apply -f backup-cronjob.yaml -n "$NAMESPACE"

# ---------------------------------------------------
# 4️⃣ Vérification CronJob
# ---------------------------------------------------
echo ""
echo "📊 Vérification CronJob :"

kubectl get cronjob "$CRONJOB_NAME" -n "$NAMESPACE"

echo ""
kubectl describe cronjob "$CRONJOB_NAME" -n "$NAMESPACE" | grep -E "Schedule|Suspend|Active"

# ---------------------------------------------------
# 5️⃣ Test manuel du backup
# ---------------------------------------------------
echo ""
echo "⚡ Test manuel du CronJob..."

# supprimer ancien job si existe
kubectl delete job "$JOB_TEST_NAME" -n "$NAMESPACE" --ignore-not-found=true

kubectl create job "$JOB_TEST_NAME" --from=cronjob/"$CRONJOB_NAME" -n "$NAMESPACE"

# ---------------------------------------------------
# 6️⃣ Attente exécution
# ---------------------------------------------------
echo ""
echo "⏳ Attente du résultat du job..."

kubectl wait --for=condition=complete job/"$JOB_TEST_NAME" -n "$NAMESPACE" --timeout=180s || {
  echo "❌ Le job a échoué ou timeout"
  echo "📄 Logs :"
  kubectl logs -l job-name="$JOB_TEST_NAME" -n "$NAMESPACE" || true
  exit 1
}

# ---------------------------------------------------
# 7️⃣ Logs du backup
# ---------------------------------------------------
echo ""
echo "📄 Logs du backup :"
kubectl logs -l job-name="$JOB_TEST_NAME" -n "$NAMESPACE"

# ---------------------------------------------------
# 8️⃣ Vérification des pods
# ---------------------------------------------------
echo ""
echo "📊 Pods liés au backup :"
kubectl get pods -n "$NAMESPACE" -l job-name="$JOB_TEST_NAME"

# ---------------------------------------------------
# 9️⃣ Résultat final
# ---------------------------------------------------
echo ""
echo "🎉 BACKUP DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "✔ CronJob actif : $CRONJOB_NAME"
echo "✔ Test job exécuté : $JOB_TEST_NAME"
echo "✔ Logs disponibles ci-dessus"

echo ""
echo "💡 INFO : Le backup automatique s'exécutera à 02h00 chaque jour"
