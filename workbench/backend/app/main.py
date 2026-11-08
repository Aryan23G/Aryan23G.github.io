"""FastAPI application factory.

    uvicorn app.main:app --reload            # dev
    uvicorn app.main:create_app --factory    # explicit factory
"""

from __future__ import annotations

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import protected, router
from app.api.security import Guards
from app.config import Settings, get_settings
from app.container import Container, build_container
from app.db import seed


def create_app(settings: Settings | None = None, container: Container | None = None) -> FastAPI:
    settings = settings or get_settings()

    @asynccontextmanager
    async def lifespan(app: FastAPI) -> AsyncIterator[None]:
        if container is not None:
            app.state.container = container
        else:
            if settings.database_url == Settings.model_fields["database_url"].default:
                seed.ensure()  # first run: generate the sample warehouse
            app.state.container = build_container(settings)
        yield
        if container is None:  # injected containers are owned by the caller
            app.state.container.close()

    app = FastAPI(title="QueryPilot Workbench API", version="1.0.0", lifespan=lifespan)
    app.add_middleware(
        CORSMiddleware, allow_origins=settings.cors_origins, allow_methods=["GET", "POST"],
        allow_headers=["Authorization", "Content-Type", "Accept"])
    app.state.guards = Guards(settings)
    app.include_router(router)
    app.include_router(protected)
    return app


app = create_app()
