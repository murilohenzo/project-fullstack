#!/bin/bash

echo "Digite o nome do modulo a ser gerado"

read module

cd src/modules && mkdir -p $module/{useCases,dtos,infra/{orm/entities,repositories/implements},interfaces/{controllers,routes}}
