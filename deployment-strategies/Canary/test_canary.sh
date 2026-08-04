#!/bin/bash
# test_canary_prod.sh
# Test Canary réel pour ton cluster Kubernetes

HOST="api.insim2.local"
INGRESS_IP="192.168.88.188"   # IP de ton ingress
N_REQUESTS=100

BLUE=0
CANARY=0

echo "=== Lancement du test Canary Production ($N_REQUESTS requêtes) ==="

for i in $(seq 1 $N_REQUESTS); do
    # On envoie la requête vers l'Ingress avec le bon Host
    resp=$(curl -s -H "Host: $HOST" http://$INGRESS_IP/)

    # On vérifie le contenu pour identifier stable ou canary
    if [[ "$resp" == *"CANARY"* ]]; then
        CANARY=$((CANARY+1))
        echo "Requête $i => CANARY"
    elif [[ "$resp" == *"Laravel"* ]]; then
        BLUE=$((BLUE+1))
        echo "Requête $i => BLUE"
    else
        echo "Requête $i => UNKNOWN"
    fi
done

echo "--------------------------------"
echo "Résultat du test Canary :"
echo "Total requêtes : $((BLUE+CANARY))"
echo "BLUE   : $BLUE"
echo "CANARY : $CANARY"
echo "--------------------------------"
