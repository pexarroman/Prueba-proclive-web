# Plantilla de web para clínicas — Prolive Valdebebas Norte

Sitio de **tres páginas** (`index.html` + `videos.html` + `profesionales.html`), listo para
publicar en GitHub + Cloudflare Pages, **pensado para reutilizarse con distintos clientes
cambiando un único archivo de datos** (`config.js`).

HTML + Tailwind (CDN) + Lucide Icons (CDN) + JS vanilla. Sin WordPress, sin plugins,
sin build, sin base de datos.

---

## El flujo de trabajo completo

```
  1. El negocio rellena         2. Tú copias las respuestas      3. Subes a GitHub
     Ficha-de-datos-              a config.js, campo a            y Cloudflare
     del-negocio.docx             campo por su número             lo publica
          │                             │                              │
          └──── 15 apartados ───────────┴──── [1.1] [3.5] [11.2] ──────┘
                numerados                     los mismos números
```

El Word y `config.js` están numerados **igual**. El campo `1.2` del documento se copia al
hueco marcado `// [1.2]` en `config.js`. No hay que interpretar nada ni tocar el HTML.

---

## Contenido

| Archivo | Qué es | ¿Se toca? |
|---|---|---|
| `index.html` | Portada: hero, servicios, por qué elegirnos, banner de equipo, tarifas, banner de vídeos, opiniones y contacto con mapa | No |
| `videos.html` | Vídeos en zigzag (vídeo/texto alternados) | No |
| `profesionales.html` | Equipo: rejilla de 3 por fila | No |
| `config.js` | **Todos los datos del negocio**, numerados según el Word | **Sí** |
| `app.js` | La lógica, compartida por las tres páginas | No |
| `Ficha-de-datos-del-negocio.docx` | El formulario que rellena el cliente | Se envía |
| `Manual-web-Prolive.pdf` | Manual de carpetas y nombres de archivo | Se envía |
| `images/favicon.svg` | Icono de la pestaña | No |

Las tres páginas cargan `config.js` y `app.js` y, al abrirse, rellenan automáticamente
todos los textos, enlaces, colores y bloques repetidos — incluidos los modales de
Aviso Legal, Política de Privacidad y Política de Cookies.

> **Una sola copia de la lógica.** En versiones anteriores de esta plantilla el bloque
> `<script>` estaba duplicado dentro de cada `.html` y había que replicar a mano cualquier
> cambio. Ahora vive una sola vez en `app.js`. Cada bloque comprueba si el elemento existe
> antes de pintar nada, así que el mismo archivo sirve para las tres páginas.

---

## Reservas: dónde se cambia el botón «Reservar Cita»

**En `config.js`, apartado `booking`.** En ningún otro sitio. El botón aparece en las tres
páginas y todos apuntan al mismo destino.

```js
booking: {
  calLink: "angelpm",        // [5.1] usuario de Cal.com  ← ACTIVO
  doctoraliaUrl: ""          // [5.2] alternativa si calLink está vacío
}
```

Ahora mismo está configurado con **`calLink: "angelpm"`**, así que el botón abre el
calendario de <https://cal.com/angelpm> dentro de una ventana en la propia web. El enlace
antiguo de Doctoralia está vacío y ya no se usa.

**`calLink` es solo el nombre de usuario**, lo que va detrás de `cal.com/`. No la dirección
entera, no barras, no `https://`.

| Lo que pongas en `calLink` | Lo que hace el botón |
|---|---|
| `"angelpm"` | Abre el calendario de Cal.com en una ventana, sin salir de la web |
| `""` (vacío) | Abre el enlace de `doctoraliaUrl` en una pestaña nueva |
| `""` y `doctoraliaUrl` también vacío | Abre WhatsApp con el mensaje ya escrito |

El script de Cal.com solo se descarga cuando alguien pulsa el botón: no penaliza la
velocidad de carga de la página.

Para cambiar de cuenta de Cal.com en el futuro, se edita esa única línea. Nada más.

---

## Cómo adaptar la plantilla a un cliente nuevo

1. Copia los tres `.html`, `config.js` y `app.js` a un proyecto nuevo.
2. Envía al cliente **`Ficha-de-datos-del-negocio.docx`** y **`Manual-web-Prolive.pdf`**.
3. Cuando te devuelva la ficha rellena, copia cada respuesta a su hueco de `config.js`
   siguiendo los números entre corchetes.
4. Coloca las fotos y los vídeos que te haya enviado en `images/` y `videos/`.
5. Sube a GitHub y conecta Cloudflare Pages.

**No hace falta tocar el HTML ni `app.js` en ningún momento.**

### Mapa de números → config.js

| Apartado del Word | Bloque de `config.js` |
|---|---|
| 1 · Identidad de marca | `brand` |
| 2 · Datos legales | `legal` |
| 3 · Contacto | `contact` |
| 4 · Redes sociales | `contact.instagramUrl`, `contact.facebookUrl` |
| 5 · Reserva de citas | `booking` |
| 6 · Colores | `colors` |
| 7 · Portada | `hero` y `meta` |
| 8 · Servicios | `servicesSection` y `services` |
| 9 · Tarifas | `pricingSection` y `pricingNotes` |
| 10 · Por qué elegirnos | `aboutSection` y `whyUs` |
| 11 · El equipo | `teamCta`, `teamSection` y `team` |
| 12 · Vídeos | `ctaVideosSection`, `videosSection` y `videos` |
| 13 · Opiniones | `testimonialsSection` y `testimonials` |
| 14 · Cierre | `contactSection` y `footer` |
| 15 · Archivos | carpetas `images/` y `videos/` |

