# Manual de uso del sitio UFP

Cómo mantener el sitio con información real. **No hay panel de administración**: el contenido vive en archivos TypeScript dentro de `src/data/` que funcionan como un CMS. La regla de oro:

> **Editar un archivo de datos → commit → push → deploy.** Nunca hace falta tocar componentes ni páginas para cambiar contenido.

Todos los archivos de datos tienen tipos estrictos: si te falta un campo o te equivocas en un nombre, `npm run build` (o el editor) te lo marca antes de publicar. Para previsualizar cambios en vivo: `npm run dev` y abre http://localhost:3000.

## Mapa del contenido

| Quiero cambiar…                                  | Archivo                                    |
| ------------------------------------------------ | ------------------------------------------ |
| Eventos, carteleras, boletos, resultados          | `src/data/events.ts`                       |
| Peleadores (récord, bio, historial, videos)       | `src/data/fighters.ts`                     |
| Rankings y libra por libra                        | `src/data/rankings.ts`                     |
| Divisiones de peso                                | `src/data/divisions.ts`                    |
| Productos de la tienda                            | `src/data/products.ts`                     |
| Paquetes de patrocinio                            | `src/data/sponsors.ts`                     |
| Email de contacto, mensajes del ticker, copyright | `src/data/site.ts`                         |
| Textos fijos de la interfaz (botones, títulos)    | `src/i18n/messages/es.json` y `en.json`    |
| Marcas, destinos y ubicaciones comerciales        | `src/data/sponsors.ts`                     |

**Idiomas**: todo texto de contenido traducible es un objeto `{ es: "...", en: "..." }`. Los nombres de marca (títulos de evento como "Sangre Nueva", apodos) van como string simple y **no se traducen**.

---

## 1. Ciclo de vida de un evento (la operación más frecuente)

### Crear el próximo evento (ej. UFP 18)

Agrega un objeto al inicio del array en `src/data/events.ts`:

```ts
{
  slug: "ufp-18",                          // define la URL: /evento/ufp-18
  number: 18,
  published: true,                        // false mantiene el evento fuera del sitio
  title: "Nombre Del Evento",              // marca, no se traduce
  status: "upcoming",
  date: "2026-11-21T20:00:00-05:00",       // fecha/hora real CON zona horaria — mueve el countdown
  venue: { name: "...", address: {es, en}, capacity: 20500, doorsOpen: "17:00", broadcast: {es, en} },
  schedule: [ { time: "17:00", label: {es: "Puertas", en: "Doors"} }, ... ],
  fights: [ ...ver abajo... ],
  tickets: [
    { id: "general", zone: "General", price: 30000, currency: "COP", perks: {es, en} },
    // featured: true destaca la zona; soldOut: true la marca agotada
  ],
}
```

El título es opcional: omítelo si el evento solo se llama “UFP 7”. El nombre público se arma con `formatEventName()`. Los eventos `published: true` conservan su URL al pasar a históricos, independientemente de la bandera de resultados. Los ejemplos permanecen con `published: false`.

Para flyers con pie desactualizado, `posterAspectRatio` define la porción superior visible (por ejemplo, `"1024 / 1180"`). El original se conserva. Los cruces sin `poster` aparecen como tarjetas de texto.

Cada pelea (`fights`) tiene dos esquinas `red` y `blue`:

- **Peleador del roster**: `{ slug: "marco-rios", name: "Marco Ríos", tag: {es: "CAMPEÓN", en: "CHAMPION"} }` — el récord y el link al perfil salen solos del roster.
- **Rival externo** (no tiene perfil): `{ name: "John Doe", recordText: "14-2-0" }` — solo nombre y récord.

`order: 0` es la pelea estelar (alimenta el hero de la home y el tale of the tape).

**Con solo agregar ese objeto**: la home apunta su countdown y cartelera al nuevo evento, se crea `/evento/ufp-18` en ambos idiomas, entra al sitemap y se genera su imagen para redes sociales. El **ticker** también deriva el anuncio del próximo evento automáticamente. `src/data/site.ts` contiene únicamente las frases generales.

### Cerrar un evento cuando ya pasó

En el mismo objeto: cambia `status: "upcoming"` → `"past"`, agrega `result` a cada pelea y el `highlight` del evento:

```ts
result: {
  winner: "red",                                   // "red" | "blue" | null (empate)
  method: { es: "KO — golpes", en: "KO — punches" },
  round: 3,
  time: "2:14",
  summary: { es: "Ríos vence a Herrera por KO — R3", en: "Ríos beats Herrera by KO — R3" },
},
```

La fecha real también archiva automáticamente el evento (sin countdown ni compra de boletos). Su URL sigue disponible con `published: true`. Agrega resultados solo cuando estén confirmados; la sección "Resultados" de inicio continúa oculta mientras `results` sea `false`.

### Después de cada evento, además:

1. **Peleadores** (`fighters.ts`): actualiza `record` de cada participante y agrégale la pelea a su `history`.
2. **Rankings** (`rankings.ts`): ver siguiente sección.

## 2. Rankings (la página insignia)

En `src/data/rankings.ts`, tras cada evento:

