#!/bin/bash
echo -e "\n🧪 Audit RBAC complet...\n"

# Couleurs pour la sortie
GREEN="\e[32m"
RED="\e[31m"
YELLOW="\e[33m"
RESET="\e[0m"

# Définir les utilisateurs et leurs namespaces
declare -A USERS
USERS=( ["abdel"]="professeurs" ["abdelwahab"]="etudiants" )

# Ressources à tester dans le namespace de l'utilisateur
RESOURCES=("pods" "configmaps" "services" "deployments")

# Header
printf "%-15s %-12s %-12s %-10s\n" "Utilisateur" "Namespace" "Ressource" "Accès"
printf "%-15s %-12s %-12s %-10s\n" "-----------" "---------" "---------" "----"

for USER in "${!USERS[@]}"; do
    NS="${USERS[$USER]}"
    KUBECONFIG="$HOME/.kube/${USER}.conf"

    # Vérifier si kubeconfig existe
    if [ ! -f "$KUBECONFIG" ]; then
        for RESOURCE in "${RESOURCES[@]}"; do
            printf "%-15s %-12s %-12s %-10s\n" "$USER" "$NS" "$RESOURCE" "${RED}❌ absent${RESET}"
        done
        # Test accès aux autres namespaces
        for OTHER_NS in professeurs etudiants; do
            if [ "$OTHER_NS" != "$NS" ]; then
                printf "%-15s %-12s %-12s %-10s\n" "$USER" "$OTHER_NS" "pods" "${RED}❌ absent${RESET}"
            fi
        done
        continue
    fi

    # Tester accès aux ressources dans son propre namespace
    for RESOURCE in "${RESOURCES[@]}"; do
        kubectl get "$RESOURCE" -n "$NS" --kubeconfig="$KUBECONFIG" --ignore-not-found &>/dev/null
        if [ $? -eq 0 ]; then
            STATUS="${GREEN}✅ autorisé${RESET}"
        else
            STATUS="${RED}❌ bloqué${RESET}"
        fi
        printf "%-15s %-12s %-12s %-10b\n" "$USER" "$NS" "$RESOURCE" "$STATUS"
    done

    # Tester accès aux autres namespaces (doit échouer)
    for OTHER_NS in professeurs etudiants; do
        if [ "$OTHER_NS" != "$NS" ]; then
            kubectl get pods -n "$OTHER_NS" --kubeconfig="$KUBECONFIG" &>/dev/null
            if [ $? -eq 0 ]; then
                STATUS="${RED}❌ accès non autorisé${RESET}"
            else
                STATUS="${GREEN}✅ bloqué${RESET}"
            fi
            printf "%-15s %-12s %-12s %-10b\n" "$USER" "$OTHER_NS" "pods" "$STATUS"
        fi
    done
done

# Tester Admin cluster
echo -e "\nAdmin           cluster      nodes"
if [ -f "$HOME/.kube/admin.conf" ]; then
    KUBECONFIG="$HOME/.kube/admin.conf" kubectl get nodes &>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "Admin           cluster      nodes           ${GREEN}✅ OK${RESET}"
    else
        echo -e "Admin           cluster      nodes           ${RED}❌ KO${RESET}"
    fi
else
    echo -e "⚠️ Admin kubeconfig introuvable, ignorer"
fi

echo -e "\n🎯 Audit RBAC terminé.\n"
