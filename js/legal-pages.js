(function () {
  "use strict";

  const translations = {
    privacy: {
      en: {
        eyebrow: "Privacy and transparency",
        title: "Privacy Policy",
        intro: "This policy explains the limited information involved when you use ValoTools.",
        overviewTitle: "Our current approach",
        overviewText: "ValoTools is designed to work without collecting personal information directly from you.",
        noAccounts: "No user accounts",
        noForms: "No contact forms or newsletter",
        noPayments: "No payments",
        noAnalytics: "No analytics or advertising",
        noAffiliates: "No affiliate links",
        storageTitle: "Language preference",
        storageText: "ValoTools stores only your language preference in your browser's localStorage using the key valotools-language. You can remove it at any time by deleting this site's data in your browser settings.",
        servicesTitle: "Hosting and fonts",
        hostingText: "ValoTools is hosted by GitHub Pages. GitHub may log technical information, including IP addresses, for security and service integrity purposes.",
        fontsText: "Fonts are currently loaded from Google Fonts. When your browser requests those files, Google may receive technical connection data such as your IP address.",
        sharingTitle: "Sale and commercial sharing",
        sharingText: "ValoTools does not sell personal data or share it with third parties for commercial purposes.",
        contactTitle: "Questions about privacy",
        contactText: "For a privacy question or concern, contact us by email:",
        updated: "Last updated: July 22, 2026",
        seoTitle: "Privacy Policy | ValoTools",
        seoDescription: "Learn how ValoTools handles language preferences, hosting logs, Google Fonts and personal data."
      },
      es: {
        eyebrow: "Privacidad y transparencia",
        title: "Política de privacidad",
        intro: "Esta política explica la información limitada que interviene cuando usas ValoTools.",
        overviewTitle: "Nuestro enfoque actual",
        overviewText: "ValoTools está diseñado para funcionar sin recopilar directamente tus datos personales.",
        noAccounts: "No hay cuentas de usuario",
        noForms: "No hay formularios de contacto ni newsletter",
        noPayments: "No hay pagos",
        noAnalytics: "No hay Analytics, publicidad ni anuncios",
        noAffiliates: "No hay enlaces de afiliados",
        storageTitle: "Preferencia de idioma",
        storageText: "ValoTools guarda únicamente tu preferencia de idioma en el localStorage del navegador mediante la clave valotools-language. Puedes eliminarla en cualquier momento borrando los datos de este sitio desde la configuración del navegador.",
        servicesTitle: "Hosting y fuentes",
        hostingText: "ValoTools está alojado en GitHub Pages. GitHub puede registrar información técnica, incluidas direcciones IP, por motivos de seguridad e integridad del servicio.",
        fontsText: "Actualmente las fuentes se cargan desde Google Fonts. Cuando el navegador solicita esos archivos, Google puede recibir datos técnicos de conexión, como tu dirección IP.",
        sharingTitle: "Venta y uso comercial",
        sharingText: "ValoTools no vende datos personales ni los comparte con terceros con fines comerciales.",
        contactTitle: "Preguntas sobre privacidad",
        contactText: "Para cualquier pregunta o inquietud sobre privacidad, escríbenos a:",
        updated: "Última actualización: 22 de julio de 2026",
        seoTitle: "Política de privacidad | ValoTools",
        seoDescription: "Conoce cómo ValoTools gestiona la preferencia de idioma, los registros del hosting, Google Fonts y los datos personales."
      }
    },
    terms: {
      en: {
        eyebrow: "Community project rules",
        title: "Terms of Use",
        intro: "These terms describe the basis on which the ValoTools website and tools are provided.",
        projectTitle: "About ValoTools",
        projectText: "ValoTools is an independent, free web project created for the community.",
        asIsTitle: "Provided as is",
        asIsText: "The website, tools and information are provided “as is” and “as available,” without guarantees of uninterrupted availability or fitness for a particular purpose.",
        accuracyTitle: "Accuracy and verification",
        accuracyText: "We do not guarantee that calculations, conversions, settings, crosshair codes or player data will always be complete, accurate or current.",
        verifyText: "You must verify any crosshair code or setting inside VALORANT before using it competitively.",
        fairUseTitle: "Fair use of the tools",
        fairUseText: "ValoTools does not modify game files and does not provide prohibited advantages. You are responsible for using the tools in accordance with the game rules and applicable law.",
        demoTitle: "Pro Settings demo data",
        demoText: "The records currently shown in Pro Settings are demo data. They are fictional and must not be treated or presented as verified professional settings.",
        liabilityTitle: "Limitation of liability",
        liabilityText: "To the extent permitted by law, ValoTools and its contributors are not liable for losses or damages arising from reliance on the website, inability to access it, or use of its calculations, codes, settings or data. Nothing in these terms excludes liability that cannot legally be excluded.",
        seoTitle: "Terms of Use | ValoTools",
        seoDescription: "Read the terms for using ValoTools, including accuracy, verification, demo data and liability information."
      },
      es: {
        eyebrow: "Reglas del proyecto comunitario",
        title: "Términos de uso",
        intro: "Estos términos describen las condiciones en las que se ofrecen el sitio y las herramientas de ValoTools.",
        projectTitle: "Sobre ValoTools",
        projectText: "ValoTools es un proyecto web independiente, gratuito y creado para la comunidad.",
        asIsTitle: "Servicio tal cual",
        asIsText: "El sitio, las herramientas y la información se ofrecen “tal cual” y “según disponibilidad”, sin garantizar disponibilidad ininterrumpida ni idoneidad para un fin concreto.",
        accuracyTitle: "Exactitud y verificación",
        accuracyText: "No garantizamos que los cálculos, conversiones, configuraciones, códigos de mira o datos de jugadores sean siempre completos, exactos o actuales.",
        verifyText: "Debes verificar cualquier código de mira o configuración dentro de VALORANT antes de usarlo competitivamente.",
        fairUseTitle: "Uso adecuado de las herramientas",
        fairUseText: "ValoTools no modifica archivos del juego ni proporciona ventajas prohibidas. Eres responsable de usar las herramientas conforme a las reglas del juego y a la legislación aplicable.",
        demoTitle: "Datos demo de Pro Settings",
        demoText: "Los registros que aparecen actualmente en Pro Settings son datos demo. Son ficticios y no deben tratarse ni presentarse como configuraciones profesionales verificadas.",
        liabilityTitle: "Limitación de responsabilidad",
        liabilityText: "En la medida permitida por la ley, ValoTools y sus colaboradores no son responsables de pérdidas o daños derivados de confiar en el sitio, no poder acceder a él o usar sus cálculos, códigos, configuraciones o datos. Nada de estos términos excluye responsabilidades que legalmente no puedan excluirse.",
        seoTitle: "Términos de uso | ValoTools",
        seoDescription: "Consulta los términos de ValoTools, incluidas la exactitud, verificación, datos demo y limitación de responsabilidad."
      }
    },
    legal: {
      en: {
        eyebrow: "Independent fan project",
        title: "Legal Notice",
        intro: "ValoTools is an independent fan project and is not an official Riot Games product.",
        riotTitle: "Riot Games notice",
        marksTitle: "Trademarks",
        marksText: "VALORANT and Riot Games are trademarks of Riot Games, Inc.",
        settingsTitle: "Settings and sources",
        settingsText: "Game settings and player configurations can change. Review the stated source and verification date before relying on any record.",
        affiliatesTitle: "Affiliate disclosure",
        affiliatesText: "ValoTools currently has no affiliate links. If affiliate links are added in the future, a clear disclosure will appear close to each relevant link.",
        policyTitle: "Official Riot policy",
        policyText: "Read Riot Games' official Legal Jibber Jabber policy:",
        policyLink: "Open Riot Games Legal Jibber Jabber",
        seoTitle: "Legal Notice | ValoTools",
        seoDescription: "Read the ValoTools independent fan-project notice, Riot Games attribution and affiliate disclosure."
      },
      es: {
        eyebrow: "Proyecto fan independiente",
        title: "Aviso legal",
        intro: "ValoTools es un proyecto fan independiente y no es un producto oficial de Riot Games.",
        riotTitle: "Aviso de Riot Games",
        marksTitle: "Marcas",
        marksText: "VALORANT y Riot Games son marcas de Riot Games, Inc.",
        settingsTitle: "Configuraciones y fuentes",
        settingsText: "Las configuraciones del juego y de jugadores pueden cambiar. Revisa la fuente indicada y la fecha de verificación antes de confiar en cualquier registro.",
        affiliatesTitle: "Divulgación de afiliación",
        affiliatesText: "Actualmente ValoTools no tiene enlaces de afiliados. Si se añaden en el futuro, se mostrará una divulgación clara cerca de cada enlace correspondiente.",
        policyTitle: "Política oficial de Riot",
        policyText: "Consulta la política oficial Legal Jibber Jabber de Riot Games:",
        policyLink: "Abrir Legal Jibber Jabber de Riot Games",
        seoTitle: "Aviso legal | ValoTools",
        seoDescription: "Consulta el aviso de proyecto fan independiente de ValoTools, la atribución a Riot Games y la divulgación de afiliación."
      }
    },
    contact: {
      en: {
        eyebrow: "Support and feedback",
        title: "Contact",
        intro: "ValoTools keeps contact simple: email is the only contact channel.",
        contactTitle: "How can we help?",
        contactText: "Use this address to report bugs, incorrect data, rights issues, privacy concerns or suggestions.",
        emailLabel: "Email ValoTools support",
        responseText: "Please include the affected page and enough detail for us to understand the issue. Do not send sensitive personal information.",
        seoTitle: "Contact | ValoTools",
        seoDescription: "Contact ValoTools by email to report bugs, incorrect data, rights or privacy issues, and suggestions."
      },
      es: {
        eyebrow: "Soporte y sugerencias",
        title: "Contacto",
        intro: "ValoTools mantiene el contacto sencillo: el correo electrónico es el único canal de contacto.",
        contactTitle: "¿Cómo podemos ayudarte?",
        contactText: "Usa esta dirección para reportar errores, datos incorrectos, problemas de derechos, privacidad o sugerencias.",
        emailLabel: "Enviar un correo al soporte de ValoTools",
        responseText: "Incluye la página afectada y suficiente información para que podamos entender el problema. No envíes datos personales sensibles.",
        seoTitle: "Contacto | ValoTools",
        seoDescription: "Contacta con ValoTools por correo para reportar errores, datos incorrectos, problemas de derechos o privacidad y sugerencias."
      }
    }
  };

  const page = document.body.dataset.legalPage;
  let currentLanguage = window.ValoToolsUI?.getLanguage() || "en";

  function updateMetadata(text) {
    document.title = text.seoTitle;
    const selectors = {
      'meta[name="description"]': text.seoDescription,
      'meta[property="og:title"]': text.seoTitle,
      'meta[property="og:description"]': text.seoDescription,
      'meta[name="twitter:title"]': text.seoTitle,
      'meta[name="twitter:description"]': text.seoDescription
    };

    Object.entries(selectors).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.content = value;
    });
  }

  function setLanguage(language) {
    currentLanguage = language === "es" ? "es" : "en";
    const text = translations[page]?.[currentLanguage];
    if (!text) return;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = text[element.dataset.i18n];
      if (value) element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const value = text[element.dataset.i18nAria];
      if (value) element.setAttribute("aria-label", value);
    });

    updateMetadata(text);
  }

  document.addEventListener("valotools:languagechange", (event) => setLanguage(event.detail.language));
  setLanguage(currentLanguage);
})();
