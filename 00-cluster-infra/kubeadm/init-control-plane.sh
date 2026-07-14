#!/bin/bash

# Initialisation du Control Plane Kubernetes
# Node : managernode
# IP : 192.168.88.190

set -e

echo "=== Initialisation du Control Plane Kubernetes ==="

kubeadm init \
  --apiserver-advertise-address=192.168.88.190 \
  --pod-network-cidr=10.244.0.0/16 \
  --service-cidr=10.96.0.0/12

echo "=== Configuration kubectl ==="

mkdir -p $HOME/.kube

cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

chown $(id -u):$(id -g) $HOME/.kube/config


echo "=== Installation du réseau Calico ==="

kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/master/manifests/calico.yaml


echo "=== Cluster initialisé ==="

kubectl get nodes