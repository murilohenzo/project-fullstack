#!/bin/bash

while getopts m: flag
do
    case "${flag}" in
        m) module=${OPTARG};;
    esac
done
cd src/modules && mkdir -p $module/{useCases,dtos,infra/{orm/entities,repositories/implements},interfaces/{controllers,routes}}