---

## Número de profesionales

**La web se adapta sola.** La rejilla es `sm:grid-cols-2 lg:grid-cols-3`: una columna en
móvil, dos en tablet y tres en escritorio.

- Con **3, 6 o 9** las filas quedan completas — es lo que mejor se ve.
- Con **4, 5, 7 u 8** también funciona: la última fila queda incompleta.

Para cambiar el número, se añaden o se borran bloques `{ ... }` del array `team` en
`config.js`. No hay que tocar el HTML. El campo **11.0** del Word pregunta directamente
cuántos son, y hay nueve bloques preparados para rellenar.

Las fotos se numeran **en el mismo orden**: `equipo-1.jpg` es la primera tarjeta,
`equipo-6.jpg` la sexta.

---

## Imágenes

Carpeta `images/` junto a los `.html`:

| Archivo | Dónde aparece | Proporción |
|---|---|---|
| `logo.png` | Header y footer (sustituye al icono) | cuadrado, fondo transparente |
| `hero.jpg` | Foto grande de la portada | vertical 4:5 · 1200 × 1500 |
| `about.jpg` | Sección «Por qué elegirnos» | cuadrada 1:1 · 1200 × 1200 |
| `equipo.jpg` | Cabecera de `profesionales.html` | apaisada 16:10 · 1600 × 1000 |
| `equipo-1.jpg` … `equipo-9.jpg` | Cada profesional, en orden | vertical 4:5 · 1000 × 1250 |

**Mientras un archivo no exista, la web no se rompe:** se muestra el icono por defecto
(logo), un placeholder gris (fotos de sección) o las iniciales del profesional con el texto
«Foto pendiente». En la consola del navegador queda un aviso indicando qué archivo falta.

Comprime antes de subir: JPG de máximo 1600 px de ancho y ~300 KB.

---

## Vídeos

Carpeta `videos/` junto a los `.html`. **Cada vídeo son dos archivos:**

- `videos/video-1.mp4` + `videos/video-1-poster.jpg`
- `videos/video-2.mp4` + `videos/video-2-poster.jpg`
- `videos/video-3.mp4` + `videos/video-3-poster.jpg`

**El poster es obligatorio:** sin él el navegador muestra un recuadro negro hasta que se
pulsa play. El reproductor usa `preload="none"`, así que no descarga nada del vídeo hasta
ese momento.

MP4 H.264 a 720p, y **máximo 25 MB por archivo** — es un límite de Cloudflare Pages, no una
recomendación.

Pueden ser los que quieras: el zigzag se recoloca solo (el 1º y el 3º con el vídeo a la
izquierda, el 2º al revés).

---

## Por qué esta web va rápida

- **Sin servidor ni base de datos.** Archivos estáticos servidos desde el CDN de Cloudflare.
- **El mapa de Google no se carga al entrar.** Se inserta cuando el visitante está a punto
  de llegar a la sección de contacto (`IntersectionObserver`). Un iframe de Maps son cientos
  de KB que la mayoría nunca necesita.
- **Cal.com solo se descarga al pulsar «Reservar».**
- **Los vídeos usan `preload="none"`:** cero bytes hasta que se pulsa play.
- **Lucide se carga con `defer`** y las fotos con `loading="lazy"`.

Si más adelante quieres exprimirlo del todo, el siguiente paso es compilar Tailwind a un CSS
propio en vez de usar el CDN. Se gana bastante, pero introduce un paso de build — y ahora
mismo la gracia es que cualquiera pueda editar `config.js` y subir el cambio sin instalar
nada.

---

## Publicar

1. Sube todo (los tres `.html`, `config.js`, `app.js`, `images/` y `videos/`) a la raíz de
   un repositorio de GitHub.
2. En Cloudflare Pages, crea un proyecto conectado a ese repositorio:
   - **Framework preset:** `None`
   - **Build command:** *(vacío)*
   - **Build output directory:** `/`
3. Queda publicada en `https://<proyecto>.pages.dev`. Cada `git push` redespliega solo.

---

## Pendiente en este proyecto

- [ ] Sustituir los **6 profesionales de ejemplo** de `config.js` por los reales
- [ ] Sustituir las **3 opiniones de ejemplo** por reseñas reales
- [ ] Subir `logo.png`, `hero.jpg`, `about.jpg`, `equipo.jpg` y los `equipo-N.jpg`
- [ ] Subir los vídeos con sus portadas, o reducir el array `videos`
- [ ] **Confirmar el horario** (`contact.hoursLines`): el que hay es una estimación
- [ ] Confirmar la dirección: `C/ Luis Moya Blanco, 44, 28055 Madrid`
- [ ] Verificar que el usuario de Cal.com `angelpm` tiene creados los tipos de cita
      correctos y el calendario conectado

## Notas técnicas

- `config.js` debe cargarse **antes** que `app.js` (ya está así en el `<head>` de las tres
  páginas, ambos con `defer`, que respeta el orden del documento).
- Si `config.js` no se encuentra, las páginas salen con los campos vacíos y aparece un aviso
  en la consola del navegador.
- `videos.html` y `profesionales.html` llevan su propio `<title>` y `<meta description>` en
  el `<head>` (marcados con `data-own-meta` en el `<body>`). Solo `index.html` los toma de
  `config.js`.
- Todos los botones de reserva llevan el atributo `data-booking`; `app.js` les asigna el
  destino en un solo sitio (`wireBookingButtons`).
