FROM php:8.2.11-apache
USER root

RUN apt-get update && \
    apt-get install --yes --force-yes \
    cron g++ gettext libicu-dev openssl \
    libc-client-dev libkrb5-dev  \
    libxml2-dev libfreetype6-dev \
    libgd-dev libmcrypt-dev bzip2 \
    libbz2-dev libtidy-dev libcurl4-openssl-dev \
    libz-dev libmemcached-dev libxslt-dev git-core libpq-dev \
    libzip4 libzip-dev libwebp-dev


# PHP Configuration
RUN docker-php-ext-install bcmath bz2 calendar  dba exif gettext iconv intl  soap tidy xsl zip&&\
    docker-php-ext-install mysqli pgsql pdo pdo_mysql pdo_pgsql  &&\
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp &&\
    docker-php-ext-install gd &&\
    docker-php-ext-configure imap --with-kerberos --with-imap-ssl &&\
    docker-php-ext-install imap &&\
    docker-php-ext-configure hash --with-mhash &&\
    # pecl install xdebug && docker-php-ext-enable xdebug &&\
    pecl install mongodb && docker-php-ext-enable mongodb &&\
    pecl install redis && docker-php-ext-enable redis && \
    curl -sS https://getcomposer.org/installer | php \
            && mv composer.phar /usr/bin/composer


ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS="0" \
    PHP_OPCACHE_MAX_ACCELERATED_FILES="10000" \
    PHP_OPCACHE_MEMORY_CONSUMPTION="192" \
    PHP_OPCACHE_MAX_WASTED_PERCENTAGE="10"

RUN docker-php-ext-install opcache

COPY .docker/php/conf.d/opcache.ini /usr/local/etc/php/conf.d/opcache.ini


# Imagemagick : install fails on 8.0
RUN apt-get install --yes --force-yes libmagickwand-dev libmagickcore-dev
RUN yes '' | pecl install -f imagick &&\
    docker-php-ext-enable imagick


# Clear package lists
RUN apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN a2enmod rewrite
RUN a2enmod ssl

# Use the default production configuration
#RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY .docker/php.ini $PHP_INI_DIR/php.ini
#change document root or other Apache configuration
ENV APACHE_DOCUMENT_ROOT /var/www/laravel_app/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf


COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY .docker/start-apache /usr/local/bin
COPY .docker/entrypoint.sh /usr/local/bin
COPY ./laravel_app /var/www/laravel_app

# Permissions
RUN chown -R www-data:www-data \
  /var/www/laravel_app/storage \
  /var/www/laravel_app/bootstrap/cache



WORKDIR /var/www/laravel_app

RUN composer install

# create storage symlink
RUN php artisan storage:link


RUN ["chmod", "+x", "/usr/local/bin/entrypoint.sh"]
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
EXPOSE 80
EXPOSE 443

#docker comment
#https://www.codenotary.com/blog/extremely-useful-docker-commands/
