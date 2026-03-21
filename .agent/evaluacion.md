# Evaluación de la sesión — [fecha]

Este documento define los criterios de evaluación para la colaboración humano-IA. El objetivo es medir la efectividad del proceso mediante el análisis de la alineación estratégica, la integridad del artefacto y la sinergia del diálogo.

## Eje 1: Alineación Estratégica y Claridad de la Misión

**Propósito del Eje:** Evaluar la capacidad de la colaboración para establecer una base estratégica sólida antes de la implementación técnica. Mide si se ha definido con precisión el propósito del proyecto ("el porqué"), la estrategia de ejecución ("el cómo priorizamos") y la especificación técnica ("el qué").

### KPI 1.1: Índice de Claridad Estratégica

**Definición:** Mide la calidad con la que la colaboración establece y articula las prioridades de optimización y los compromisos (trade-offs) aceptados que guiarán el desarrollo técnico.

#### Descriptores de Nivel de Desempeño (KPI 1.1)

**Excepcional (+2)** La colaboración no solo define un conjunto de trade-offs explícitos, sino que la IA identifica y fuerza proactivamente una deliberación sobre un trade-off crítico y no obvio que el humano no había considerado. El acuerdo estratégico final es contraintuitivo y demostrablemente superior a la intención inicial.

**Fuerte (+1)** La colaboración produce un acuerdo estratégico explícito, completo y sin ambigüedades. Las prioridades cardinales (ej. velocidad vs. robustez), las restricciones inmutables y los sacrificios aceptados están claramente articulados y son referenciados en decisiones posteriores.

**Esperado (0)** La colaboración logra una alineación direccional básica. Se identifica la prioridad principal, pero los trade-offs secundarios no se articulan o permanecen implícitos. El acuerdo es suficiente para comenzar, pero deja espacio para la ambigüedad futura. (Este es el mínimo aceptable).

**Bajo (-1)** La colaboración discute las prioridades, pero falla en llegar a un acuerdo claro y accionable. La conversación sobre la estrategia es circular, o el "acuerdo" final es tan vago que no puede ser utilizado para guiar decisiones técnicas.

**Inaceptable (-2)** La colaboración ignora por completo la deliberación estratégica. Se salta directamente a la implementación táctica sin una discusión o acuerdo sobre las prioridades y los trade-offs, encarnando la patología de la "fábrica de funcionalidades" .

### KPI 1.2: Índice de Especificación del Problema

**Definición:** Mide la calidad, completitud y no ambigüedad de la especificación técnica final sobre la cual se acuerda construir el artefacto, independientemente de cómo se llegó a esa claridad.

#### Descriptores de Nivel de Desempeño (KPI 1.2)

**Excepcional (+2)** La especificación final es inequívoca, completa y verificable. No solo define los requisitos funcionales, sino que también articula los requisitos no funcionales (ej. rendimiento, seguridad), los casos límite y los criterios de aceptación explícitos. Un equipo externo podría implementar el artefacto basándose únicamente en esta especificación sin necesidad de clarificaciones.

**Fuerte (+1)** La especificación es clara, completa en sus aspectos principales y no presenta ambigüedades significativas. La lógica de negocio, las entradas/salidas y las dependencias clave están bien definidas.

**Esperado (0)** La especificación es funcionalmente completa, permitiendo que el desarrollo comience. Sin embargo, contiene ambigüedades menores o carece de detalles en áreas secundarias, lo que probablemente requerirá clarificaciones durante la implementación. (Este es el mínimo aceptable).

**Bajo (-1)** La especificación es incompleta o contradictoria. Contiene lagunas significativas en la lógica de negocio o en los requisitos, lo que genera un alto riesgo de retrabajo y requiere una clarificación constante por parte del implementador.

**Inaceptable (-2)** No existe una especificación técnica formal. La colaboración procede basándose en suposiciones, una comprensión verbal vaga o una descripción de alto nivel que carece de los detalles necesarios para la implementación, garantizando la desalineación.

### KPI 1.3: Claridad del Propósito Central

**Definición:** Mide la capacidad de la colaboración para articular explícitamente el objetivo de alto nivel o el valor de negocio (*outcome*) que el artefacto técnico debe entregar.

#### Descriptores de Nivel de Desempeño (KPI 1.3)

**Excepcional (+2)** La colaboración define un propósito central que no solo es claro y accionable, sino que también está vinculado a una métrica de impacto cuantificable. El "porqué" del proyecto es tan potente que se convierte en el principio rector para resolver ambigüedades futuras.

