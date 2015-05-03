#!/bin/bash

# starting mongodb
echo "Starting mongo..."
mongod &
echo "Started!"

# starting wallets
echo "Starting wallets..."
node bin/www &
echo "Started!"