# Prolive Valdebebas Norte — web estática

Sitio de **tres páginas** (`index.html` + `videos.html` + `profesionales.html`), listo para
publicar en GitHub + Cloudflare Pages, **pensado para reutilizarse con distintos clientes
cambiando un único archivo de datos** (`config.js`).

Réplica del contenido de <https://prolive.es/valdebebasnorte/> sin WordPress, sin Slider
Revolution y sin plugins: HTML + Tailwind (CDN) + Lucide Icons (CDN) + JS vanilla.

---

## Contenido

| Archivo | Qué es |
|---|---|
| `index.html` | Página principal: hero, servicios, por qué elegirnos, banner de equipo, tarifas, banner de vídeos, opiniones y contacto con mapa. |
| `videos.html` | Página de vídeos en zigzag (vídeo/texto alternados). |
| `profesionales.html` | Página del equipo: **rejilla de 3 por fila**, así que con 6 personas salen 2 filas de 3. |
| `config.js` | **Todos los datos del negocio.** Nombre, contacto, dirección, colores, textos de cada sección, servicios y precios, equipo, vídeos y opiniones. |
| `app.js` | Toda la lógica, compartida por las tres páginas. No contiene ningún dato del cliente. |
| `images/favicon.svg` | Icono de la pestaña del navegador. |

Las tres páginas cargan `config.js` y `app.js` y, al abrirse, rellenan automáticamente
todos los textos, enlaces, colores y bloques repetidos — incluidos los modales de
Aviso Legal, Política de Privacidad y Política de Cookies.

> **Cambio respecto a la plantilla anterior:** antes el bloque `<script>` estaba duplicado
> dentro de cada `.html` y había que replicar a mano cualquier cambio. Ahora vive una sola
> vez en `app.js`. Con tres páginas, mantenerlo duplicado era pedir problemas.
> Cada bloque de `app.js` comprueba si el elemento existe antes de pintar nada, así que
> el mismo archivo sirve para las tres páginas.

---

## Cómo crear la web de un cliente nuevo

1. Copia los tres `.html`, `config.js` y `app.js` a un proyecto nuevo.
2. Abre **`config.js`** y sustituye los valores. **No hace falta tocar el HTML ni `app.js`.**
3. Sube las imágenes (ver abajo) y los vídeos.

---

## Imágenes

Crea una carpeta `images/` junto a los `.html`:

| Archivo | Dónde aparece | Proporción |
|---|---|---|
| `images/logo.png` | Header y footer (sustituye al icono) | cuadrado, fondo transparente |
| `images/hero.jpg` | Foto grande de la portada | vertical 4:5 |
| `images/about.jpg` | Sección «Por qué elegirnos» | cuadrada 1:1 |
| `images/equipo.jpg` | Cabecera de `profesionales.html` | horizontal 16:10 |
| `images/equipo-1.jpg` … `equipo-6.jpg` | Cada profesional | vertical 4:5 |

**Mientras un archivo no exista, la web no se rompe:** se muestra el icono por defecto
(logo), un placeholder gris (fotos de sección) o las iniciales del profesional con el
texto «Foto pendiente». En la consola del navegador queda un aviso indicando qué archivo
falta, para que sea fácil detectarlo.

Comprime las fotos antes de subirlas: JPG de máximo 1600 px de ancho y ~200 KB.

---

## Vídeos

Crea una carpeta `videos/` junto a los `.html`, con un clip y una portada por vídeo:

- `videos/video-1.mp4` + `videos/video-1-poster.jpg`
- `videos/video-2.mp4` + `videos/video-2-poster.jpg`
- `videos/video-3.mp4` + `videos/video-3-poster.jpg`

Rutas configurables desde el array `videos` de `config.js` (campos `video` y `poster`).
**El poster es obligatorio:** sin él, el navegador muestra un recuadro negro hasta que se
pulsa play. El reproductor usa `preload="none"`, así que no descarga nada del vídeo hasta
que el visitante le da al play y no penaliza la velocidad de carga.

Comprime los clips (H.264/MP4, 720p) — **Cloudflare Pages limita a 25 MB por archivo.**

Puedes poner los vídeos que quieras: no tienen que ser exactamente 3. Se muestran en
zigzag automáticamente (el 1º y el 3º con el vídeo a la izquierda, el 2º al revés).

---

## La sección «Nuestros profesionales»

Es el array **`team`** de `config.js`. Cada persona es un objeto con:

```js
{
  name: "Alejandro García",
  role: "Director · Fisioterapeuta colegiado nº 12648",
  description: "Dos o tres líneas contando su especialidad.",
  photo: "images/equipo-1.jpg",
  initials: "AG",                       // se ven mientras no haya foto
  tags: ["Terapia manual", "Ecografía"] // etiquetas cortas, o [] para ninguna
}
```

