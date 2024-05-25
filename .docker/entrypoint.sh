#!/usr/bin/env bash
set -e
role=${CONTAINER_ROLE:-app}
env=${APP_ENV:-production}
if [ "$env" != "local" ]; then
    echo "Caching configuration..."
    (cd /var/www/laravel_app && php artisan config:cache && php artisan route:cache && php artisan view:cache)
fi
if [ "$role" = "app" ]; then
    exec apache2-foreground
elif [ "$role" = "queue" ]; then
    echo "Running the queue..."
    php /var/www/laravel_app/artisan queue:work --queue=high,kitchen,medium,low,default --verbose --tries=3 --timeout=90
#    echo "Running kafka"
#    php /var/www/laravel_app/artisan command:running_kafka
elif [ "$role" = "scheduler" ]; then
    while [ true ]
    do
      php /var/www/laravel_app/artisan schedule:run --verbose --no-interaction &
      sleep 60
    done
else
    echo "Could not match the container role \"$role\""
    exit 1
fi


#https://laravel-news.com/laravel-scheduler-queue-docker
