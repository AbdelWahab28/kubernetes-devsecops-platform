# =========================
# STAGE 1 : BUILD
# =========================
FROM composer:2.6 AS builder

WORKDIR /app

# Copier uniquement les fichiers nécessaires à l'installation des dépendances
COPY composer.json composer.lock ./

# Copier le reste de l'application
COPY . .

# Installer les dépendances PHP via Composer
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# =========================
# STAGE 2 : RUNTIME
# =========================
FROM php:8.2-fpm-alpine

# Installer les extensions PHP et Nginx
RUN apk add --no-cache \
    nginx \
    libpng \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    bash \
    git \
    curl \
    icu-dev \
    g++ \
    make \
    autoconf

RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    intl

# Définir le dossier de travail
WORKDIR /var/www

# Copier l'application depuis le builder
COPY --from=builder /app /var/www

# Créer les dossiers nécessaires et définir les permissions
RUN mkdir -p storage bootstrap/cache /var/log/nginx \
 && chown -R www-data:www-data /var/www \
 && chmod -R 775 storage bootstrap/cache

# Copier un fichier de configuration Nginx minimal pour Laravel
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port HTTP pour Nginx
EXPOSE 8080

# Healthcheck HTTP
HEALTHCHECK --interval=30s --timeout=10s --retries=5 \
  CMD curl -f http://localhost:8080/ || exit 1

RUN mkdir -p /var/lib/nginx/tmp /var/lib/nginx/logs \
 && chown -R root:root /var/lib/nginx

# Lancer PHP-FPM et Nginx en foreground
CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]



