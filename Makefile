# =====================================================
# 🚀 DEVSECOPS GLOBAL MAKEFILE - KUBERNETES PLATFORM
# =====================================================

.SILENT:

# =============================
# ⚙️ CONFIGURATION GLOBALE
# =============================

NS ?= default
CTX ?= kubernetes-admin@kubernetes

ROOT_DIR=.
INFRA_DIR=00-cluster-infra
APPS_DIR=10-applications

# =============================
# 🧠 HELP
# =============================

help:
	echo "Available commands:"
	echo "  make infra"
	echo "  make monitoring"
	echo "  make test"
	echo "  make status"

# =============================
# 🏗️ INFRASTRUCTURES
# =============================

infra:
	echo "🏗️ Deploying full infrastructure..."

	kubectl apply -f $(INFRA_DIR)/rbac/rbac-regle.yaml

	kubectl apply -f $(INFRA_DIR)/storage/

	kubectl apply -f $(INFRA_DIR)/certificate/

	kubectl apply -f $(INFRA_DIR)/backups/

	echo "✅ Infra deployed"


# =============================
# 📊 MONITORING ONLY
# =============================

monitoring:
	echo "📊 Deploying monitoring stack..."
	kubectl apply -f $(INFRA_DIR)/monitoring/prometheus/
	kubectl apply -f $(INFRA_DIR)/monitoring/grafana/
	kubectl apply -f $(INFRA_DIR)/monitoring/loki-promtail/
	echo "✅ Monitoring deployed"

# =============================
# 🧪 TEST ENV (fullstack-app)
# =============================

test:
	echo "🧪 Deploying TEST environment..."
	kubectl apply -f $(APPS_DIR)/fullstack-app/k8s/mysql/
	kubectl apply -f $(APPS_DIR)/fullstack-app/k8s/laravel/
	kubectl apply -f $(APPS_DIR)/fullstack-app/k8s/react/
	echo "✅ Test environment deployed"

# =============================
# 📊 STATUS GLOBAL
# =============================

status:
	echo "📊 Cluster status:"
	kubectl get pods -A
	echo ""
	kubectl get svc -A
	echo ""
	kubectl get ingress -A
	echo ""
	kubectl get pvc -A

# =============================
# 🔄 RESTART APPS
# =============================

restart-react:
	kubectl rollout restart deployment react-insi-m2 -n $(NS)

restart-laravel:
	kubectl rollout restart deployment laravel-insi-m2 -n $(NS)

restart-mysql:
	kubectl rollout restart statefulset mysql-insi-m2 -n $(NS)

# =============================
# 🧹 CLEAN (SAFE)
# =============================

clean:
	echo "🧹 Cleaning applications only..."
	kubectl delete -f $(APPS_DIR)/fullstack-app/k8s/ --ignore-not-found
	kubectl delete -f $(APPS_DIR)/fullstack-app/k8s/ --ignore-not-found
	echo "⚠️ Infra preserved"

# =============================
# 🔥 FULL STACK
# =============================

full:
	echo "🚀 FULL DEPLOY (Infra + Apps)"
	make infra
	make monitoring
	make test
	make status