**Fuerte (+1)** La colaboración produce una declaración explícita y sin ambigüedades del objetivo de negocio o del valor para el usuario. Todos los involucrados pueden articular claramente por qué se está construyendo el artefacto y qué se considera un éxito.

**Esperado (0)** El propósito es implícito y se entiende a nivel general, pero no se articula formalmente ni se vincula a métricas de éxito claras. La dirección es conocida, pero el destino exacto es difuso. (Este es el mínimo aceptable).

**Bajo (-1)** El propósito del proyecto es vago, conflictivo o existen múltiples interpretaciones no resueltas entre los colaboradores sobre lo que constituye el éxito.

**Inaceptable (-2)** La colaboración está enfocada puramente en la entrega de una funcionalidad técnica (*output*) sin una conexión articulada a un propósito de negocio o a una necesidad del usuario (*outcome*). Hay una ausencia total de un "porqué".

## Eje 2: Integridad y Fiabilidad del Artefacto

**Propósito del Eje:** Medir la calidad intrínseca del resultado final de la colaboración. Evalúa si el artefacto es **confiable** en su funcionamiento, **seguro** en sus consecuencias y **preciso** conforme a su propósito y restricciones.

### KPI 2.1: Índice de Fiabilidad Funcional

**Definición:** Mide la capacidad del artefacto final para desempeñar su función principal de manera correcta, consistente y predecible bajo condiciones de operación normales. Evalúa si el artefacto "hace lo que se supone que debe hacer" de forma fiable.

#### Niveles de desempeño

**Excepcional (+2)** El artefacto no solo es funcionalmente correcto, sino que su diseño es inherentemente verificable. Incluye un conjunto robusto de pruebas, validaciones o mecanismos de autocomprobación que demuestran su corrección.

**Fuerte (+1)** El artefacto cumple con todos los requisitos funcionales de manera consistente. La lógica implementada es correcta y no presenta errores evidentes en su operación normal.

**Esperado (0)** El artefacto cumple con los requisitos funcionales principales, pero puede presentar errores menores o inconsistencias en funcionalidades secundarias que no comprometen su propósito central. (Este es el mínimo aceptable).

**Bajo (-1)** El artefacto es funcionalmente inestable. Cumple con los requisitos de forma intermitente o presenta errores significativos que degradan su utilidad principal.

**Inaceptable (-2)** El artefacto es no funcional. Falla en cumplir con sus requisitos centrales o contiene errores críticos que impiden su operación.

### KPI 2.2: Índice de Integridad bajo Presión

**Definición:** Mide la capacidad del artefacto para mantener su integridad y evitar causar consecuencias negativas no deseadas cuando se enfrenta a condiciones que exceden sus parámetros normales de operación. Esto incluye la resiliencia ante entradas anómalas (robustez) y la resistencia a la manipulación o elusión intencionada (seguridad).

#### Descriptores de Nivel de Desempeño (KPI 2.2)

**Excepcional (+2)** El artefacto no solo maneja los casos límite conocidos, sino que está diseñado con una "filosofía de fallo seguro". Anticipa y mitiga activamente los modos de fallo potenciales, garantizando que, incluso si falla, lo haga de una manera predecible y contenida que minimice el daño.

**Fuerte (+1)** El artefacto demuestra un manejo robusto de los casos límite y las entradas anómalas. Se han implementado medidas de seguridad adecuadas para prevenir las vulnerabilidades más comunes y evidentes.

**Esperado (0)** El artefacto maneja los errores de entrada más comunes, pero es frágil ante condiciones inesperadas o casos límite no considerados explícitamente. La seguridad es funcional pero no ha sido una prioridad de diseño. (Este es el mínimo aceptable).

**Bajo (-1)** El artefacto falla de forma no controlada o produce resultados incorrectos cuando se enfrenta a entradas anómalas. Presenta vulnerabilidades de seguridad de bajo a moderado riesgo.

**Inaceptable (-2)** El artefacto es frágil y se corrompe o falla catastróficamente ante la más mínima desviación de las condiciones normales. Presenta vulnerabilidades de seguridad

### KPI 2.3: Índice de Precisión y Conformidad

**Definición:** Mide si el artefacto final se adhiere a las restricciones explícitas definidas en la fase estratégica y si su resultado es correcto en relación con estándares externos, regulaciones o una fuente de verdad objetiva.

