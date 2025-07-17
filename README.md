# CheckInn

## Objetivo
Solución digital para la gestión de productos en un entorno comercial, con un panel de administración privado y funcionalidades escalables.

---

## Funcionalidades Sprint 1
- Acceso a `/admin` solo desde desktop (no responsive, muestra mensaje en mobile).
- Vista de lista de productos (panel de administración).
- Eliminación de productos con confirmación (panel de administración).

---

## Tecnologías usadas
- **Frontend:** React + Vite
- **Backend:** Java + Spring Boot
- **Base de datos:** PostgreSQL
- **API de imágenes:** Cloudinary
- **Seguridad:** Spring Security (panel de administración)

---

## Paleta de colores y variables CSS

La paleta de colores y estilos globales se define en `/front/src/styles/variables.css` y se utiliza en todo el frontend mediante variables CSS. A continuación, la referencia real:

| Nombre variable         | Color         | Uso principal                |
|------------------------|--------------|------------------------------|
| --color-primary        | #234567       | Azul principal, headers      |
| --color-primary-dark   | #1a2e3b       | Azul oscuro, hover/fondos    |
| --color-secondary      | #00b894       | Verde acento, detalles       |
| --color-accent         | #ff9800       | Naranja, botones/acento      |
| --color-accent-light   | #ffd180       | Naranja claro, hover         |
| --color-error          | #e53935       | Rojo, errores/warnings       |
| --color-background     | #f4f6fb       | Fondo general app            |
| --color-white          | #ffffff       | Fondo tarjetas, modales      |
| --color-white-tint     | #f9fafc       | Fondo sutil, hover           |
| --text-dark            | #222831       | Texto principal              |
| --text-light           | #5a5a5a       | Texto secundario             |

**Tipografía:**
- `--font-main`: 'Inter', 'Segoe UI', Arial, sans-serif
- `--font-title`: 'Montserrat', 'Inter', Arial, sans-serif

**Espaciados y radios:**
- `--spacing-xs/sm/md/lg/xl`: 4/8/16/24/32px
- `--radius-sm/md/lg`: 4/8/12px

**Ejemplo de uso en CSS:**
```css
.element {
  background: var(--color-background);
  color: var(--color-primary);
  border-radius: var(--radius-md);
}
```

---

## Estructura del proyecto

```
/
├── back/        # Backend Java Spring Boot
├── front/       # Frontend React + Vite
├── README.md    # (este archivo)
```

---

## Instructivo para levantar el proyecto

### Backend (Spring Boot)
1. Clona el repositorio y entra a la carpeta `back`:
   ```bash
   cd back
   ```
2. Configura la base de datos y credenciales de Cloudinary en `src/main/resources/application.properties`.
3. Ejecuta:
   ```bash
   ./mvnw spring-boot:run
   ```
   o si tienes Maven global:
   ```bash
   mvn spring-boot:run
   ```
