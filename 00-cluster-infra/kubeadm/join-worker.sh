#!/bin/bash

# Ajout d'un worker au cluster Kubernetes

# Le token doit être généré depuis le Control Plane :
#
# kubeadm token create --print-join-command


echo "Exécuter la commande join générée par le Control Plane"

echo "Exemple :"

echo ""

echo "kubeadm join 192.168.88.190:6443 --token <TOKEN> \
--discovery-token-ca-cert-hash sha256:<HASH>"