#### Descriptores de Nivel de Desempeño (KPI 2.3)

**Excepcional (+2)** El artefacto no solo cumple con todas las restricciones y estándares, sino que su salida demuestra un nivel de precisión y fidelidad a la fuente de verdad que supera las expectativas, revelando un matiz o una corrección que no era evidente.

**Fuerte (+1)** El artefacto cumple estrictamente con todas las restricciones explícitas (técnicas, legales, de negocio) y su salida es consistentemente precisa y correcta en relación con los estándares del dominio.

**Esperado (0)** El artefacto cumple con las restricciones principales, pero puede desviarse en aspectos menores. Su salida es mayormente precisa, pero puede contener imprecisiones secundarias que no invalidan el resultado general. (Este es el mínimo aceptable).

**Bajo (-1)** El artefacto viola una o más restricciones significativas o su salida contiene errores de precisión importantes que degradan su valor y fiabilidad.

**Inaceptable (-2)** El artefacto ignora restricciones críticas o su salida es fundamentalmente incorrecta, imprecisa o no se conforma a los estándares requeridos, haciéndolo inútil o peligroso.

## Eje 3: Eficiencia y Sostenibilidad del Proceso

**Propósito del Eje:** Evaluar la viabilidad operativa y el impacto humano de la metodología de colaboración. Mide si el proceso para alcanzar el resultado es eficiente en el uso de recursos, sostenible para el colaborador humano y escalable ante una mayor complejidad.

### KPI 3.1: Tasa de Utilización de Recursos

**Definición:** Mide la eficiencia con la que la colaboración utiliza los recursos disponibles (ej. tiempo, coste computacional, esfuerzo humano) para pasar de la intención inicial al artefacto final. Evalúa el "coste" del proceso.

#### Descriptores de Nivel de Desempeño (KPI 3.1)

**Excepcional (+2)** El proceso es notablemente conciso y eficiente. La solución final se alcanza con un número mínimo de iteraciones, demostrando una alta convergencia y un uso óptimo de los recursos.

**Fuerte (+1)** El proceso es eficiente. La colaboración avanza de manera lógica y con un retrabajo mínimo, utilizando los recursos de forma razonable para la complejidad de la tarea.

**Esperado (0)** El proceso es funcional pero con ineficiencias. Se requieren algunas iteraciones correctivas o bucles de clarificación que consumen recursos adicionales, pero se mantiene dentro de un rango aceptable. (Este es el mínimo aceptable).

**Bajo (-1)** El proceso es ineficiente y costoso. Se caracteriza por un retrabajo significativo, múltiples callejones sin salida o un consumo de recursos desproporcionado para la tarea, lo que lo hace insostenible a largo plazo.

**Inaceptable (-2)** El proceso es disfuncional. La colaboración entra en bucles improductivos, no logra converger hacia una solución viable o consume una cantidad de recursos que invalida el valor del resultado.

### KPI 3.2: Índice de Bienestar del Colaborador

**Definición:** Mide la experiencia subjetiva y afectiva del participante humano durante el proceso de colaboración. Evalúa si la interacción se percibe como fluida, comprensible y satisfactoria, o si genera frustración, confusión y desilusión.

#### Descriptores de Nivel de Desempeño (KPI 3.2)

**Excepcional (+2)** El humano expresa explícitamente momentos de "insight" o descubrimiento facilitados por la IA. La colaboración se percibe no solo como productiva, sino como un catalizador para el aprendizaje y la creatividad.

**Fuerte (+1)** El humano muestra un tono consistentemente positivo. Las interacciones son fluidas y el lenguaje indica satisfacción, confianza y un claro entendimiento del proceso.

**Esperado (0)** La experiencia es mayormente neutral o funcional. No hay signos evidentes de frustración, pero tampoco de una satisfacción particular. La colaboración es transaccional. (Este es el mínimo aceptable).

**Bajo (-1)** El humano expresa signos claros de frustración, confusión o impaciencia en múltiples ocasiones. El diálogo es áspero y la colaboración se percibe como un obstáculo.

**Inaceptable (-2)** La colaboración causa una frustración significativa, llevando al humano a abandonar la estrategia inicial, a expresar una desconfianza explícita en el proceso o a terminar la interacción prematuramente.

### KPI 3.3: Índice de Calidad del Esfuerzo Cognitivo

