# CheckInn Backend

API REST para la gestión de productos y subida de imágenes.

## Tecnologías
- Java 17
- Spring Boot 3
- PostgreSQL / H2
- Swagger (OpenAPI)
- Cloudinary (opcional para imágenes)

## Estructura de carpetas
- `controller/` - Controladores REST
- `service/` - Lógica de negocio y servicios
- `repository/` - Acceso a datos
- `model/` - Entidades JPA
- `dto/` - Objetos de transferencia de datos
- `exception/` - Manejo de errores

## Levantar el proyecto
1. Clona el repositorio
2. Configura la base de datos en `src/main/resources/application.properties`
3. Ejecuta:
   ```
   ./mvnw spring-boot:run
   ```
4. Accede a la documentación interactiva en:
   - [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## Configuración importante
- Cambia la ruta de uploads en `application.properties`:
  ```
  file.upload-dir=uploads/
  ```
- Cambia el tamaño máximo de archivos:
  ```
  spring.servlet.multipart.max-file-size=5MB
  spring.servlet.multipart.max-request-size=30MB
  ```
- Configura la base de datos según el entorno (dev/prod)

## Ejemplo de request/response
### Crear producto
**Request:**
```
POST /api/products
Content-Type: multipart/form-data

name=Producto X
description=Descripción
y 5+ imágenes
```
**Response (201):**
```
{
  "id": "...",
  "name": "Producto X",
  "description": "Descripción",
  "imageUrls": ["/api/uploads/imagen1.jpg", ...]
}
```

### Error ejemplo
```
{
  "timestamp": "2024-06-10T12:00:00",
  "code": "NOT_FOUND",
  "message": "Producto no encontrado"
}
```

## Generación masiva de productos
Puedes usar el script Python `generate_products.py` (a crear) para poblar la base de datos vía la API.

## Subida de imágenes a la nube
Se recomienda usar Cloudinary. Configura tus credenciales en variables de entorno y adapta el servicio de archivos.

---

Para dudas o mejoras, contacta al equipo de desarrollo. 