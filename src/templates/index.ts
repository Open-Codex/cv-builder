export const defaultShowcase = `cv:
  name: Martín Gil Oyarzún
  headline: AI Solutions Architect | Full-Stack Developer
  location: Viña del Mar, Chile
  phone: +56 9 XXXX XXXX
  email: martin.gil.o@gmail.com
  social_networks:
    - network: LinkedIn
      username: martin-gil-o
    - network: GitHub
      username: kirlts
  sections:
    Experience:
      - company: Universidad Alberto Hurtado
        position: Lead Developer & Platform Manager
        location: Viña del Mar, Chile (Remote)
        date: Mar. 2024 - Present
        highlights:
          - Modernization of the basedeconciertos.uahurtado.cl platform, migrating a monolithic legacy environment to a Docker-based service infrastructure, resolving technical debt and incorporating a comprehensive testing strategy, using in-memory Redis and RapidFuzz algorithms.
          - Implementation of secure API endpoints for asynchronous ingestion of 1000+ digitized events from Teatro Municipal de Santiago, in continuous collaboration with the OCR team.
      - company: Universidad Andrés Bello
        position: AI Researcher & Developer
        location: Viña del Mar, Chile (Hybrid)
        date: Jul. 2024 - Jan. 2026
        highlights:
          - N8N workflow orchestration, implementing pipelines with LLM agents and RAG with pgvector for semantic analysis and compliance auditing, backed by the academic publication of a formal JSON-LD-based specification, enabling modeling and partially deterministic validation of 44 Quality Matters rubric sub-standards (Instructional Design).
          - Deployment of platform on institutional server, Vue.js frontend connected to N8N and Supabase (PostgreSQL), in early adoption by the Instructional Design unit.
      - company: Sotos.app
        position: DevOps - Professional Internship
        location: Viña del Mar, Chile (Hybrid)
        date: Jan. 2024 - Mar. 2024
        highlights:
          - Technical execution of infrastructure migration of pre-launch project from AWS to GCP, managing Kubernetes orchestration and load balancers for the production environment.
    Personal Projects:
      - name: Prometeo
        detail: OSINT engine for B2B niche detection
        date: '2026'
        highlights:
          - Implementation of a data pipeline to find B2B business niches associated with user frustration language, using Reddit scraping, NLP (spaCy, embeddings), regex, and LLM analysis with LangChain.
          - Use of LLM Structured Output combined with Pydantic schemas to guide LLM reasoning and outputs.
          - Project containerization in Docker, testing environment in Python Venv.
      - name: '[Witral Framework](https://kirlts.github.io/witral)'
        detail: Ingestion and processing framework (Whatsapp to Markdown)
        date: '2025'
        highlights:
          - Creation of a 100% local TypeScript + Node.js framework, implementing a layered plugin pattern.
          - Continuous packaging and deployment in Docker containers on a free Oracle Cloud instance, running 24/7.
          - Open Source release v1.0.0 under MIT license, with interactive CLI and public technical documentation.
    Skills:
      - label: AI & Orchestration
        details: LangChain, RAG, pgvector, Prompt Engineering, Pydantic-AI, Google GenAI SDK, N8N, Structured Output, spaCy
      - label: Cloud & DevOps
        details: Docker, GCP, Kubernetes, CI/CD, GitHub Actions, Oracle Cloud, Shell Scripting
      - label: Languages & Data
        details: Python, TypeScript, JavaScript, SQL, PostgreSQL, MySQL, Redis, Pandas, Node.js
      - label: Full-Stack Development
        details: Vue.js, React, Flask, Git, Vite, Tailwind CSS, SQLAlchemy, REST API, TDD
      - label: Spoken Languages
        details: Spanish (Native), English (Advanced - C2)
    Education:
      - institution: Universidad Andrés Bello
        area: Computer & Information Engineering
        location: Viña del Mar, Chile
        date: Mar. 2023 - Dec. 2025
        summary: 'Thesis: "QM Validator", AI-powered Quality Assurance system for automated validation of Quality Matters standards. Based on formal JSON-LD specification, LLM agent orchestration with RAG over pgvector, and Vue.js web platform. Associated academic publications accepted at IFE 2026 and EDUNINE 2026 conferences.'
      - institution: Universidad Diego Portales
        area: Civil Engineering in Telecommunications & IT
        location: Santiago, Chile
        date: Mar. 2020 - Dec. 2022
        summary: Credits transferred to UNAB.
locale:
  language: english
design:
  theme: mart
`;