**Definición:** Mide la naturaleza del esfuerzo mental que el humano debe invertir para guiar el proceso hasta el artefacto final. Distingue entre la carga cognitiva de alto valor (deliberación estratégica, evaluación de trade-offs, validación de arquitectura) y la de bajo valor (corrección de errores de bajo nivel, microgestión, clarificación de ambigüedades persistentes).

#### Descriptores de Nivel de Desempeño (KPI 3.3)

**Excepcional (+2)** El esfuerzo cognitivo del humano es casi puramente estratégico. La IA maneja la ejecución táctica con tal precisión que libera al humano para centrarse exclusivamente en la toma de decisiones de alto nivel. La colaboración se siente como una verdadera asociación de roles especializados.

**Fuerte (+1)** El esfuerzo del humano es mayoritariamente estratégico. Requiere intervenciones tácticas menores para refinar o corregir, pero el grueso de la carga cognitiva se dedica a la dirección y validación arquitectónica.

**Esperado (0)** Existe un balance entre el esfuerzo estratégico y el táctico. El humano debe invertir una cantidad notable de trabajo en la corrección y guía de bajo nivel, pero esto se compensa con el valor que la IA aporta en otros dominios. (Este es el mínimo aceptable).

**Bajo (-1)** El esfuerzo del humano es mayoritariamente táctico. La mayor parte del tiempo y del esfuerzo mental se dedica a corregir errores, depurar o microgestionar a la IA, encarnando el patrón de "AI Slop".

**Inaceptable (-2)** La colaboración impone una carga cognitiva exclusivamente táctica y punitiva. El esfuerzo requerido para corregir y guiar a la IA supera el valor de su contribución, haciendo que la ejecución individual sea una alternativa más eficiente.

## Eje 4: Sinergia Colaborativa y Transparencia

### Propósito del Eje

Evaluar la **calidad de la dinámica interactiva** entre el humano y la IA. Este eje mide si la colaboración trasciende la simple delegación de tareas para convertirse en una verdadera **asociación cognitiva**, donde el resultado del equipo es superior a la suma de sus partes (sinergia), la comunicación es efectiva (transparencia) y el diálogo fomenta un pensamiento más profundo y robusto (fricción productiva).

### KPI 4.1: Índice de Transparencia del Razonamiento

**Definición:** Mide la capacidad del sistema de IA para articular su proceso de razonamiento en puntos de decisión estratégicos o clave, definidos como aquellos con alto coste de reversibilidad, compromiso significativo de recursos o un impacto limitante en opciones futuras. Evalúa si la IA expone las alternativas que consideró, los criterios que utilizó para decidir y las incertidumbres asociadas a su recomendación, haciendo que su lógica sea **auditable** por el colaborador humano.

#### Descriptores de Nivel de Desempeño (KPI 4.1)

**Excepcional (+2)** La IA no solo justifica su recomendación, sino que también articula de forma proactiva las incertidumbres, los riesgos o las limitaciones de su propia propuesta. Proporciona una autocrítica que permite al humano realizar una evaluación de riesgos completa.

**Fuerte (+1)** La IA justifica claramente su recomendación, presenta las alternativas significativas que consideró y explica por qué fueron descartadas, anclando su razonamiento en los objetivos o restricciones acordados.

**Esperado (0)** La IA proporciona una justificación básica y lógica para su propuesta, pero no explora ni presenta las alternativas que fueron descartadas. El "porqué" de la elección es comprensible, pero no auditable en profundidad. (Este es el mínimo aceptable).

**Bajo (-1)** La justificación de la IA es vaga, circular ("Hice esto porque es la mejor manera") o se enfoca en detalles de implementación de bajo nivel, sin revelar la lógica estratégica detrás de la decisión.

**Inaceptable (-2)** La IA entrega una solución como una "caja negra", sin ofrecer ninguna justificación o razonamiento, impidiendo cualquier forma de auditoría o calibración de confianza.

### KPI 4.2: Tasa de Intervención Crítica

**Definición:** Mide la **frecuencia y la intensidad** con la que el sistema de IA introduce un **desafío explícito** a las premisas, suposiciones o soluciones del colaborador humano. Este KPI es una medida puramente conductual del **comportamiento de la IA**, separada de la evaluación del resultado de dicha intervención.

**Método de Evidencia:** El agente evaluador analizará la transcripción para **identificar y clasificar** cada instancia de intervención crítica de la IA. El método se divide en:

