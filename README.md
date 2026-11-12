# DB Bridge · landing

Página de descarga de [DB Bridge](https://github.com/gt2rz/db-bridge), publicada en
GitHub Pages: https://gt2rz.github.io/db-bridge-landing/

Astro 7 + Tailwind 4, estática. Los botones enlazan a
`https://github.com/gt2rz/db-bridge/releases/latest/download/<archivo>`, así que siempre
descargan la última versión sin recompilar la landing. La versión, la fecha y los tamaños se
leen de la API de GitHub al compilar; si aún no hay ninguna Release, la página se genera igual
sin esos datos.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321/db-bridge-landing/
npm run build
```

## Despliegue

`.github/workflows/deploy.yml` compila y publica en Pages:

- en cada push a `main`,
- cuando la app publica una Release (evento `repository_dispatch` de tipo `release`),
- una vez al día, por si la app no tiene configurado el aviso,
- a mano desde la pestaña Actions.

Requisitos en GitHub: **Settings → Pages → Source: GitHub Actions**.

## Mantener sincronizado con la app

Los nombres de los archivos de `src/config.ts` (`PLATFORMS[].asset`) deben coincidir con los
que sube `.github/workflows/release.yml` en el repo de la app.
