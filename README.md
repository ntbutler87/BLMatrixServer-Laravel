## Setup / Prerequisites
1. Ensure you have Docker installed and running
1. Ensure you have PHP and Composer installed
1. Clone the respoisitiory
1. CD into the repo folder
1. Copy the `.env.example` file to `.env`
1. In the `.env` file, set the MATRIX_IP and MATRIX_PORT values as necessary
    1. If using the [BLMatrixServer](https://github.com/ntbutler87/BLMatrixServer) simulation server as the matrix, the default port that the simulator runs on is 3000. The actual matrix runs on port 80
1. Set the credentials for the MYSQL instance in the `.env` file
1. Run `composer install`
1. Run `php artisan key:generate`
1. Run `npm install`
1. Run `npm run build`
1. Run `./vendor/bin/sail up`
    1. This should build the docker images/containers and start them, so might take some time. Included in this should be a new MYSQL server container, so once finished starting, the application should be running, but there is still some more
1. In a new terminal window running in the project folder, run `./vendor/bin/sail artisan migrate` to finish setting up the database
