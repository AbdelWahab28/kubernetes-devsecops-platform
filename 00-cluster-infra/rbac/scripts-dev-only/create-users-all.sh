#!/bin/bash
echo "🚀 Création massive utilisateurs..."

# 5 Professeurs
for i in {3..7}; do
  echo "=== PROF $i ==="
  ./create-users.sh "prof$i" professeurs
done

# 10 Étudiants  
for i in {3..12}; do
  echo "=== ÉTUDIANT $i ==="
  ./create-users.sh "etudiant$i" etudiants
done

echo "🎉 15 nouveaux utilisateurs créés !"