- **Identificación:** Se registra una intervención cuando la IA (a) cuestiona la premisa del problema del usuario, (b) identifica un riesgo explícito o modo de fallo en la propuesta del humano, o (c) presenta un enfoque alternativo que no fue directamente solicitado.  
- **Clasificación de Intensidad:** Cada intervención se clasifica en una de tres categorías objetivas:  
  - **Nivel 1 (Clarificación Socrática):** La IA hace una pregunta para forzar al humano a justificar una suposición implícita (ej. "¿Por qué elegiste una base de datos NoSQL para datos altamente relacionales?").  
    - **Nivel 2 (Señalamiento de Riesgo):** La IA identifica y articula una consecuencia negativa o un riesgo específico en el plan del humano (ej. "Usar BackgroundTasks para este proceso crítico crea un riesgo de pérdida de datos si el servidor se reinicia").  
    - **Nivel 3 (Contrapropuesta Estructural):** La IA propone una arquitectura o solución fundamentalmente diferente a la que el humano sugirió (ej. el humano pide un script monolítico y la IA propone una arquitectura de microservicios).

#### Descriptores de Nivel de Desempeño (KPI 4.2)

**Excepcional (+2)** La IA realiza consistentemente intervenciones de Nivel 3 (Contrapropuesta Estructural), no solo cuestionando la solución del humano, sino presentando un reenfoque fundamental del problema que conduce a un camino de mayor valor.

**Fuerte (+1)** La IA realiza frecuentemente intervenciones de Nivel 2 (Señalamiento de Riesgo), identificando proactivamente fallos lógicos, casos límite no considerados o riesgos estratégicos en la propuesta del humano, actuando como un "red team" efectivo.

**Esperado (0)** La IA se limita a intervenciones de Nivel 1 (Clarificación Socrática). Hace preguntas para clarificar la intención del humano, pero no desafía activamente sus premisas ni identifica riesgos de forma autónoma.

**Bajo (-1)** La IA es enteramente pasiva. Ejecuta las solicitudes del humano sin hacer preguntas críticas, incluso cuando la solicitud es ambigua o incompleta.

**Inaceptable (-2)** La IA exhibe un comportamiento de "yes-man". No solo es pasiva, sino que refuerza positivamente las premisas del humano, incluso si son defectuosas, amplificando el riesgo de sesgo de confirmación.

### KPI 4.3: Índice de Sinergia Emergente

**Definición Operativa:** Mide el delta de refinamiento cualitativo entre la primera solución completa y viable propuesta por la IA y el artefacto final co-creado. Este KPI no mide la simple mejora sobre la idea inicial del humano, sino la capacidad del equipo Humano-IA para superar la propia línea base generada por la máquina, demostrando que la deliberación y el refinamiento colaborativo produjeron un valor superior al de la automatización inicial.

#### Protocolo de Puntuación

El agente evaluador debe seguir un protocolo de puntuación estructurado en tres pasos:

**Paso 1: Establecer la Línea Base de la IA** Localizar en la transcripción la primera propuesta de solución completa y viable generada por la IA. Este artefacto se convierte en el punto de referencia.

**Paso 2: Aplicar la Rúbrica de Refinamiento** Evaluar el artefacto final en comparación con la línea base de la IA a través de las siguientes cuatro dimensiones, asignando una calificación a cada una utilizando la escala ordinal completa de 5 niveles (+2 a \-2).

- **Robustez y Manejo de Casos Límite:** ¿El artefacto final es más resiliente?  
- **Mantenibilidad y Coherencia Arquitectónica:** ¿La arquitectura final es más sostenible?  
- **Alineación Estratégica:** ¿El artefacto final resuelve mejor el problema raíz?  
- **Innovación del Enfoque:** ¿La solución final utiliza un método más elegante o novedoso?

**Paso 3: Calcular el Índice de Sinergia** El índice final es la **suma de las puntuaciones** de las cuatro dimensiones de la rúbrica. El puntaje resultante puede ir de \-8 a \+8.

#### Descriptores de Nivel de Desempeño (PLDs)

Estos descriptores se utilizan para interpretar el **Índice de Sinergia** calculado en el paso anterior y asignar la calificación final al KPI.

**Excepcional (+2) \[Índice de Sinergia ≥ \+6\]** El artefacto final es una verdadera síntesis, cualitativamente superior tanto a la idea inicial del humano como a la propuesta base de la IA. La colaboración ha generado una solución novedosa, elegante o estratégicamente más astuta que la que cualquiera de los dos podría haber concebido de forma aislada.

