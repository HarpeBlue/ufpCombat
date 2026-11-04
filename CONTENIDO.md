# Lo que nos falta

El sitio está **EN VIVO en https://ufpcombat.com** (producción, indexable). Todo lo que se
muestra es real; las secciones que aún corren sobre datos de relleno están **apagadas** por
flag (`src/data/features.ts`) — sus rutas dan 404 y no salen en el sitio ni en el sitemap.
Se encienden apenas tengan contenido real. Nada falso está publicado.

---

## Actualización UFP 7 (preparada en el repositorio)

- **UFP 7**: 5 de diciembre de 2026, 7:00 p. m., Gimnasio Jumper Fit, Cra. 10 #16-32, barrio Antonio Ricaurte, Granada, Meta.
- **11 combates** según `cartelera.jpeg`, incluyendo Leo Wi vs. Morroco por título nacional y el encuentro MMA 2 vs. 2 de 66 kg.
- **8 flyers asociados**: se muestran con el pie anterior recortado visualmente. Los archivos originales se conservan; la cartelera definitiva prevalece sobre nombres, sede y horarios de flyers anteriores.
- **Boletas**: General $30.000, VIP $50.000 y Palco $100.000 COP. Sin capacidades ni beneficios adicionales confirmados.
- **UFP 6** se conserva en `/evento/ufp-6`, sin venta activa ni resultados inventados.
- **14 aliados** conservados, con vitrina propia y tres paquetes digitales con precios de lanzamiento. Ninguna marca tiene una categoría comercial asignada todavía.
- **Formularios**: continúan con la entrega por correo existente; el paquete de patrocinio se preselecciona desde su CTA.

## 1. Pendientes de contenido

- Logos, descripciones y destinos oficiales de cada patrocinador. No se buscan ni se inventan perfiles.
- Flyer de la estelar y de los otros dos cruces sin pieza individual. Se presentan con texto.
- “La Mole vs. La Bala Palacios” queda fuera: no aparece en la cartelera definitiva.
- Opcionales: capacidad del recinto, asaltos, horarios individuales, transmisión y beneficios por zona. Hoy se omiten.
- Resultados reales de UFP 6 y de futuras ediciones. El archivo puede publicarse sin resultados.

## 2. Secciones apagadas (encender cuando haya contenido real)

Cada una se enciende con una línea en `src/data/features.ts`.

**Tienda** — no hay mercancía. Cuando la haya: nombre, precio COP, categoría, foto, tallas y
stock por producto. Y definir cómo se cobra: pasarela (Wompi, Bold, Mercado Pago) o pedidos
por WhatsApp. Hoy el carrito suma pero no cobra.

**Peleadores (roster)** — los 13 son inventados. Por cada peleador real: nombre, apodo,
disciplina y división, récord (V–D–E + KO/TKO y sumisiones), estatura, alcance, edad, peso,
guardia, gimnasio y ciudad, año de debut, si es campeón o su ranking, e historial (rival,
resultado, método, asalto, fecha, evento). También confirmar las 6 divisiones de peso.

**Rankings** — dependen del roster: campeones por división y defensas, top 10 de retadores,
libra por libra, y fecha de actualización.

**Resultados** — UFP 3, 4 y 5 siguen como ejemplos con `published: false`. Para registrar resultados reales: por cada uno real, número, nombre,
fecha, sede y resultados con método y asalto.

## 3. Correo de marca `contacto@ufpcombat.com`

Pendiente. Opciones **gratis** (sin mensualidad): **Cloudflare Email Routing** (reenvía a tu
Gmail) o **Zoho Mail free** (buzón propio). **No** auto-hospedar en la VPS (Hostinger bloquea
el puerto 25 + mala entregabilidad). Para que el sitio envíe desde la marca: verificar el
dominio en Resend y llenar `SUBMISSIONS_FROM`. Hoy los formularios salen con remitente
`onboarding@resend.dev`.

## 4. Fotos que faltan

| Qué | Cuántas | Formato |
| --- | --- | --- |
| Logo oficial de UFP | 1 | SVG o PNG transparente |
| Logos de patrocinadores | 1 por marca | PNG transparente |
| Monasterio Club | 1 | horizontal, mín. 1600×900 |
| Peleadores del roster (cuerpo y retrato) | 2 por peleador | vertical 800×1200 + cuadrada 600×600 |
| Productos de la tienda | 1 por producto | cuadrada, mín. 800×800 |

## 5. Pendientes menores

- Números reales de alcance/seguidores/asistencia para la pizarra de patrocinios (se quitó a
  propósito hasta tenerlos; vuelve apenas los pases).
- Descripción real de UFP y requisitos para inscribirse como peleador.
- Redes sociales (el sitio no tiene ninguna todavía).
- Paquetes de patrocinio con precio real, y el kit en PDF si existe.
- Política de tratamiento de datos — la Ley 1581 la exige y ya hay dos formularios recogiendo datos.
- Traducción al inglés de todo lo anterior (no se traducen nombres propios, apodos ni nombres de eventos).
