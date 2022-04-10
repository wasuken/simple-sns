FROM php:8.1-apache

RUN apt update \
	&& apt install -y \
	g++ \
	libicu-dev \
	libpq-dev \
	libzip-dev \
	zip \
	zlib1g-dev \
	curl \
	gnupg \
	git \
	&& docker-php-ext-install \
	intl \
	opcache \
	pdo \
	pdo_pgsql \
	pgsql

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g

RUN cd /etc/apache2/mods-enabled \
    && ln -s ../mods-available/rewrite.load

WORKDIR /var/www/laravel_docker

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY ./start.sh /start.sh

RUN chmod +x /start.sh

CMD /start.sh
