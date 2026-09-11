/**
 * DATOS DEL CLIENTE — Prolive Valdebebas Norte
 * ---------------------------------------------------------------------
 * Este archivo contiene TODA la información específica de la clínica:
 * nombre, contacto, dirección, colores de marca, textos de cada sección,
 * servicios, equipo, vídeos y opiniones.
 *
 * Las tres páginas (index.html, videos.html, profesionales.html) cargan
 * este mismo archivo. NO hace falta tocar el HTML para cambiar contenido.
 *
 * Para reutilizar la plantilla con otro cliente: duplica este archivo y
 * sustituye los valores.
 */
window.SITE_CONFIG = {

  // ---------- SEO / metadatos ----------
  meta: {
    title: "Prolive Valdebebas Norte | Fisioterapia, Pilates e Hipopresivos en Madrid",
    description: "Clínica de fisioterapia avanzada en Valdebebas (Madrid): fisioterapia, osteopatía, suelo pélvico, pediátrica, pilates y pilates hipopresivo. Reserva tu cita online.",
    lang: "es"
  },

  // ---------- Identidad de marca ----------
  brand: {
    // El nombre se divide en dos partes para pintar la segunda de otro color.
    namePart1: "Pro",
    namePart2: "live",
    // Se muestra debajo del nombre, en pequeño. Deja "" para ocultarlo.
    tagline: "Valdebebas Norte",
    // Icono de Lucide (https://lucide.dev/icons) que se usa como logo
    // SOLO mientras no exista el archivo indicado en images.logo.
    icon: "activity"
  },

  // ---------- Imágenes ----------
  // Crea una carpeta "images/" al lado de los .html con estos archivos.
  // Mientras un archivo no exista, NO se rompe nada: se muestra el icono
  // (para el logo) o un placeholder gris elegante (para las fotos).
  images: {
    logo: "images/logo.png",       // logo de la clínica (header y footer)
    hero: "images/hero.jpg",       // foto grande de la cabecera
    about: "images/about.jpg",     // foto de "Por qué elegirnos"
    team: "images/equipo.jpg"      // foto de grupo, cabecera de profesionales.html
  },

  // ---------- Colores de marca ----------
  colors: {
    primary: "#0d9488",
    primaryDark: "#0f766e",
    secondary: "#1e293b"
  },

  // ---------- Datos de contacto ----------
  contact: {
    phoneDisplay: "+34 676 853 608",
    phoneHref: "+34676853608",
    whatsappNumber: "34676853608",
    whatsappMessage: "Hola, me gustaría pedir cita en Prolive Valdebebas",
    email: "fisioterapia@clinicaprolive.es",
    address: "C/ Luis Moya Blanco, 44, 28055 Madrid",
    // Texto con el que se busca la ubicación en el mapa embebido
    mapEmbedQuery: "Calle de Luis Moya Blanco 44, 28055 Madrid",
    hoursLines: [
      "Lunes a viernes: 08:00–21:00",
      "Sábados: consultar disponibilidad",
      "Domingos: cerrado"
    ],
    // Enlaces COMPLETOS. Deja "" para ocultar el icono correspondiente.
    instagramUrl: "https://www.instagram.com/prolive.es",
    facebookUrl: "https://www.facebook.com/p/Prolive-Cl%C3%ADnica-de-Fisioterapia-Avanzada-100063486673763/"
  },

  // ---------- Reservas online ----------
  // calLink: usuario de Cal.com, SIN evento concreto, para que el paciente
  //          vea primero la lista de servicios y luego el calendario.
  //          Ej: "prolive"  →  https://cal.com/prolive
  //
  // Mientras calLink esté vacío (""), el botón "Reservar" usa el enlace de
  // doctoraliaUrl. Si tampoco hay doctoraliaUrl, cae a WhatsApp.
  // Así puedes migrar a Cal.com cuando quieras sin tocar el HTML.
  booking: {
    calLink: "",
    doctoraliaUrl: "https://www.doctoralia.es/clinicas/prolive-valdebebas"
  },

  // ---------- Datos legales ----------
  legal: {
    legalName: "Alejandro García Rivilla",
    tradeName: "Prolive",
    nif: "50904419Z",
    // Se muestran en el Aviso Legal. Deja "" si no quieres mostrarlos.
    collegiateNumber: "12648 — Colegio Profesional de Fisioterapeutas de la Comunidad de Madrid",
    healthAuthorization: "CS15737"
  },

  // ---------- Cabecera principal (Hero) ----------
  hero: {
    locationBadge: "Valdebebas, Madrid",
    titleLine1: "Fisioterapia avanzada ",
    titleHighlight: "en Valdebebas",
    description: "Un enfoque innovador y personalizado para mejorar la calidad de vida de nuestros pacientes. Fisioterapia, suelo pélvico, pediátrica, pilates e hipopresivos en grupos reducidos.",
    googleRating: "5/5",
    collegiatedText: "Centro sanitario autorizado",
    imageCaption: "Foto de la clínica Prolive Valdebebas Norte",
    statNumber: "+2.000",
    statLabel: "opiniones de pacientes"
  },

  // ---------- Sección "Servicios" ----------
  servicesSection: {
    eyebrow: "Nuestros servicios",
    heading: "Tratamientos adaptados a cada paciente",
    description: "Situados en Valdebebas, ofrecemos un enfoque innovador y personalizado. Nuestra meta es mejorar la calidad de vida de nuestros pacientes."
  },
  // Este mismo array alimenta las secciones "Servicios" y "Planes".
  // price / priceUnit solo se usan en "Planes".
  services: [
    {
      icon: "activity",
      title: "Fisioterapia",
      description: "Tratamiento para dolores musculares, rehabilitación, suelo pélvico y fisioterapia pediátrica.",
      price: "49€",
      priceUnit: "/ sesión 45 min"
    },
    {
      icon: "package",
      title: "Bono 5 sesiones",
      description: "Transferible a un familiar y con caducidad de 2 años. La opción más elegida para tratamientos completos.",
      price: "225€",
      priceUnit: "/ 5 sesiones"
    },
    {
      icon: "circle-dot",
      title: "Pilates",
      description: "Ya sea para mejorar tu salud y forma física, o para preparar tu parto. Grupos reducidos de máximo 5 personas.",
      price: "92€",
      priceUnit: "/ mes · 2 ses/semana"
    },
    {
      icon: "baby",
      title: "Pilates Hipopresivo",
      description: "¿Quieres reducir tu cintura o evitar la diástasis abdominal? ¡Puedes asistir con tu bebé!",
      price: "92€",
      priceUnit: "/ mes · 2 ses/semana"
    }
  ],

  // ---------- Sección "Planes" ----------
  pricingSection: {
    eyebrow: "Tarifas",
    heading: "Precios claros, sin sorpresas",
    description: "Sin cuotas de inscripción ni permanencia. El bono es transferible a un familiar y tiene dos años de validez."
  },
  // Líneas extra que aparecen debajo de las tarjetas de precios.
  // Deja el array vacío [] si no quieres mostrar ninguna.
  pricingNotes: [
    "Masaje terapéutico: +5 € sobre la sesión",
    "Radiofrecuencia INDIBA®: +5 € sobre la sesión",
    "Fisioterapia uroginecológica: +10 € sobre la sesión",
    "Cancelaciones: avisa con al menos 1 hora de antelación desde la plataforma de citas"
  ],

  // ---------- Sección "Por qué elegirnos" ----------
  aboutSection: {
    eyebrow: "Por qué elegirnos",
    heading: "Tecnología, criterio clínico y trato cercano",
    description: "No aplicamos protocolos genéricos. Valoramos cada caso, explicamos el porqué de cada técnica y medimos la evolución sesión a sesión.",
    imageCaption: "Foto de la sala de tratamiento o del equipamiento"
  },
  whyUs: [
    {
      icon: "scan-line",
      title: "Ecografía musculoesquelética",
      description: "Valoramos la lesión en tiempo real para ajustar el tratamiento con criterio, no a ciegas."
    },
    {
      icon: "dumbbell",
      title: "Redcord Neurac y polea isoinercial",
      description: "Equipamiento de readaptación de alto nivel para recuperar fuerza y control motor de verdad."
    },
    {
      icon: "users",
      title: "Grupos reducidos en Pilates",
      description: "Máximo 5 personas por clase, para que la corrección sea individual y las sesiones sean seguras."
    },
    {
      icon: "shield-check",
      title: "Centro sanitario autorizado",
      description: "Fisioterapeutas colegiados y autorización sanitaria de la Comunidad de Madrid."
    }
  ],

  // ---------- Bloque "equipo" en la home (enlaza a profesionales.html) ----------
  teamCta: {
    eyebrow: "El equipo",
    heading: "Detrás de cada tratamiento hay una persona",
    description: "Fisioterapeutas colegiados, cada uno con su especialidad: suelo pélvico, pediátrica, deportiva, dermatofuncional y pilates.",
    buttonText: "Conoce al equipo"
  },

  // ---------- Página "profesionales.html" ----------
  teamSection: {
    eyebrow: "Nuestros profesionales",
    heading: "Un equipo, muchas especialidades",
    description: "Todos nuestros fisioterapeutas están colegiados y en formación continua. Te atenderá siempre el profesional que mejor encaja con tu caso."
  },

  // ---------- EL EQUIPO: 6 profesionales, 2 filas de 3 ----------
  //
  //  ⚠️  DATOS DE EJEMPLO. Sustituye nombre, rol, descripción y foto de cada
  //      uno. Para la foto: sube el archivo a "images/" con ese nombre exacto
  //      (o cambia la ruta aquí). Mientras no exista, se ve un placeholder
  //      con las iniciales y la web no se rompe.
  //
  //  · name        Nombre y apellidos
  //  · role        Cargo o especialidad principal (se pinta en color de marca)
  //  · description Párrafo breve, 2-3 líneas
  //  · photo       Ruta a la foto, ej. "images/equipo-1.jpg"
  //  · initials    Iniciales que se ven mientras no haya foto
  //  · tags        Etiquetas cortas (opcional). Deja [] para no mostrarlas.
  //
  //  Puedes poner menos de 6 (se recolocan solos) o más de 6 (siguen en
  //  filas de 3). No hay que tocar el HTML.
  //
  team: [
    {
      name: "Alejandro García",
      role: "Director · Fisioterapeuta colegiado nº 12648",
      description: "Fundador de Prolive. Especializado en terapia manual y readaptación deportiva, con ecografía musculoesquelética como herramienta de valoración en cada sesión.",
      photo: "images/equipo-1.jpg",
      initials: "AG",
      tags: ["Terapia manual", "Ecografía", "Deportiva"]
    },
    {
      name: "Nombre Apellido",
      role: "Fisioterapeuta de suelo pélvico",
      description: "Valoración y tratamiento uroginecológico, preparación al parto y recuperación posparto. Acompaña el proceso completo con un plan progresivo y sin prisas.",
      photo: "images/equipo-2.jpg",
      initials: "NA",
      tags: ["Suelo pélvico", "Posparto", "Hipopresivos"]
    },
    {
      name: "Nombre Apellido",
      role: "Fisioterapeuta pediátrica",
      description: "Cólicos del lactante, tortícolis congénita, plagiocefalia y desarrollo motor. Técnicas suaves y pautas claras para que la familia continúe el trabajo en casa.",
      photo: "images/equipo-3.jpg",
      initials: "NA",
      tags: ["Pediátrica", "Lactantes", "Desarrollo motor"]
    },
    {
      name: "Nombre Apellido",
      role: "Fisioterapeuta deportivo",
      description: "Tendinopatías, sobrecarga y vuelta a la competición. Trabaja con Redcord Neurac y polea isoinercial para devolver fuerza y control antes del alta.",
      photo: "images/equipo-4.jpg",
      initials: "NA",
      tags: ["Readaptación", "Tendinopatías", "Punción seca"]
    },
    {
      name: "Nombre Apellido",
      role: "Fisioterapeuta dermatofuncional",
      description: "Drenaje linfático, cicatrices, fibrosis y recuperación postquirúrgica con radiofrecuencia INDIBA®. Resultados medidos sesión a sesión.",
      photo: "images/equipo-5.jpg",
      initials: "NA",
      tags: ["Drenaje linfático", "INDIBA®", "Postoperatorio"]
    },
    {
      name: "Nombre Apellido",
      role: "Instructora de Pilates e hipopresivos",
      description: "Clases en grupos de máximo 5 personas, con corrección individual. Pilates para embarazadas e hipopresivos compatibles con acudir con el bebé.",
      photo: "images/equipo-6.jpg",
      initials: "NA",
      tags: ["Pilates", "Embarazadas", "Hipopresivos"]
    }
  ],

  // ---------- Banner "Mira cómo trabajamos" (home → videos.html) ----------
  ctaVideosSection: {
    eyebrow: "Vídeos",
    heading: "Mira cómo trabajamos",
    description: "Sesiones reales, ejercicios y consejos para que sepas exactamente qué vas a encontrarte antes de venir.",
    buttonText: "Ver vídeos"
  },

  // ---------- Página "videos.html" ----------
  videosSection: {
    eyebrow: "Vídeos",
    heading: "Mira cómo trabajamos",
    description: "Una selección de clips cortos para que veas de primera mano cómo son nuestras sesiones."
  },
  //
  //  ⚠️  Crea una carpeta "videos/" al lado de los .html con los archivos.
  //      Cada vídeo necesita su portada (poster): sin ella el navegador
  //      muestra un recuadro negro hasta que se pulsa play.
  //      Comprime a H.264/MP4 720p — Cloudflare Pages limita a 25 MB/archivo.
  //      Se muestran en zigzag: 1º y 3º con el vídeo a la izquierda.
  //      Puedes poner los que quieras, no tienen que ser 3.
  //
  videos: [
    {
      title: "Valoración con ecografía",
      description: "Cómo usamos la ecografía musculoesquelética para ver la lesión en tiempo real y decidir el tratamiento con criterio.",
      poster: "videos/video-1-poster.jpg",
      video: "videos/video-1.mp4"
    },
    {
      title: "Readaptación con Redcord Neurac",
      description: "Ejercicios de control motor y fuerza en suspensión, la fase que marca la diferencia entre dejar de tener dolor y no volver a lesionarte.",
      poster: "videos/video-2-poster.jpg",
      video: "videos/video-2.mp4"
    },
    {
      title: "Una clase de Pilates hipopresivo",
      description: "Cómo es una sesión en grupo reducido, la corrección individual y por qué puedes venir con tu bebé.",
      poster: "videos/video-3-poster.jpg",
      video: "videos/video-3.mp4"
    }
  ],

  // ---------- Sección "Opiniones" ----------
  testimonialsSection: {
    eyebrow: "Opiniones",
    heading: "Más de 2.000 opiniones de pacientes",
    description: "Valoración media de 5 sobre 5 en nuestra ficha de reservas online."
  },
  testimonials: [
    {
      rating: 5,
      text: "Sustituye este texto por una opinión real de tus pacientes. Puedes copiarlas literalmente de tu ficha de Doctoralia o de Google.",
      initial: "M",
      name: "Nombre del paciente",
      role: "Paciente"
    },
    {
      rating: 5,
      text: "Sustituye este texto por una opinión real de tus pacientes. Puedes copiarlas literalmente de tu ficha de Doctoralia o de Google.",
      initial: "L",
      name: "Nombre del paciente",
      role: "Paciente"
    },
    {
      rating: 5,
      text: "Sustituye este texto por una opinión real de tus pacientes. Puedes copiarlas literalmente de tu ficha de Doctoralia o de Google.",
      initial: "J",
      name: "Nombre del paciente",
      role: "Paciente"
    }
  ],

  // ---------- Sección "Contacto" ----------
  contactSection: {
    eyebrow: "Contacto",
    heading: "Te esperamos en Valdebebas",
    description: "Pide tu cita online, por teléfono o por WhatsApp. Si no sabes qué tratamiento necesitas, escríbenos y te orientamos sin compromiso."
  },

  // ---------- Footer ----------
  footer: {
    description: "Clínica de fisioterapia avanzada en Valdebebas (Madrid). Fisioterapia, osteopatía, suelo pélvico, pediátrica, pilates e hipopresivos."
  }
};
