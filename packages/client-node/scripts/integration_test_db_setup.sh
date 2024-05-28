#!/bin/bash

set -e

sleep 5

export PGPASSWORD=secret
psql -h 127.0.0.1 -U postgres postgres < scripts/directory_data.sql
unset PGPASSWORD
