export type Language = "pt" | "en" | "es";

export const translations = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      badge: "Disponível para novas oportunidades",
      headline: "Transformando dados operacionais em",
      headline2: "soluções inteligentes",
      subheadline:
        "Desenvolvedor Full Stack com background em engenharia industrial e análise de dados. Construo sistemas que extraem valor real de informações complexas.",
      cta1: "Ver Projetos",
      cta2: "Falar Comigo",
      scrollDown: "Rolar para baixo",
      stats: {
        years: "Anos de Experiência",
        projects: "Projetos Entregues",
        data: "Análises Realizadas",
        uptime: "Disponibilidade",
      },
    },
    about: {
      title: "Sobre Mim",
      subtitle: "Da fábrica ao código — uma jornada de dados",
      story1:
        "Comecei minha carreira no chão de fábrica, analisando dados operacionais para otimizar processos industriais. Com SQL, Power BI e Excel avançado, transformei planilhas caóticas em dashboards que gerentes realmente usavam para tomar decisões.",
      story2:
        "Com o tempo, percebi que os maiores problemas não eram de processo — eram de ferramentas. Sistemas legados, dados fragmentados, relatórios manuais. Decidi aprender a construir as soluções que eu mesmo sempre precisei.",
      story3:
        "Hoje, como estudante de Engenharia de Software, combino visão analítica aguçada com desenvolvimento moderno. Entendo o problema antes de escrever a primeira linha de código.",
      skills: "Habilidades Técnicas",
      journey: "Minha Jornada",
      journeyItems: [
        {
          year: "2018",
          title: "Análise Operacional",
          desc: "Início na análise de dados industriais, otimização de processos e KPIs",
        },
        {
          year: "2020",
          title: "Business Intelligence",
          desc: "Power BI, SQL avançado e automação de relatórios corporativos",
        },
        {
          year: "2022",
          title: "Gestão de Riscos",
          desc: "Análise de riscos, gestão de projetos e tomada de decisão baseada em dados",
        },
        {
          year: "2024",
          title: "Engenharia de Software",
          desc: "Transição para desenvolvimento full-stack, React, Node.js e sistemas web",
        },
      ],
    },
    projects: {
      title: "Projetos",
      subtitle: "Soluções reais para problemas reais",
      viewCode: "Ver Código",
      liveDemo: "Demo ao Vivo",
      techStack: "Stack Tecnológica",
      close: "Fechar",
      items: [
        {
          id: "dashboard",
          title: "Dashboard Operacional",
          shortDesc:
            "Dashboard em tempo real para monitoramento de KPIs industriais com simulação de dados ao vivo",
          fullDesc:
            "Sistema completo de monitoramento operacional que simula dados industriais em tempo real. Inclui gráficos interativos, filtros avançados e alertas automáticos. Construído para substituir planilhas manuais em ambientes de manufatura.",
          tags: ["React", "Recharts", "Real-time Data", "KPI"],
          tech: ["React", "TypeScript", "Recharts", "Tailwind CSS", "Framer Motion"],
          features: [
            "Atualização de dados em tempo real (intervalo de 2s)",
            "Filtros por período, setor e tipo de métrica",
            "Alertas automáticos para valores fora do limite",
            "Export de relatórios em CSV",
            "Responsivo para tablets industriais",
          ],
          github: "#",
          demo: "#",
          color: "from-cyan-500 to-blue-600",
        },
        {
          id: "monitoring",
          title: "Sistema de Monitoramento",
          shortDesc:
            "Plataforma industrial-style para visualização de logs, alertas e status de sistemas críticos",
          fullDesc:
            "Interface estilo SCADA para monitoramento de sistemas críticos. Visualização de logs em tempo real, sistema de alertas com prioridades e painel de status dos equipamentos. Design inspirado em sistemas de controle industrial.",
          tags: ["Next.js", "WebSocket", "Alerts", "Logs"],
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
          features: [
            "Feed de logs com filtro por severidade",
            "Sistema de alertas com 3 níveis de prioridade",
            "Status em tempo real de múltiplos equipamentos",
            "Histórico de incidentes com timeline",
            "Notificações push para alertas críticos",
          ],
          github: "#",
          demo: "#",
          color: "from-orange-500 to-red-600",
        },
        {
          id: "dataapi",
          title: "API de Dados + SQL Simulator",
          shortDesc:
            "Simulador de queries SQL com API REST fake e visualização interativa de resultados em tabela",
          fullDesc:
            "Ferramenta educacional e de prototipagem que simula uma API REST com banco de dados. Execute queries SQL, visualize resultados em tabelas interativas e explore relacionamentos entre dados. Ideal para demonstrar habilidades de backend.",
          tags: ["Node.js", "SQL", "REST API", "Data Table"],
          tech: ["TypeScript", "Mock API", "SQL Parser", "Tailwind CSS", "Recharts"],
          features: [
            "Editor SQL com syntax highlight",
            "Mock API com 5 endpoints REST",
            "Tabela interativa com ordenação e paginação",
            "Visualização de schema do banco de dados",
            "Simulação de JOIN, WHERE, GROUP BY",
          ],
          github: "#",
          demo: "#",
          color: "from-violet-500 to-purple-600",
        },
      ],
    },
    contact: {
      title: "Vamos Conversar",
      subtitle: "Pronto para transformar seus dados em soluções?",
      description:
        "Seja para um projeto freelance, oportunidade de emprego ou apenas para trocar ideias sobre tecnologia e dados — estou disponível.",
      name: "Nome",
      email: "Email",
      subject: "Assunto",
      message: "Mensagem",
      send: "Enviar Mensagem",
      sending: "Enviando...",
      success: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
      namePlaceholder: "Seu nome completo",
      emailPlaceholder: "seu@email.com",
      subjectPlaceholder: "Sobre o que você quer falar?",
      messagePlaceholder: "Descreva seu projeto ou oportunidade...",
      orContact: "Ou entre em contato diretamente",
    },
    footer: {
      rights: "Todos os direitos reservados.",
      builtWith: "Construído com",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      badge: "Available for new opportunities",
      headline: "Turning operational data into",
      headline2: "intelligent solutions",
      subheadline:
        "Full Stack Developer with a background in industrial engineering and data analysis. I build systems that extract real value from complex information.",
      cta1: "View Projects",
      cta2: "Contact Me",
      scrollDown: "Scroll down",
      stats: {
        years: "Years of Experience",
        projects: "Projects Delivered",
        data: "Analyses Performed",
        uptime: "Availability",
      },
    },
    about: {
      title: "About Me",
      subtitle: "From factory floor to code — a data journey",
      story1:
        "I started my career on the factory floor, analyzing operational data to optimize industrial processes. Using SQL, Power BI, and advanced Excel, I turned chaotic spreadsheets into dashboards that managers actually used to make decisions.",
      story2:
        "Over time, I realized the biggest problems weren't about process — they were about tools. Legacy systems, fragmented data, manual reports. I decided to learn how to build the solutions I always needed.",
      story3:
        "Today, as a Software Engineering student, I combine sharp analytical thinking with modern development. I understand the problem before writing the first line of code.",
      skills: "Technical Skills",
      journey: "My Journey",
      journeyItems: [
        {
          year: "2018",
          title: "Operational Analysis",
          desc: "Started in industrial data analysis, process optimization and KPIs",
        },
        {
          year: "2020",
          title: "Business Intelligence",
          desc: "Power BI, advanced SQL and corporate report automation",
        },
        {
          year: "2022",
          title: "Risk Management",
          desc: "Risk analysis, project management and data-driven decision making",
        },
        {
          year: "2024",
          title: "Software Engineering",
          desc: "Transition to full-stack development, React, Node.js and web systems",
        },
      ],
    },
    projects: {
      title: "Projects",
      subtitle: "Real solutions for real problems",
      viewCode: "View Code",
      liveDemo: "Live Demo",
      techStack: "Tech Stack",
      close: "Close",
      items: [
        {
          id: "dashboard",
          title: "Operational Dashboard",
          shortDesc:
            "Real-time dashboard for monitoring industrial KPIs with live data simulation",
          fullDesc:
            "Complete operational monitoring system that simulates industrial data in real time. Includes interactive charts, advanced filters and automatic alerts. Built to replace manual spreadsheets in manufacturing environments.",
          tags: ["React", "Recharts", "Real-time Data", "KPI"],
          tech: ["React", "TypeScript", "Recharts", "Tailwind CSS", "Framer Motion"],
          features: [
            "Real-time data updates (2s interval)",
            "Filters by period, sector and metric type",
            "Automatic alerts for out-of-range values",
            "CSV report export",
            "Responsive for industrial tablets",
          ],
          github: "#",
          demo: "#",
          color: "from-cyan-500 to-blue-600",
        },
        {
          id: "monitoring",
          title: "Monitoring System",
          shortDesc:
            "Industrial-style platform for visualizing logs, alerts and critical system status",
          fullDesc:
            "SCADA-style interface for monitoring critical systems. Real-time log visualization, priority-based alert system and equipment status panel. Design inspired by industrial control systems.",
          tags: ["Next.js", "WebSocket", "Alerts", "Logs"],
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
          features: [
            "Log feed with severity filter",
            "Alert system with 3 priority levels",
            "Real-time status of multiple equipment",
            "Incident history with timeline",
            "Push notifications for critical alerts",
          ],
          github: "#",
          demo: "#",
          color: "from-orange-500 to-red-600",
        },
        {
          id: "dataapi",
          title: "Data API + SQL Simulator",
          shortDesc:
            "SQL query simulator with fake REST API and interactive table results visualization",
          fullDesc:
            "Educational and prototyping tool that simulates a REST API with a database. Run SQL queries, view results in interactive tables and explore data relationships. Ideal for demonstrating backend skills.",
          tags: ["Node.js", "SQL", "REST API", "Data Table"],
          tech: ["TypeScript", "Mock API", "SQL Parser", "Tailwind CSS", "Recharts"],
          features: [
            "SQL editor with syntax highlighting",
            "Mock API with 5 REST endpoints",
            "Interactive table with sorting and pagination",
            "Database schema visualization",
            "JOIN, WHERE, GROUP BY simulation",
          ],
          github: "#",
          demo: "#",
          color: "from-violet-500 to-purple-600",
        },
      ],
    },
    contact: {
      title: "Let's Talk",
      subtitle: "Ready to transform your data into solutions?",
      description:
        "Whether for a freelance project, job opportunity or just to exchange ideas about technology and data — I'm available.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully! I'll get back to you soon.",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your@email.com",
      subjectPlaceholder: "What do you want to talk about?",
      messagePlaceholder: "Describe your project or opportunity...",
      orContact: "Or contact directly",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      badge: "Disponible para nuevas oportunidades",
      headline: "Convirtiendo datos operativos en",
      headline2: "soluciones inteligentes",
      subheadline:
        "Desarrollador Full Stack con experiencia en ingeniería industrial y análisis de datos. Construyo sistemas que extraen valor real de información compleja.",
      cta1: "Ver Proyectos",
      cta2: "Contactarme",
      scrollDown: "Desplázate hacia abajo",
      stats: {
        years: "Años de Experiencia",
        projects: "Proyectos Entregados",
        data: "Análisis Realizados",
        uptime: "Disponibilidad",
      },
    },
    about: {
      title: "Sobre Mí",
      subtitle: "Del piso de fábrica al código — un viaje de datos",
      story1:
        "Empecé mi carrera en el piso de fábrica, analizando datos operativos para optimizar procesos industriales. Con SQL, Power BI y Excel avanzado, convertí hojas de cálculo caóticas en dashboards que los gerentes realmente usaban para tomar decisiones.",
      story2:
        "Con el tiempo, me di cuenta de que los mayores problemas no eran de proceso — eran de herramientas. Sistemas heredados, datos fragmentados, informes manuales. Decidí aprender a construir las soluciones que siempre necesité.",
      story3:
        "Hoy, como estudiante de Ingeniería de Software, combino pensamiento analítico agudo con desarrollo moderno. Entiendo el problema antes de escribir la primera línea de código.",
      skills: "Habilidades Técnicas",
      journey: "Mi Trayectoria",
      journeyItems: [
        {
          year: "2018",
          title: "Análisis Operacional",
          desc: "Inicio en análisis de datos industriales, optimización de procesos y KPIs",
        },
        {
          year: "2020",
          title: "Business Intelligence",
          desc: "Power BI, SQL avanzado y automatización de informes corporativos",
        },
        {
          year: "2022",
          title: "Gestión de Riesgos",
          desc: "Análisis de riesgos, gestión de proyectos y toma de decisiones basada en datos",
        },
        {
          year: "2024",
          title: "Ingeniería de Software",
          desc: "Transición al desarrollo full-stack, React, Node.js y sistemas web",
        },
      ],
    },
    projects: {
      title: "Proyectos",
      subtitle: "Soluciones reales para problemas reales",
      viewCode: "Ver Código",
      liveDemo: "Demo en Vivo",
      techStack: "Stack Tecnológico",
      close: "Cerrar",
      items: [
        {
          id: "dashboard",
          title: "Dashboard Operacional",
          shortDesc:
            "Dashboard en tiempo real para monitoreo de KPIs industriales con simulación de datos en vivo",
          fullDesc:
            "Sistema completo de monitoreo operacional que simula datos industriales en tiempo real. Incluye gráficos interactivos, filtros avanzados y alertas automáticas. Construido para reemplazar hojas de cálculo manuales en entornos de manufactura.",
          tags: ["React", "Recharts", "Datos en Tiempo Real", "KPI"],
          tech: ["React", "TypeScript", "Recharts", "Tailwind CSS", "Framer Motion"],
          features: [
            "Actualización de datos en tiempo real (intervalo de 2s)",
            "Filtros por período, sector y tipo de métrica",
            "Alertas automáticas para valores fuera de rango",
            "Exportación de informes en CSV",
            "Responsivo para tabletas industriales",
          ],
          github: "#",
          demo: "#",
          color: "from-cyan-500 to-blue-600",
        },
        {
          id: "monitoring",
          title: "Sistema de Monitoreo",
          shortDesc:
            "Plataforma estilo industrial para visualización de logs, alertas y estado de sistemas críticos",
          fullDesc:
            "Interfaz estilo SCADA para monitoreo de sistemas críticos. Visualización de logs en tiempo real, sistema de alertas con prioridades y panel de estado de equipos. Diseño inspirado en sistemas de control industrial.",
          tags: ["Next.js", "WebSocket", "Alertas", "Logs"],
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
          features: [
            "Feed de logs con filtro por severidad",
            "Sistema de alertas con 3 niveles de prioridad",
            "Estado en tiempo real de múltiples equipos",
            "Historial de incidentes con línea de tiempo",
            "Notificaciones push para alertas críticas",
          ],
          github: "#",
          demo: "#",
          color: "from-orange-500 to-red-600",
        },
        {
          id: "dataapi",
          title: "API de Datos + Simulador SQL",
          shortDesc:
            "Simulador de consultas SQL con API REST falsa y visualización interactiva de resultados en tabla",
          fullDesc:
            "Herramienta educacional y de prototipado que simula una API REST con base de datos. Ejecuta consultas SQL, visualiza resultados en tablas interactivas y explora relaciones entre datos. Ideal para demostrar habilidades de backend.",
          tags: ["Node.js", "SQL", "REST API", "Tabla de Datos"],
          tech: ["TypeScript", "Mock API", "SQL Parser", "Tailwind CSS", "Recharts"],
          features: [
            "Editor SQL con resaltado de sintaxis",
            "Mock API con 5 endpoints REST",
            "Tabla interactiva con ordenamiento y paginación",
            "Visualización de schema de base de datos",
            "Simulación de JOIN, WHERE, GROUP BY",
          ],
          github: "#",
          demo: "#",
          color: "from-violet-500 to-purple-600",
        },
      ],
    },
    contact: {
      title: "Hablemos",
      subtitle: "¿Listo para transformar tus datos en soluciones?",
      description:
        "Ya sea para un proyecto freelance, oportunidad de empleo o simplemente para intercambiar ideas sobre tecnología y datos — estoy disponible.",
      name: "Nombre",
      email: "Email",
      subject: "Asunto",
      message: "Mensaje",
      send: "Enviar Mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado con éxito! Me pondré en contacto pronto.",
      namePlaceholder: "Tu nombre completo",
      emailPlaceholder: "tu@email.com",
      subjectPlaceholder: "¿De qué quieres hablar?",
      messagePlaceholder: "Describe tu proyecto u oportunidad...",
      orContact: "O contáctame directamente",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      builtWith: "Construido con",
    },
  },
};

export type TranslationKeys = typeof translations.pt;
