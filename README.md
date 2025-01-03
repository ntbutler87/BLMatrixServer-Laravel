## Setup / Prerequisites
1. Ensure you have Docker installed and running
1. Ensure you have PHP and Composer installed
    1. Composer install instructions available at https://getcomposer.org/download/
1. Clone the respoisitiory by running `git clone https://github.com/ntbutler87/BLMatrixServer-Laravel.git`
1. CD into the repo folder - e.g. `cd BLMatrixServer-Laravel`
1. Copy the `.env.example` file to `.env` - e.g. `cp .env.example .env`
1. In the `.env` file, set the MATRIX_IP and MATRIX_PORT values as necessary
    1. If using the [BLMatrixServer](https://github.com/ntbutler87/BLMatrixServer) simulation server as the matrix, the default port that the simulator runs on is 3000. The actual matrix runs on port 80
1. Run `composer install`
1. Run `php artisan key:generate`
1. Run `npm install`
1. Run `npm run build`
1. Run `./vendor/bin/sail up -d`
    1. This should build the docker images/containers and start them, so might take some time.
1. Run `./vendor/bin/sail artisan migrate` to finish setting up the database