export const defaultShowcaseEs = `cv:
  nombre: Martín Gil Oyarzún
  titular: AI Solutions Architect | Full-Stack Developer
  ubicación: Viña del Mar, Chile
  teléfono: +56 9 XXXX XXXX
  correo: martin.gil.o@gmail.com
  social_networks:
    - network: LinkedIn
      username: martin-gil-o
    - network: GitHub
      username: kirlts
  secciones:
    Experiencia:
      - empresa: Universidad Alberto Hurtado
        cargo: Desarrollador Principal y Encargado de Plataforma
        ubicación: Viña del Mar, Chile (Remoto)
        fecha: Mar. 2024 - Presente
        logros:
          - Implementación de modernización de la plataforma basedeconciertos.uahurtado.cl, migrando un entorno legado monolítico hacia una infraestructura de servicios en Docker, saldando deuda técnica e incorporando estrategia completa de testing, utilizando Redis en memoria y algoritmos con RapidFuzz.
          - Implementación de endpoints API seguros para la ingesta asíncrona de +1000 eventos digitalizados del Teatro Municipal de Santiago, en colaboración continua con el equipo de OCR.
      - empresa: Universidad Andrés Bello
        cargo: Investigador y Desarrollador de IA
        ubicación: Viña del Mar, Chile (Híbrido)
        fecha: Jul. 2024 - Ene. 2026
        logros:
          - Orquestación de flujos en N8N, implementando pipelines con agentes LLM y RAG con pgvector para análisis semántico y auditoría de compliance, respaldado por la publicación académica de una especificación formal basada en JSON-LD, habilitando el modelado y la validación parcialmente determinista de 44 subestándares de rúbrica Quality Matters (Diseño Instruccional).
          - Despliegue de plataforma en servidor institucional, frontend en Vue.js conectado a N8N y Supabase (postgres), en proceso de adopción temprana por unidad de Diseño Instruccional.
      - empresa: Sotos.app
        cargo: DevOps - Práctica Profesional
        ubicación: Viña del Mar, Chile (Híbrido)
        fecha: Ene. 2024 - Mar. 2024
        logros:
          - Ejecución técnica de la migración de infraestructura del proyecto pre-lanzamiento desde AWS a GCP, gestionando la orquestación de Kubernetes y balanceadores de carga para el entorno de producción.
    Proyectos Personales:
      - nombre: Prometeo
        detalle: Motor OSINT para detección de nichos B2B
        fecha: '2026'
        logros:
          - Implementación de un pipeline de datos para encontrar nichos de negocio b2b asociados a lenguaje de frustración de usuarios, utilizando scraping a Reddit, NLP (spaCy, embeddings), regex y análisis LLM con LangChain.
          - Uso de salidas LLM Structured Output en combinación con esquemas Pydantic para guiar el razonamiento y las salidas del LLM.
          - Contenedorización del proyecto en Docker, ambiente de pruebas en Python Venv.
      - nombre: '[Witral Framework](https://kirlts.github.io/witral)'
        detalle: Framework de ingesta y procesamiento (Whatsapp a Markdown)
        fecha: '2025'
        logros:
          - Creación de framework 100% local en TypeScript + Node.js, implementando un patrón de plugins por capas.
          - Empaquetado y despliegue continuo en contenedores Docker sobre instancia gratuita de Oracle Cloud, en funcionamiento 24/7.
          - Release Open Source v1.0.0 bajo licencia MIT, con CLI interactiva y documentación técnica pública.
    Habilidades:
      - etiqueta: IA y Orquestación
        detalles: LangChain, RAG, pgvector, Prompt Engineering, Pydantic-AI, Google GenAI SDK, N8N, Structured Output, spaCy
      - etiqueta: Cloud y DevOps
        detalles: Docker, GCP, Kubernetes, CI/CD, GitHub Actions, Oracle Cloud, Shell Scripting
      - etiqueta: Lenguajes y Datos
        detalles: Python, TypeScript, JavaScript, SQL, PostgreSQL, MySQL, Redis, Pandas, Node.js
      - etiqueta: Desarrollo Full-Stack
        detalles: Vue.js, React, Flask, Git, Vite, Tailwind CSS, SQLAlchemy, REST API, TDD
      - etiqueta: Idiomas Hablados
        detalles: Español (Nativo), Inglés (Avanzado - C2)
    Educación:
      - institución: Universidad Andrés Bello
        área: Ingeniería en Computación e Informática
        ubicación: Viña del Mar, Chile
        fecha: Mar. 2023 - Dic. 2025
        resumen: 'Tesis: "Validador QM", sistema de Aseguramiento de Calidad con IA para validación automatizada de estándares Quality Matters. Basado en especificación formal JSON-LD, orquestación de agentes LLM en con RAG sobre pgvector y plataforma web en Vue.js. Publicaciones académicas asociadas aceptadas en conferencias IFE 2026 y EDUNINE 2026.'
      - institución: Universidad Diego Portales
        área: Ingeniería Civil en Telecomunicaciones e Informática
        ubicación: Santiago, Chile
        fecha: Mar. 2020 - Dic. 2022
        resumen: Convalidado en UNAB.
locale:
  language: spanish
design:
  theme: mart
`;

export const skeleton = `cv:
  name: Your Full Name
  headline: Your Professional Headline
  location: City, Country
  email: your.email@example.com
  sections:
    Experience:
    - company: Company Name
      position: Job Title
      location: City, Country
      date: Jan. 2024 - Present
      highlights:
      - Key achievement or responsibility
    Personal Projects:
    - name: Project Name
      detail: Brief description
      date: github.com/user/repo
      highlights:
      - Notable aspect of the project
    Skills:
    - label: Category
      details: Skill 1, Skill 2, Skill 3
    Education:
    - institution: University Name
      area: Degree Field
      location: City, Country
      date: Mar. 2020 - Dec. 2024
locale:
  language: english
design:
  theme: mart
`;

export const skeletonEs = `cv:
  nombre: Tu Nombre
  titular: Tu Titular Profesional
  ubicación: Ciudad, País
  correo: tu.email@ejemplo.com
  secciones:
    Experiencia:
    - empresa: Nombre de la Empresa
      cargo: Título del Puesto
      ubicación: Ciudad, País
      fecha: Ene. 2024 - Presente
      logros:
      - Logro o responsabilidad clave
    Proyectos Personales:
    - nombre: Nombre del Proyecto
      detalle: Breve descripción
      fecha: github.com/usuario/repo
      logros:
      - Aspecto notable del proyecto
    Habilidades:
    - etiqueta: Categoría
      detalles: Habilidad 1, Habilidad 2, Habilidad 3
    Educación:
    - institución: Nombre de la Universidad
      área: Título Obtenido
      ubicación: Ciudad, País
      fecha: Mar. 2020 - Dic. 2024
locale:
  language: spanish
design:
  theme: mart
`;
