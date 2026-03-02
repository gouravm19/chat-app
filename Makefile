.PHONY: start stop logs import test clean

start:
	docker compose up -d --build

stop:
	docker compose down

logs:
	docker compose logs -f n8n

import:
	bash scripts/import-workflows.sh

test:
	docker compose exec companion-api ./mvnw test
	cd frontend && npm run test -- --run

clean:
	docker compose down -v