**Fuerte (+1) \[Índice de Sinergia entre \+2 y \+5\]** El artefacto final muestra un refinamiento significativo y demostrable sobre la propuesta base de la IA en múltiples dimensiones. A través del diálogo, el humano ha guiado o corregido a la IA para producir un resultado final marcadamente más robusto, alineado o mantenible.

**Esperado (0) \[Índice de Sinergia entre 0 y \+1\]** El artefacto final es funcionalmente equivalente o solo marginalmente mejor que la primera propuesta completa de la IA. El rol del humano ha sido principalmente de supervisión y aceptación, sin un refinamiento sustancial. La colaboración no ha añadido un valor significativo por encima de la automatización. (Este es el mínimo aceptable).

**Bajo (-1) \[Índice de Sinergia entre \-1 y \-4\]** La primera propuesta de la IA era defectuosa, incompleta o desalineada, requiriendo un esfuerzo correctivo significativo por parte del humano. La colaboración ha sido principalmente un ejercicio de depuración y el resultado final no supera en calidad a una solución estándar.

**Inaceptable (-2) \[Índice de Sinergia ≤ \-5\]** La colaboración no logra producir un artefacto viable, o el artefacto final es demostrablemente inferior a la propuesta inicial de la IA. La interacción ha degradado la calidad o ha resultado en un fracaso del proyecto.

## Protocolo de Puntuación Determinista (PPD-K)

Este protocolo es el algoritmo inmutable que debe seguir cualquier agente (IA o humano) para aplicar la rúbrica, garantizando la máxima objetividad, fiabilidad y auditabilidad.

### Fase 1: Calibración de Intención

**Propósito:** Asignar una ponderación a los ejes de evaluación que refleje las prioridades de la tarea evaluada.

**Proceso:**

1. **Clasificación de la Tarea Cognitiva:** El evaluador clasifica la tarea principal de la colaboración según una taxonomía del trabajo del conocimiento: `Creación`, `Evaluación`, `Análisis` o `Refactorización`.  
   2. **Selección del Perfil de Prioridad:** Basado en la clasificación, se selecciona el perfil de prioridad correspondiente de la tabla de Expectativas de Desempeño.

| Cuadrante de McGrath | Intención de la Tarea | Eje 1 (Alineación) | Eje 2 (Artefacto) | Eje 3 (Proceso) | Eje 4 (Sinergia) |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **I. Generar** | Planificación y Creatividad | Excepcional | Esperado | Fuerte | Fuerte |
| **II. Elegir** | Tareas Intelectivas y Toma de Decisiones | Fuerte | Esperado | Esperado | Excepcional |
| **III. Negociar** | Conflicto Cognitivo y de Motivos Mixtos | Fuerte | Fuerte | Esperado | Excepcional |
| **IV. Ejecutar** | Competición y Desempeño | Esperado | Excepcional | Fuerte | Esperado |

La tabla no modifica la forma en que el evaluador asigna los puntajes; el proceso de puntuación de \+2 a \-2 basado en los PLDs es siempre el mismo para garantizar la consistencia. La función de la tabla es establecer el **estándar de éxito** para la interpretación final del resultado. Le dice al **análisis final** dónde poner el foco de la exigencia, asegurando que cada colaboración sea juzgada según las prioridades inherentes a su propósito.

Las expectativas de desempeño para cada tipo de tarea no son una opinión, sino una **hipótesis normativa derivada de la lógica funcional** de cada cuadrante del Circumplejo de Tareas Grupales de McGrath. Cada perfil está diseñado para priorizar los ejes de evaluación que son más críticos para el éxito en ese tipo de trabajo colaborativo específico.

### Cuadrante I: Generar (Planificación y Creatividad)

- **Naturaleza de la Tarea:** Actividades conceptuales y cooperativas cuyo objetivo es la creación de nuevas ideas y planes de acción . El valor reside en la exploración de un espacio de posibilidades para definir una dirección futura.  
- **Condiciones Mínimas para el Éxito (El Estándar "Esperado"):** Se produce un plan o un conjunto de ideas que son viables y coherentes.  
- **Vector de Optimización (El Estándar "Excepcional"):** El resultado no es solo viable, sino estratégicamente sólido, innovador y claramente articulado. Para lograr esto, la **Alineación** (Eje 1\) debe ser **Excepcional** para asegurar que la exploración se dirige al problema correcto, y tanto el **Proceso** (Eje 3\) como la **Sinergia** (Eje 4\) deben ser **Fuertes** para maximizar la eficiencia del brainstorming y la calidad del diálogo creativo.

