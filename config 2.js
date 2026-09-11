/* =====================================================================
   DATOS DEL NEGOCIO
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para adaptar la web a un
   negocio nuevo. No se toca ningún .html ni app.js.

   CÓMO SE RELLENA
   ---------------
   El negocio rellena el documento Word «Ficha de datos del negocio».
   Cada campo de ese Word tiene un número (1.1, 3.5, 11.2...) y aquí
   abajo aparece el mismo número entre corchetes. Solo hay que copiar
   cada respuesta a su hueco.

        Word: «1.2 Primera parte del nombre .......... Pro»
        Aquí: namePart1: "Pro",   // [1.2]

   TRES NORMAS AL EDITAR
   ---------------------
   1. El texto va SIEMPRE entre comillas dobles: "así".
   2. No borres las comas del final de cada línea.
   3. No cambies las palabras de la izquierda (namePart1, phoneDisplay...).
      Esas son las que busca la web.

   Si la web sale en blanco después de editar, es casi siempre una comilla
   o una coma que falta en la última línea que tocaste.
   ===================================================================== */

window.SITE_CONFIG = {

  /* ------------------------------------------------------------------
     SEO — lo que se lee en la pestaña del navegador y en Google
     ------------------------------------------------------------------ */
  meta: {
    title: "Kinetia Zaragoza | Fisioterapia y Pilates en el Actur",   // [7.9]
    description: "Clínica de fisioterapia en el Actur (Zaragoza): lesiones deportivas, suelo pélvico, pilates e hipopresivos. Reserva tu cita online.",  // [7.10]
    lang: "es"
  },

  /* ------------------------------------------------------------------
     1 · IDENTIDAD DE MARCA
     El nombre se parte en dos para pintar la segunda mitad en color.
     "Kine" + "tia"  →  Kine**tia**
     ------------------------------------------------------------------ */
  brand: {
    namePart1: "Kine",                 // [1.2] primera parte, en color oscuro
    namePart2: "tia",                  // [1.3] segunda parte, en color de marca
    tagline: "Actur · Zaragoza",       // [1.4] texto pequeño bajo el nombre. "" para ocultarlo
    icon: "activity"                   // icono de respaldo mientras no exista images/logo.png
  },

  /* ------------------------------------------------------------------
     IMÁGENES
     Rutas a los archivos de la carpeta images/.
     NO hace falta cambiar nada aquí si se respetan los nombres del manual.
     Mientras un archivo no exista, sale un placeholder. Nada se rompe.
     ------------------------------------------------------------------ */
  images: {
    logo: "images/logo.png",       // logo del negocio (cabecera y pie)
    hero: "images/hero.jpg",       // foto grande de la portada
    about: "images/about.jpg",     // foto de "Por qué elegirnos"
    team: "images/equipo.jpg"      // foto de grupo, cabecera de profesionales.html
  },

  /* ------------------------------------------------------------------
     6 · COLORES DE MARCA
     Códigos hexadecimales, con la almohadilla delante.
     ------------------------------------------------------------------ */
  colors: {
    primary: "#0e7490",        // [6.1] color principal: botones, enlaces, detalles
    primaryDark: "#155e75",    // [6.2] el mismo pero más oscuro, para el hover
    secondary: "#111827"       // [6.3] color oscuro de las bandas y el pie
  },

  /* ------------------------------------------------------------------
     3 y 4 · CONTACTO Y REDES
     ------------------------------------------------------------------ */
  contact: {
    phoneDisplay: "+34 644 218 903",   // [3.1] como se LEE en la web, con espacios
    phoneHref: "+34644218903",         // [3.2] como se MARCA al pulsar: sin espacios
    whatsappNumber: "34644218903",     // [3.3] sin + y sin espacios
    whatsappMessage: "Hola, me gustaría pedir cita en Kinetia",  // [3.4]
    email: "hola@kinetiafisio.es",                               // [3.5]
    address: "C/ Pablo Ruiz Picasso, 18, 50018 Zaragoza",        // [3.6]
    mapEmbedQuery: "Calle Pablo Ruiz Picasso 18, 50018 Zaragoza",  // sale de [3.6], para el mapa

    // [3.7] [3.8] [3.9] Horario. Una línea por entrada. Añade o quita líneas libremente.
    hoursLines: [
      "Lunes a viernes: 08:00–21:00",
      "Sábados: 09:00–14:00",
      "Domingos: cerrado"
    ],

    // [4.1] y [4.2] Enlaces COMPLETOS al perfil. "" oculta ese icono.
    instagramUrl: "https://www.instagram.com/kinetiafisio",
    facebookUrl: "https://www.facebook.com/kinetiafisio"
  },

  /* ------------------------------------------------------------------
     5 · RESERVAS — a dónde lleva el botón «Reservar Cita»
     ------------------------------------------------------------------
     Hay tres comportamientos posibles, por orden de prioridad:

       1. calLink con un usuario  →  abre el calendario de Cal.com dentro
                                     de la propia web, en una ventana.
       2. calLink vacío ("")      →  abre el enlace de doctoraliaUrl.
       3. los dos vacíos          →  abre WhatsApp.

     calLink es SOLO el usuario, lo que va detrás de cal.com/.
     Para https://cal.com/angelpm  →  calLink: "angelpm"
     No pongas la dirección entera ni barras.
     ------------------------------------------------------------------ */
  booking: {
    calLink: "angelpm",        // [5.1] usuario de Cal.com  ← ACTIVO
    doctoraliaUrl: ""          // [5.2] alternativa si calLink está vacío
  },

  /* ------------------------------------------------------------------
     2 · DATOS LEGALES
     Se usan en el pie y en los tres textos legales (Aviso Legal,
     Privacidad y Cookies), que se generan solos.
     ------------------------------------------------------------------ */
  legal: {
    legalName: "Laura Sanz Bielsa",          // [2.1] titular o razón social
    tradeName: "Kinetia Fisioterapia",       // [2.2] nombre comercial
    nif: "73925184M",                        // [2.3] NIF o CIF
    collegiateNumber: "2415 — Colegio Profesional de Fisioterapeutas de Aragón",  // [2.4] "" para ocultarlo
    healthAuthorization: "CS-50-1287"        // [2.5] "" para ocultarlo
  },

  /* ------------------------------------------------------------------
     7 · PORTADA (lo primero que se ve)
     ------------------------------------------------------------------ */
  hero: {
    locationBadge: "Actur, Zaragoza",                     // [7.1] etiqueta pequeña de arriba
    titleLine1: "Fisioterapia y readaptación ",           // [7.2] titular, parte en negro
    titleHighlight: "en el Actur",                        // [7.3] titular, parte en color
    description: "Tratamos lesiones deportivas, dolor de espalda y suelo pélvico con valoración ecográfica y un plan de ejercicio propio. Sesiones de 45 minutos, un fisioterapeuta por paciente y sala de ejercicio para llegar hasta el alta.",  // [7.4]
    googleRating: "4,9/5",                                // [7.5] valoración
    collegiatedText: "Centro sanitario autorizado",       // [7.6] sello de confianza
    imageCaption: "Foto de la clínica Kinetia en el Actur",  // texto del hueco de la foto
    statNumber: "+1.500",                                 // [7.7] número grande
    statLabel: "pacientes tratados"                       // [7.8] qué es ese número
  },

  /* ------------------------------------------------------------------
     8 · SERVICIOS
     Esta lista alimenta DOS secciones: "Servicios" y "Tarifas".
     price y priceUnit solo se ven en "Tarifas".
     Lo ideal son 4 servicios. Con 3 o con 6 también funciona.
     icon: nombre de un icono de https://lucide.dev/icons
     ------------------------------------------------------------------ */
  servicesSection: {
    eyebrow: "Nuestros servicios",                                     // [8.1]
    heading: "Tratamientos pensados para cada lesión",                 // [8.2]
    description: "Valoramos, explicamos lo que pasa y tratamos. Cada sesión termina con ejercicios concretos para casa."  // [8.3]
  },
  services: [
    {                                                        // [8.1a-d] servicio 1
      icon: "activity",
      title: "Fisioterapia",
      description: "Terapia manual, punción seca y ejercicio para dolor de espalda, lesiones deportivas y rehabilitación posquirúrgica.",
      price: "45€",
      priceUnit: "/ sesión 45 min"
    },
    {                                                        // [8.2a-d] servicio 2
      icon: "package",
      title: "Bono 5 sesiones",
      description: "Transferible a un familiar y con dos años de caducidad.",
      price: "205€",
      priceUnit: "/ 5 sesiones"
    },
    {                                                        // [8.3a-d] servicio 3
      icon: "circle-dot",
      title: "Pilates terapéutico",
      description: "Grupos de máximo 6 personas, con máquinas y un fisioterapeuta corrigiendo.",
      price: "89€",
      priceUnit: "/ mes · 2 ses/semana"
    },
    {                                                        // [8.4a-d] servicio 4
      icon: "heart-pulse",
      title: "Suelo pélvico",
      description: "Embarazo, posparto e incontinencia, con valoración ecográfica en la primera sesión.",
      price: "55€",
      priceUnit: "/ sesión 50 min"
    },
    {                                                        // [8.5a-d] servicio 5
      icon: "baby",
      title: "Hipopresivos",
      description: "Trabajo de faja abdominal y postura en grupo reducido. Puedes venir con tu bebé.",
      price: "79€",
      priceUnit: "/ mes · 2 ses/semana"
    },
    {                                                        // [8.6a-d] servicio 6
      icon: "dumbbell",
      title: "Readaptación deportiva",
      description: "Vuelta a la competición con test de fuerza y progresión controlada hasta el alta.",
      price: "60€",
      priceUnit: "/ sesión 60 min"
    }
  ],

  /* ------------------------------------------------------------------
     9 · SECCIÓN DE TARIFAS
     ------------------------------------------------------------------ */
  pricingSection: {
    eyebrow: "Tarifas",                                                // [9.1]
    heading: "Precios claros, sin sorpresas",                          // [9.2]
    description: "Sin cuota de inscripción ni permanencia. La valoración inicial va incluida."  // [9.3]
  },
  // [9.4] a [9.7] Letra pequeña bajo los precios. Añade o quita líneas. [] = ninguna.
  pricingNotes: [
    "Punción seca: +5 € sobre la sesión",
    "Radiofrecuencia INDIBA: +8 € sobre la sesión",
    "Fisioterapia uroginecológica: +10 € sobre la sesión",
    "Avisa con 24 horas de antelación para cancelar sin coste"
  ],

  /* ------------------------------------------------------------------
     10 · POR QUÉ ELEGIRNOS
     Cuatro motivos. Cada uno es un icono, un título y una frase.
     ------------------------------------------------------------------ */
  aboutSection: {
    eyebrow: "Por qué elegirnos",                                      // [10.1]
    heading: "Ecografía, ejercicio y tiempo para cada paciente",       // [10.2]
    description: "Doce años tratando lesiones en Zaragoza con la misma forma de trabajar desde el primer día.",  // [10.3]
    imageCaption: "Foto de la sala de tratamiento o del equipamiento"
  },
  whyUs: [
    {                                                        // [10.4a-b] motivo 1
      icon: "scan-line",
      title: "Ecografía musculoesquelética",
      description: "Vemos la lesión en tiempo real y ajustamos el tratamiento, no vamos a ciegas."
    },
    {                                                        // [10.5a-b] motivo 2
      icon: "users",
      title: "Grupos de máximo 6 personas",
      description: "En Pilates e hipopresivos siempre hay un fisioterapeuta corrigiendo."
    },
    {                                                        // [10.6a-b] motivo 3
      icon: "clock",
      title: "Sesiones de 45 minutos, un solo paciente",
      description: "No atendemos a dos personas a la vez ni compartimos box."
    },
    {                                                        // [10.7a-b] motivo 4
      icon: "dumbbell",
      title: "Sala de ejercicio propia",
      description: "Poleas, plataforma de fuerza y material para readaptar la lesión hasta el alta."
    }
  ],

  /* ------------------------------------------------------------------
     11 · EL EQUIPO — banner de la portada
     ------------------------------------------------------------------ */
  teamCta: {
    eyebrow: "El equipo",                                              // [11.1]
    heading: "Detrás de cada tratamiento hay una persona",             // [11.2]
    description: "Nueve fisioterapeutas con especialidades distintas y una misma forma de trabajar.",  // [11.3]
    buttonText: "Conoce al equipo"                                     // [11.4]
  },

  /* ------------------------------------------------------------------
     11 · EL EQUIPO — cabecera de la página profesionales.html
     ------------------------------------------------------------------ */
  teamSection: {
    eyebrow: "Nuestros profesionales",                                 // [11.5]
    heading: "Un equipo, muchas especialidades",                       // [11.6]
    description: "Cada paciente se asigna al fisioterapeuta que mejor encaja con su lesión, no al que tiene hueco."  // [11.7]
  },

  /* ------------------------------------------------------------------
     11 · LOS PROFESIONALES  ← [11.1a] en adelante, uno por persona
     ------------------------------------------------------------------
     LA WEB SE ADAPTA AL NÚMERO DE PROFESIONALES QUE HAYA.
     Se colocan de tres en tres en el ordenador, de dos en dos en tablet
     y de uno en uno en el móvil. Con 9 salen tres filas de tres.

     PARA QUITAR UNO: borra su bloque entero, desde la llave { que lo abre
     hasta la llave } y la coma que lo cierran.

     PARA AÑADIR UNO: copia un bloque entero, pégalo antes del corchete ]
     final y cambia sus datos. Acuérdate de la coma entre bloques.

     Números que se recomiendan: 3, 6 o 9 (filas completas).
     Con 4, 5, 7 u 8 también funciona: la última fila queda incompleta.

     CAMPOS
       name         Nombre y apellidos              [11.Xa]
       role         Especialidad o cargo            [11.Xb]  (sale en color de marca)
       description  Dos o tres líneas               [11.Xc]
       tags         Etiquetas cortas. [] para ninguna  [11.Xd]
       initials     Iniciales, se ven mientras no haya foto  [11.Xe]
       photo        images/equipo-1.jpg, equipo-2.jpg... EN ORDEN  [11.Xf]
     ------------------------------------------------------------------ */
  team: [
    {
      name: "Laura Sanz Bielsa",
      role: "Fisioterapeuta de suelo pélvico · Directora",
      description: "Fundó Kinetia en 2014. Trata embarazo, posparto e incontinencia con valoración ecográfica y ejercicio pautado. Formada en fisioterapia uroginecológica por la URJC.",
      photo: "images/equipo-1.jpg",
      initials: "LS",
      tags: ["Suelo pélvico", "Posparto", "Hipopresivos"]
    },
    {
      name: "Diego Marín Otal",
      role: "Fisioterapeuta deportivo",
      description: "Trabaja con corredores y jugadores de fútbol sala de la ciudad. Valora cada lesión con ecografía y diseña la vuelta a la competición paso a paso.",
      photo: "images/equipo-2.jpg",
      initials: "DM",
      tags: ["Deportiva", "Ecografía", "Readaptación"]
    },
    {
      name: "Nerea Puyuelo Gil",
      role: "Fisioterapeuta de terapia manual",
      description: "Especializada en dolor cervical y lumbar de larga duración. Combina terapia manual, punción seca y ejercicio para que el alivio dure más allá de la sesión.",
      photo: "images/equipo-3.jpg",
      initials: "NP",
      tags: ["Columna", "Terapia manual", "Punción seca"]
    },
    {
      name: "Álvaro Céspedes Lahoz",
      role: "Fisioterapeuta y readaptador",
      description: "Lleva la sala de ejercicio. Mide fuerza antes y después para saber cuándo un paciente está listo de verdad para volver a su deporte.",
      photo: "images/equipo-4.jpg",
      initials: "AC",
      tags: ["Fuerza", "Rodilla", "Readaptación"]
    },
    {
      name: "Marta Lizana Ruiz",
      role: "Fisioterapeuta pediátrica",
      description: "Atiende a bebés y niños: cólicos, plagiocefalia y retrasos motores. Trabaja con las familias para que puedan seguir en casa lo que se hace en consulta.",
      photo: "images/equipo-5.jpg",
      initials: "ML",
      tags: ["Pediátrica", "Cólicos", "Plagiocefalia"]
    },
    {
      name: "Javier Bello Andrés",
      role: "Fisioterapeuta respiratorio",
      description: "Trata patología respiratoria crónica y pacientes mayores. Hace también domicilios en el barrio para quien no puede desplazarse.",
      photo: "images/equipo-6.jpg",
      initials: "JB",
      tags: ["Respiratoria", "Mayores", "Domicilio"]
    },
    {
      name: "Claudia Ferrer Solano",
      role: "Fisioterapeuta y entrenadora de Pilates",
      description: "Dirige las clases de Pilates terapéutico e hipopresivos. Adapta cada ejercicio a la lesión de quien lo hace, incluso dentro del grupo.",
      photo: "images/equipo-7.jpg",
      initials: "CF",
      tags: ["Pilates", "Postura", "Core"]
    },
    {
      name: "Rubén Aísa Monzón",
      role: "Fisioterapeuta neurológico",
      description: "Trabaja con pacientes tras un ictus y con enfermedades neurodegenerativas. Su objetivo siempre es la autonomía en el día a día.",
      photo: "images/equipo-8.jpg",
      initials: "RA",
      tags: ["Neurológica", "Ictus", "Equilibrio"]
    },
    {
      name: "Elena Bruna Casas",
      role: "Fisioterapeuta de ATM y cefaleas",
      description: "Trata bruxismo, dolor de mandíbula y dolores de cabeza de origen cervical, en coordinación con odontólogos de la zona.",
      photo: "images/equipo-9.jpg",
      initials: "EB",
      tags: ["ATM", "Cefaleas", "Cervicales"]
    }
  ],

  /* ------------------------------------------------------------------
     12 · VÍDEOS — banner de la portada
     ------------------------------------------------------------------ */
  ctaVideosSection: {
    eyebrow: "Vídeos",                                                 // [12.1]
    heading: "Mira cómo trabajamos",                                   // [12.2]
    description: "Un minuto dentro de la clínica explica más que cualquier texto.",  // [12.3]
    buttonText: "Ver vídeos"                                           // [12.4]
  },

  /* ------------------------------------------------------------------
     12 · VÍDEOS — cabecera de la página videos.html
     ------------------------------------------------------------------ */
  videosSection: {
    eyebrow: "Vídeos",
    heading: "Mira cómo trabajamos",                                   // [12.5]
    description: "Tres vídeos cortos: una valoración con ecografía, una clase de Pilates y un trabajo de readaptación en sala."  // [12.6]
  },

  /* ------------------------------------------------------------------
     12 · LOS VÍDEOS  ← [12.7a] en adelante, uno por vídeo
     ------------------------------------------------------------------
     Cada vídeo son DOS archivos en la carpeta videos/: el clip .mp4 y
     su portada .jpg. La portada es obligatoria: sin ella el navegador
     enseña un rectángulo negro.

     Se colocan en zigzag automáticamente: el 1º y el 3º con el vídeo a
     la izquierda, el 2º al revés.

     Puedes poner los que quieras: uno, dos, tres o cinco. Para quitar
     uno, borra su bloque entero { ... },
     ------------------------------------------------------------------ */
  videos: [
    {                                                        // [12.7a-b] vídeo 1
      title: "Valoración con ecografía",
      description: "Cómo localizamos la lesión en la primera sesión y por qué eso cambia el tratamiento. Dos minutos.",
      poster: "videos/video-1-poster.jpg",
      video: "videos/video-1.mp4"
    },
    {                                                        // [12.8a-b] vídeo 2
      title: "Una clase de Pilates terapéutico",
      description: "Grupo de seis personas, máquinas y correcciones una a una. Así es una clase cualquiera de martes por la tarde.",
      poster: "videos/video-2-poster.jpg",
      video: "videos/video-2.mp4"
    },
    {                                                        // [12.9a-b] vídeo 3
      title: "Readaptación de una rotura de isquiotibiales",
      description: "El proceso completo en sala, desde las primeras cargas hasta la vuelta al campo.",
      poster: "videos/video-3-poster.jpg",
      video: "videos/video-3.mp4"
    }
  ],

  /* ------------------------------------------------------------------
     13 · OPINIONES
     Tres reseñas. Cópialas literalmente de Google o de la plataforma
     de citas: las inventadas se notan y no aportan nada.
     ------------------------------------------------------------------ */
  testimonialsSection: {
    eyebrow: "Opiniones",                                              // [13.1]
    heading: "Más de 300 opiniones de pacientes",                      // [13.2]
    description: "Valoración media de 4,9 sobre 5 en Google."          // [13.3]
  },
  testimonials: [
    {                                                        // [13.4a-b] opinión 1
      rating: 5,
      text: "Llevaba meses con dolor lumbar y en tres sesiones noté el cambio. Me explicaron qué tenía y me dieron ejercicios concretos para casa.",
      initial: "M",
      name: "María G.",
      role: "Paciente"
    },
    {                                                        // [13.5a-b] opinión 2
      rating: 5,
      text: "Fui después del parto sin saber muy bien qué esperar. Me hicieron una valoración completa y salí con un plan claro. Trato excelente.",
      initial: "C",
      name: "Cristina P.",
      role: "Paciente"
    },
    {                                                        // [13.6a-b] opinión 3
      rating: 5,
      text: "Me rompí el isquio jugando y volví a competir en dos meses. La sala de ejercicio y el seguimiento marcan la diferencia.",
      initial: "H",
      name: "Hugo M.",
      role: "Paciente"
    }
  ],

  /* ------------------------------------------------------------------
     14 · CIERRE — sección de contacto y pie de página
     ------------------------------------------------------------------ */
  contactSection: {
    eyebrow: "Contacto",                                               // [14.1]
    heading: "Te esperamos en el Actur",                               // [14.2]
    description: "Pide cita por teléfono, por WhatsApp o reserva online en menos de un minuto."  // [14.3]
  },

  footer: {
    description: "Clínica de fisioterapia y Pilates en el Actur (Zaragoza)."  // [14.4]
  }
};
