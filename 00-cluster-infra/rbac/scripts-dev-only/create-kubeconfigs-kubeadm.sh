#!/bin/bash

CERT_DIR="$(dirname "$0")/../users/certs"
API_SERVER="https://192.168.88.190:6443"

# Liste des utilisateurs existants
USERS=(sitraka abdelwahab)

for user in "${USERS[@]}"; do
  KUBECONF="$HOME/.kube/${user}.conf"

  kubectl config set-cluster k8s-cluster \
    --certificate-authority="$CERT_DIR/ca.crt" \
    --server="$API_SERVER" \
    --embed-certs=true \
    --kubeconfig="$KUBECONF"

  kubectl config set-credentials $user \
    --client-certificate="$CERT_DIR/${user}.crt" \
    --client-key="$CERT_DIR/${user}.key" \
    --embed-certs=true \
    --kubeconfig="$KUBECONF"

  kubectl config set-context ${user}-context \
    --cluster=k8s-cluster \
    --user=$user \
    --kubeconfig="$KUBECONF"

  kubectl config use-context ${user}-context --kubeconfig="$KUBECONF"

  echo "✅ $KUBECONF créé pour $user"
done