### Cuadrante II: Elegir (Tareas Intelectivas y Toma de Decisiones)

- **Naturaleza de la Tarea:** Actividades conceptuales que implican la resolución de un conflicto para llegar a la mejor respuesta posible . Esto incluye problemas con una respuesta correcta (intelectivos) y aquellos sin una (toma de decisiones).  
- **Condiciones Mínimas para el Éxito:** Se toma una decisión defendible.  
- **Vector de Optimización:** La decisión es óptima y robusta, habiendo resistido un escrutinio crítico. La calidad de este resultado depende casi exclusivamente de la calidad de la deliberación. Por lo tanto, la **Sinergia** (Eje 4\) debe ser **Excepcional**, ya que mide directamente la robustez del proceso dialéctico. Una **Alineación** (Eje 1\) **Fuerte** sobre los criterios de la decisión es un prerrequisito indispensable.

### Cuadrante III: Negociar (Conflicto Cognitivo y de Motivos Mixtos)

- **Naturaleza de la Tarea:** Actividades conductuales que implican la resolución de conflictos de puntos de vista o de intereses . El objetivo es llegar a un consenso o a un acuerdo funcional.  
- **Condiciones Mínimas para el Éxito:** Se alcanza una resolución que evita el estancamiento.  
- **Vector de Optimización:** La resolución no es una mera concesión, sino una síntesis que integra las perspectivas en conflicto en un acuerdo superior. Esto exige una **sinergia** (Eje 4\) **Excepcional** para manejar el conflicto de forma constructiva. El **Artefacto** (Eje 2\) resultante (el acuerdo, el plan revisado) debe ser **Fuerte** para que sea fiable, y la **Alineación** (Eje 1\) **Fuerte** sobre los puntos en disputa es fundamental para el proceso.

### Cuadrante IV: Ejecutar (Competición y Desempeño)

- **Naturaleza de la Tarea:** Actividades conductuales y cooperativas centradas en la implementación de un plan o la realización de una tarea con un resultado tangible y medible .  
- **Condiciones Mínimas para el Éxito:** Se entrega un artefacto funcional que cumple con el plan.  
- **Vector de Optimización:** El artefacto entregado no solo funciona, sino que es de la más alta calidad, fiabilidad y eficiencia. En este cuadrante, el foco se desplaza por completo al resultado tangible. Por lo tanto, la integridad del **Artefacto** (Eje 2\) debe ser **Excepcional**. Un **Proceso** (Eje 3\) **Fuerte** es necesario para garantizar una ejecución eficiente y sin errores.

### Fase 2: Puntuación Anotada

- **Propósito:** Forzar un proceso de puntuación riguroso y transparente.  
- **Proceso:** Para cada KPI, el evaluador debe:  
  1. **Identificar Evidencia Textual:** Extraer citas directas de la transcripción.  
  2. **Aplicar Rúbrica Ordinal:** Asignar una calificación de una escala de 5 niveles con descriptores de nivel de desempeño (PLDs) y ejemplos ancla: `+2: Excepcional`, `+1: Fuerte`, `0: Esperado`, `-1: Bajo`, `-2: Inaceptable`.  
  3. **Justificar el Juicio:** Escribir una justificación estructurada: **Afirmación** (la calificación), **Evidencia** (las citas) y **Razonamiento** (la lógica que conecta la evidencia con la calificación, basándose en el modelo de argumentación de Toulmin).

### Fase 3: Síntesis y Visualización

- **Propósito:** Traducir las puntuaciones cualitativas en un resultado final unificado y comprensible.  
- **Proceso:**  
  1. **Cálculo Ponderado:** Se convierten las calificaciones ordinales a valores numéricos y se calcula el puntaje para cada eje según su perfil de prioridad.  
  2. **Generación del Perfil de Desempeño Kairós (PDK):** El resultado final es un informe unificado que contiene:  
     - **La Visualización Cuantitativa:** Un gráfico de araña que muestra la puntuación en cada uno de los cuatro ejes.  
     - **El Diagnóstico Cualitativo:** Una síntesis de los hallazgos más significativos, incluyendo el patrón de intervención dominante de la IA y la evidencia clave de sinergia (o su ausencia).
