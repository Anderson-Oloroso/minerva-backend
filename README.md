# Minerva Lib

Backend para Minerva Lib, desarrollado con Node.js, Express y MySQL.

## Versionado

El backend usa [Semantic Versioning (SemVer)](https://semver.org/) (`MAJOR.MINOR.PATCH`).
Al iniciar, `src/config/version.config.js` valida la versión de `package.json` y comprueba
que `API_PREFIX` tenga el mismo número mayor, por ejemplo, `/api/v1` para la versión `1.0.0`.
Si la versión o el prefijo no son válidos o no coinciden, el servidor falla al arrancar.

Al cambiar el número mayor, actualiza también `API_PREFIX` en `.env` y `.env.example`.
Los cambios MINOR y PATCH mantienen el mismo prefijo de API.