La rejilla es `sm:grid-cols-2 lg:grid-cols-3`: **una columna en móvil, dos en tablet y tres
en escritorio.** Con 6 personas quedan las dos filas de tres. Si pones 5 o 7 se recolocan
solas; no hay que tocar el HTML.

En la portada hay además un banner (`teamCta` en `config.js`) que muestra los retratos de
los 5 primeros del equipo y enlaza a esta página.

---

## Reservas: Doctoralia hoy, Cal.com cuando quieras

El botón «Reservar Cita» aparece en las tres páginas y su destino lo decide `config.js`:

```js
booking: {
  calLink: "",                                                    // usuario de Cal.com
  doctoraliaUrl: "https://www.doctoralia.es/clinicas/prolive-valdebebas"
}
```

- **`calLink` vacío** → el botón abre el enlace de `doctoraliaUrl` en una pestaña nueva.
  Es como está entregado ahora, para no tocar nada de su operativa actual.
- **`calLink` con un usuario** (ej. `"prolive"`) → el botón abre un modal con el calendario
  de Cal.com integrado en la propia web, sin salir de ella. El script de Cal.com solo se
  descarga cuando alguien pulsa el botón.
- Si ambos están vacíos, cae a WhatsApp.

Así puedes cerrar la web ahora y proponer el cambio de plataforma después, cambiando
una línea.

---

## Por qué esta web va a ir mucho más rápida que la actual

La web actual es WordPress con **Slider Revolution 6.0.7** y Google Tag Manager. Solo el
slider arrastra varios cientos de KB de JS y CSS, además de las consultas a la base de
datos en cada visita. Aquí:

- **No hay servidor ni base de datos.** Son archivos estáticos servidos desde el CDN de
  Cloudflare, cerca del visitante.
- **El mapa de Google no se carga al entrar.** Se inserta solo cuando estás a punto de
  llegar a la sección de contacto (`IntersectionObserver`). Un iframe de Maps son cientos
  de KB que la mayoría de visitantes nunca necesita.
- **Cal.com solo se descarga al pulsar «Reservar».**
- **Los vídeos usan `preload="none"`**: cero bytes hasta que se pulsa play.
- **Lucide se carga con `defer`** y las fotos con `loading="lazy"`.

Si más adelante quieres exprimirlo del todo, el siguiente paso es compilar Tailwind a un
CSS propio en vez de usar el CDN. Se gana bastante, pero a cambio hay que introducir un
paso de build — y ahora mismo la gracia es que cualquiera pueda editar `config.js` y subir
el cambio sin instalar nada.

---

## Publicar la web

1. Sube `index.html`, `videos.html`, `profesionales.html`, `config.js`, `app.js`,
   `images/` y `videos/` a la raíz de un repositorio de GitHub.
2. En Cloudflare Pages, crea un proyecto conectado a ese repositorio:
   - **Framework preset:** `None`
   - **Build command:** *(vacío)*
   - **Build output directory:** `/`
3. Queda publicada en `https://<proyecto>.pages.dev`. Cada `git push` redespliega solo.

Cuando la web esté aprobada, se apunta el dominio a Cloudflare y se da de baja el hosting
de WordPress.

---

## Pendiente antes de publicar

- [ ] Sustituir los **6 profesionales de ejemplo** en `config.js` (`team`): nombres reales,
      rol, descripción y fotos en `images/equipo-1.jpg` … `equipo-6.jpg`
- [ ] Sustituir las **3 opiniones de ejemplo** (`testimonials`) por reseñas reales
      copiadas de Doctoralia o Google
- [ ] Subir `logo.png`, `hero.jpg`, `about.jpg` y `equipo.jpg`
- [ ] Subir los 3 vídeos con sus portadas, o reducir el array `videos` a los que haya
- [ ] **Confirmar el horario** (`contact.hoursLines`): el que hay puesto es una estimación,
      la web actual no lo publica
- [ ] Confirmar la dirección: `C/ Luis Moya Blanco, 44, 28055 Madrid` (sacada de su Aviso
      Legal y de su ficha de Doctoralia)
- [ ] Decidir si se activa Cal.com (`booking.calLink`) o se mantiene Doctoralia

## Notas

- `config.js` debe cargarse **antes** que `app.js` (ya está así en el `<head>` de las tres
  páginas, ambos con `defer`, que respeta el orden del documento).
- Si `config.js` no se encuentra, las páginas se muestran con los campos vacíos y aparece
  un aviso en la consola del navegador.
- `videos.html` y `profesionales.html` llevan su propio `<title>` y `<meta description>`
  fijos en el `<head>` (marcados con `data-own-meta` en el `<body>`). Solo `index.html`
  los toma de `config.js`. Edítalos ahí si quieres cambiarlos.