4. La API estará disponible en [http://localhost:8080](http://localhost:8080)

### Frontend (React + Vite)
1. En otra terminal, entra a la carpeta `front`:
   ```bash
   cd front
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Levanta el frontend:
   ```bash
   npm run dev
   ```
4. La app estará disponible en [http://localhost:5173](http://localhost:5173)

---

## Configuración de variables de entorno (.env)

Para mayor seguridad, las credenciales sensibles (base de datos y Cloudinary) se configuran mediante variables de entorno en un archivo `.env` ubicado en la carpeta `back/`.

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
2. Completa los valores reales en `.env` según tu entorno.
3. El archivo `.env` **no debe subirse al repositorio** (ya está en `.gitignore`).
4. El backend tomará automáticamente estas variables si usas un entorno compatible (por ejemplo, con [dotenv](https://github.com/cdimascio/dotenv-java) o configurando tu entorno de ejecución).

**Ejemplo de .env:**
```env
POSTGRES_URL=jdbc:postgresql://localhost:5432/checkinn
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_password
POSTGRES_DRIVER=org.postgresql.Driver
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

**No olvides completar y mantener seguro tu archivo `.env`.**

---

## Endpoints principales y ejemplos

### Productos públicos

#### Listar productos paginados y random
```http
GET /api/products?page=0&size=10
```
**Response:**
```json
{
  "content": [ { "id": "...", "name": "...", ... } ],
  "totalElements": 30,
  "totalPages": 3,
  "currentPage": 0,
  "seed": 123456789
}
```

#### Siguiente página (manteniendo el orden random)
```http
GET /api/products?page=1&size=10&seed=123456789
```

#### Detalle de producto
```http
GET /api/products/{id}
```
**Response:**
```json
{
  "id": "...",
  "name": "Producto X",
  "description": "...",
  "imageUrls": ["https://res.cloudinary.com/...jpg", ...]
}
```

#### Crear producto
```http
POST /api/products
Content-Type: multipart/form-data

name=Producto X
description=Descripción
y 5+ imágenes
```
**Response (201):**
```json
{
  "id": "...",
  "name": "Producto X",
  "description": "Descripción",
  "imageUrls": ["https://res.cloudinary.com/...jpg", ...]
}
```

---

### Administración (panel de admin)

#### Validar acceso al panel
```http
GET /api/admin/validate
```
**Response:**
```json
"OK"
```

#### Listar todos los productos (admin)
```http
GET /api/admin/products
```
**Response:**
```json
[
  { "id": "...", "name": "...", ... },
  ...
]
```

#### Eliminar producto
```http
DELETE /api/admin/products/{id}
```
**Response:**
- 204 No Content (si fue eliminado)
- 404 Not Found (si no existe)

---

## Seguridad
- Spring Security está configurado para proteger `/api/admin/*`, pero por ahora el acceso es libre hasta que se implemente login/JWT y roles.
- Cuando se implemente login, el frontend deberá enviar el JWT en el header `Authorization: Bearer <token>`.

---

## Seguridad de claves y configuración con .env

Para proteger tus claves de Cloudinary y otras credenciales sensibles, usa un archivo `.env` en la raíz del proyecto (no lo subas al repositorio, usa `.env.example` como plantilla).

Ejemplo de `.env`:
```
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

En `back/src/main/resources/application.properties` se usan estas variables así:
```
cloudinary.cloud_name=${CLOUDINARY_CLOUD_NAME}
cloudinary.api_key=${CLOUDINARY_API_KEY}
cloudinary.api_secret=${CLOUDINARY_API_SECRET}
```

### Cómo levantar el backend usando el .env

1. Copia `.env.example` a `.env` y completa tus claves reales.
2. Exporta las variables de entorno antes de levantar el backend:
   ```bash
   export $(cat .env | xargs)
   ./mvnw spring-boot:run
   ```
   o en Windows:
   ```cmd
   set CLOUDINARY_CLOUD_NAME=tu_cloud_name
   set CLOUDINARY_API_KEY=tu_api_key
   set CLOUDINARY_API_SECRET=tu_api_secret
   mvnw spring-boot:run
   ```
3. Si usas un IDE, configura las variables de entorno en la configuración de ejecución.

> **Importante:** Nunca subas tu archivo `.env` con claves reales al repositorio público.

---

## Generación masiva de productos
Puedes usar el script Python `generate_products.py` para poblar la base de datos vía la API. Las imágenes se suben automáticamente a Cloudinary.

---

## Bitácora de desarrollo
- Sprint 1: Estructura base, integración backend-frontend, panel de administración, paginación random, eliminación de productos, subida de imágenes a Cloudinary.
- Próximos pasos: Autenticación JWT, roles, registro de usuarios, mejoras de UI/UX.

---

Para dudas o mejoras, contacta al equipo de desarrollo. 

---

## Flujos y funcionalidades clave del frontend

### Estructura visual y navegación
- **Header:** Fijo en la parte superior, con logo, lema y botones “Crear cuenta” e “Iniciar sesión” (sin funcionalidad). Navegación al home al hacer clic en el logo/lema. Consistente en todas las páginas.
- **Footer:** Fijo en la parte inferior, con isologotipo, año y copyright.
- **Main:** Fondo acorde a la identidad de marca, bloques de buscador, categorías y recomendaciones.
- **Panel de administración:** Menú lateral con acceso a “Lista de productos” y “Crear producto”. Solo disponible en desktop (ancho ≥ 1024px), muestra mensaje en mobile.

### Alta de producto (panel de administración)
- Acceso desde el menú lateral “Crear producto”.
- Formulario con campos: nombre, descripción e imágenes.
- Validaciones visuales y amigables: errores personalizados debajo de cada campo, aparecen al salir del campo o al enviar el formulario.
- Permite subir una o más imágenes.
- Feedback visual de éxito tras crear el producto.

### Paginación y aleatoriedad en el home
- El home muestra hasta 10 productos aleatorios por página.
- Los productos no se repiten y el orden es realmente aleatorio (usando seed del backend).
- Controles de paginación permiten navegar entre páginas, ir al inicio o al final.

### Galería de imágenes de producto
- Cada producto puede tener hasta 5 imágenes visibles en la ficha.
- La imagen principal se muestra a la izquierda, las secundarias en grilla a la derecha.
- El botón “Ver más” abre una galería modal para ver todas las imágenes.
- Componente responsivo para desktop, tablet y mobile.

### Eliminación de producto
- En el panel de administración, cada producto tiene un botón de eliminar.
- Al hacer clic, aparece un modal de confirmación con el nombre del producto.
- Si se confirma, el producto se elimina de la base de datos y desaparece del listado.
- Se muestra un cartel visual de éxito con animación.

### Decisiones de UX y limitaciones
- El panel de administración solo está disponible en desktop (ancho ≥ 1024px). En mobile/tablet se muestra un mensaje de no disponibilidad.
- El header y el footer son fijos y visibles en todas las páginas.
- El diseño es completamente responsive excepto el panel admin, que es solo desktop.
- Los botones “Crear cuenta” e “Iniciar sesión” en el header no tienen funcionalidad (placeholder).
- Todos los formularios muestran errores visuales y amigables, con animación y diseño moderno.

---

## Pruebas realizadas (manuales)

Se validó manualmente el cumplimiento de las historias de usuario y flujos principales:

- Navegación entre páginas y persistencia del header/footer.
- Visualización y paginación de productos en el home.
- Acceso y uso del panel de administración solo en desktop.
- Alta de producto: validación de campos, subida de imágenes, manejo de errores visuales.
- Eliminación de producto: confirmación, feedback visual y actualización de la lista.
- Visualización de detalle y galería de imágenes de producto.
- Comprobación de responsividad en desktop, tablet y mobile (excepto admin).
- Verificación de la paleta de colores y tipografías según la identidad de marca. 