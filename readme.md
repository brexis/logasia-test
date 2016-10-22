# Logasia test assignment

[![Build Status](https://travis-ci.org/brexis/logasia-test.svg)](https://travis-ci.org/brexis/logasia-test)

This project uses Laravel 5.3, Angular 1.5.8 with MariaDB database.

## Requirements

* Php >=5.6.4
* MariaDB >= 5.6.0

## Installation

* Create a new MariaDB database
* Duplicate the file `.env.example` to `.env`
* Change the `DATABASE_URL` environment variable according to your database name. (Ex: `mysql://user:password@127.0.0.1:3306/database`)
* In the project folder run : `php artisan migrate`
* Launch the application `php artisan serve`
* Browse to the url `http://localhost:8000`

## Testing

Unit tests are available in the folder `tests/`. Run the tests with the following command:
* `vendor/bin/phpunit`