1. Cambia `rankingsUpdatedAt` a la fecha de la actualización (`"2026-08-16"`) — es el sello de "Última actualización" que da credibilidad oficial a la página.
2. Reordena `poundForPound` y los `contenders` de cada división en `divisionRankings`.
3. El campo `movement` de cada peleador indica el cambio **respecto a la lista anterior**: `2` = subió dos (▲2 verde), `-1` = bajó uno (▼1 rojo), `0` = igual (—), `"new"` = debuta en el ranking (badge NEW).
4. `championSlug: null` muestra "TÍTULO VACANTE"; `defenses` es el número de defensas del campeón actual.

Los retadores que no están en el roster van sin `slug` (solo `name` + `record` como texto). Cada división tiene ancla compartible: `ufpcombat.com/rankings#mma-welter`.

## 3. Peleadores

Agregar un peleador = un objeto en `src/data/fighters.ts`. Campos clave:

- `slug` define la URL (`/peleador/nombre-apellido`) — no lo cambies después de publicar (rompería links compartidos).
- `divisionId` debe existir en `divisions.ts`.
- `shortName` es como aparece en cartelera y cards (ej. `'"El Verdugo" Ríos'`).
- `history` alimenta la tabla de historial (G/P/E con colores); si el rival o el evento tienen `opponentSlug`/`eventSlug`, se convierten en links.
- `videos` son los "Mejores momentos" — hoy con `url` opcional; cuando tengas los clips reales, agrega la URL.

## 4. Imágenes reales (fotos, logos, mapas)

Los flyers confirmados ya están publicados. Donde falten piezas individuales se usan tarjetas de texto; los modelos de peleadores y tienda conservan sus placeholders dentro de secciones apagadas. Para agregar imágenes reales:

1. Coloca el archivo en `public/`, organizado, ej.: `public/fighters/marco-rios-full.jpg`, `public/products/playera-ufp-17.jpg`.
2. Referéncialo en el dato correspondiente (la ruta es desde `public/`, empezando con `/`):
   - Peleador: `photoFull: "/fighters/marco-rios-full.jpg"` (perfil, vertical ~2:3) y `photoBust: "/fighters/marco-rios-bust.jpg"` (cards, cuadrada).
   - Producto: `image: "/products/playera-ufp-17.jpg"`.
   - Arena: `venue.mapImage`.
3. El placeholder desaparece automáticamente y la foto se sirve optimizada.

Recomendación: JPG/WebP ≤ 300 KB por foto; las fotos de peleador lucen mejor recortadas sobre fondo oscuro (el diseño ya pone el glow rojo detrás).

## 5. Tienda y patrocinadores

- **Productos** (`products.ts`): `category` es `"apparel" | "accessories" | "collectible"` (alimenta el filtro). La home muestra los primeros 4 del array. El carrito es real (persiste en el navegador) pero el checkout dice "próximamente" — cobrar de verdad requiere integrar Stripe/MercadoPago después.
- **Patrocinadores** (`sponsors.ts`): 14 marcas y tres paquetes digitales: Aliado digital (`presencia`, $200.000 COP), Marca destacada (`destacada`, $450.000 COP) y Presentador digital (`presenta`, $900.000 COP). Son pagos únicos por campañas de 30 días, con fecha de inicio acordada y sin renovación automática. Los valores y duración viven en `sponsors.ts`; no incluyen redes ni activaciones físicas. Completa `logo`, `description: {es, en}` y `url` (destino HTTPS oficial confirmado) cuando tengas esos datos. Sin URL, la ficha no es un enlace.
- Asigna `tierId` **solo tras acordar el espacio comercial**. `destacada` habilita la ficha editorial junto a la cartelera; `presenta` también habilita la identificación en el encabezado. Sin `tierId`, las marcas tienen igual tratamiento. `eventSlugs` restringe una marca a ediciones concretas; omítelo para aliados generales de UFP.
- Las propuestas abren `/patrocinadores?paquete=destacada#contacto` (o el identificador correspondiente), con el formulario preseleccionado. También hay contacto por WhatsApp. Las activaciones físicas se cotizan por separado.
- No hay sistema de medición ni reportes de rendimiento en esta entrega.

## 6. Formularios (inscripción y patrocinio)

Los formularios validan con zod y usan `src/lib/email.ts` para registrar y enviar las solicitudes por Resend. La configuración vive en variables de entorno (ver `.env.example`); sin configurar el correo, el comportamiento local es solo registro. No hay que guardar direcciones personales ni credenciales en el repositorio.

El formulario de patrocinio acepta únicamente los tres paquetes publicados y envía su nombre junto al evento próximo. La entrega por correo es de mejor esfuerzo: un fallo del proveedor no bloquea una solicitud válida. Para revisar la entrega en producción, consulta los logs del servicio web y la configuración de Resend según `DEPLOY.md`.

## 7. Publicar

```bash
# 1. Verifica en local (opcional pero recomendado)
npm run build

# 2. Sube y despliega
git add -A && git commit -m "UFP 18 anunciado" && git push
VPS_HOST=usuario@IP ./deploy.sh
```

En ~2–3 minutos el cambio está en ufpcombat.com. Si el build falla, el sitio anterior sigue en línea — no hay riesgo de tumbar la página con un error de dedo.

---

**El día que el volumen lo amerite** (alguien no-técnico editando contenido), el sitio está preparado para conectarse a un CMS con panel visual: solo se reescriben los selectores de `src/data/index.ts` para leer del CMS en vez de estos archivos. Nada del diseño ni de las páginas cambia.
