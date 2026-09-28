# Zentraf Coffee — web de demostración de la agencia Zentraf

**Publicada en:** https://zentraf-official.github.io/zentraf-coffee/
**Qué es:** una web de ejemplo **inventada** (cafetería en Zúrich) para enseñar cómo trabajamos.
**No es un cliente.** Lleva `noindex, nofollow` y un cartel en el pie que lo dice:
*«Demo von Zentraf — Beispielprojekt, keine echte Bäckerei/Kaffeerösterei»*.

---

## 1 · De dónde sale la estructura

El socio eligió la primera plantilla de `https://www.webild.io/templates`: **`coffee-shop`**
(la demo de verdad vive dentro de un iframe: `https://webild-components-version-4.vercel.app/components/templates/coffee-shop`).
Se abrió con Chrome de verdad, se recorrió entera y **se midió bloque a bloque** (5.640 px, 5 secciones + pie).

**Se copió la estructura y el ritmo, nada más.** Ni una línea de su código, ni un texto, ni una foto, ni su paleta
(ellos van en crema y marrón con una tipografía manuscrita; aquí todo es blanco, gris y negro con el azul zen `#3E7BFA`
y una sola familia, **Inter**, según `ZENTRAF-DISENO.md`).

| Bloque de la plantilla | En nuestra web | Qué cambia |
|---|---|---|
| Barra + portada con el nombre gigante, texto a la derecha, 2 botones y una foto con 2 tarjetas flotantes | `hero` | nuestras fotos, nuestro azul, Inter |
| Interludio casi vacío con un titular corto y 2 botones (y fotos que siguen al ratón) | `interludio` | **el «cursor trail» de fotos se quedó fuera**: movimiento solo cuando lo provoca el usuario, y en móvil quieto |
| Carta con chips de filtro y rejilla de fotos con etiqueta | `karte` | 14 productos suizos con precio en CHF (precios inventados) |
| Bento de eventos y catering (foto + título + texto) | `feiern` | Private Feiern · Catering · Eigene Zusammenstellung |
| Tarjeta clara con tres círculos de contacto | `besuch` | teléfono, e-mail y cómo llegar **+ horario y dirección como bloque propio** (la plantilla solo los tenía como enlaces del pie: una cafetería suiza sin horario visible no sirve) |
| Pie oscuro con el nombre gigante y tres columnas | `pie` | + el aviso de demo |
| — | `rechtliches` | **añadido por norma de la casa**: Impressum, Datenschutz y Bildnachweis visibles en el pie |

## 2 · Archivos

```
index.html          la web entera (una sola página, con anclas)
styles.css          el sistema de diseño (tokens de ZENTRAF-DISENO.md)
app.js              carga, aparición al entrar, filtro de la carta y las tarjetas flotantes
assets/img/         23 fotos (todas CC0, ver LICENCIAS-IMAGENES.md)
assets/fuentes/     Inter 400 y 600 (.woff2) servida desde aquí + su licencia OFL
assets/favicon.svg  nuestro icono (taza) · favicon-32.png · apple-touch-icon.png
assets/og-image.jpg imagen para compartir (1200×630)
sitemap.xml · robots.txt
capturas/           capturas de la web PUBLICADA (escritorio, móvil 390, sin JavaScript, carga a media animación)
LICENCIAS-IMAGENES.md   la licencia de cada foto, comprobada una por una
herramientas/       og.html y favicon.html (con lo que se generaron la imagen de compartir y los iconos)
```

## 3 · Cómo se comprueba

- **Revisor de webs de la agencia, sobre la URL publicada:** 23/23 en verde, 0 avisos, carga en **1.036 ms**.
- Sin JavaScript se ve **todo** (la capa de carga no existe sin JS y se apaga sola: error R23).
- Móvil 390: sin scroll horizontal y sin botones pequeños.
- Sin librerías externas, sin cookies, sin medición, sin formulario.
- `node --check app.js` limpio · ninguna imagen rota · todas con `alt`.

## 4 · Cómo se publica (para repetirlo)

```bash
cd zentraf-coffee
git add -A && git commit -m "..."
git -c credential.helper= push "https://x-access-token:$ZENTRAF_GH_TOKEN@github.com/Zentraf-official/zentraf-coffee.git" main
```
El token **solo va en la URL del push** (nunca en `.git/config`: el remoto guardado es la URL limpia).
La web se publica con GitHub Pages desde la rama `main`, carpeta raíz.
