#!/bin/bash

set -e

sleep 5

export PGPASSWORD=secret
psql -h 127.0.0.1 -p 5432 -U postgres postgres < scripts/directory_data_node1.sql
psql -h 127.0.0.1 -p 5433 -U postgres postgres < scripts/directory_data_node2.sql
unset PGPASSWORD
