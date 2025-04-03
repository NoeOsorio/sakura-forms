#!/bin/bash

# Cargar variables de entorno
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
else
  echo "Error: .env file not found"
  exit 1
fi

# Verificar que las variables necesarias estén definidas
if [ -z "$SUPABASE_PROJECT_REF" ] || [ -z "$SUPABASE_DB_PASSWORD" ]; then
  echo "Error: SUPABASE_PROJECT_REF and SUPABASE_DB_PASSWORD must be defined in .env"
  exit 1
fi

# Función para mostrar ayuda
show_help() {
  echo "Usage: ./migrate.sh [command]"
  echo ""
  echo "Commands:"
  echo "  push     - Push migrations to remote database"
  echo "  status   - Show migration status"
  echo "  new      - Create a new migration"
  echo "  help     - Show this help message"
}

# Función para crear una nueva migración
create_migration() {
  if [ -z "$1" ]; then
    echo "Error: Migration name is required"
    exit 1
  fi
  supabase migration new "$1"
}

# Función para mostrar el estado de las migraciones
show_status() {
  supabase db push --dry-run
}

# Función para aplicar las migraciones
push_migrations() {
  echo "Pushing migrations to remote database..."
  supabase db push --db-url "$SUPABASE_DB_URL"
}

# Procesar el comando
case "$1" in
  push)
    push_migrations
    ;;
  status)
    show_status
    ;;
  new)
    create_migration "$2"
    ;;
  help|*)
    show_help
    ;;
esac 