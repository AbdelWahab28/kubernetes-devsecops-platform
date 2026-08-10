#!/bin/bash

USER=$1
NAMESPACE=$2

if [ -z "$USER" ] || [ -z "$NAMESPACE" ]; then
  echo "Usage: ./create-user.sh <nom> <namespace>"
  exit 1
fi

echo "👤 Création $USER → $NAMESPACE"

# Répertoire des certificats
CERT_DIR="$(dirname "$0")/../users/certs"
mkdir -p "$CERT_DIR"

# Copier CA
sudo cp /etc/kubernetes/pki/{ca.crt,ca.key} "$CERT_DIR/"
sudo chown $(whoami) "$CERT_DIR"/ca.*

# Générer certificat utilisateur
openssl genrsa -out "$CERT_DIR/${USER}.key" 2048
openssl req -new -key "$CERT_DIR/${USER}.key" -out "$CERT_DIR/${USER}.csr" -subj "/CN=${USER}"
openssl x509 -req -in "$CERT_DIR/${USER}.csr" \
  -CA "$CERT_DIR/ca.crt" -CAkey "$CERT_DIR/ca.key" -CAcreateserial \
  -out "$CERT_DIR/${USER}.crt" -days 365

# Choix du rôle
if [ "$NAMESPACE" = "professeurs" ]; then
  ROLE="professeur-role"
else
  ROLE="etudiant-role"
fi

# RBAC RoleBinding
cat <<EOF | kubectl --kubeconfig=$HOME/.kube/config apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ${USER}-binding
  namespace: $NAMESPACE
subjects:
- kind: User
  name: $USER
roleRef:
  kind: Role
  name: $ROLE
  apiGroup: rbac.authorization.k8s.io
EOF

# API server réel
API_SERVER="https://192.168.88.190:6443"

# Création kubeconfig
KUBECONF="$HOME/.kube/${USER}.conf"

kubectl config set-cluster k8s-cluster \
  --server="$API_SERVER" \
  --certificate-authority="$CERT_DIR/ca.crt" \
  --embed-certs=true \
  --kubeconfig="$KUBECONF"

kubectl config set-credentials "$USER" \
  --client-certificate="$CERT_DIR/${USER}.crt" \
  --client-key="$CERT_DIR/${USER}.key" \
  --embed-certs=true \
  --kubeconfig="$KUBECONF"

kubectl config set-context "${USER}-context" \
  --cluster=k8s-cluster \
  --user="$USER" \
  --kubeconfig="$KUBECONF"

kubectl config use-context "${USER}-context" \
  --kubeconfig="$KUBECONF"

echo "✅ $USER créé → $KUBECONF"

# Test rapide
KUBECONFIG="$KUBECONF" kubectl get pods -n $NAMESPACE --ignore-not-found
