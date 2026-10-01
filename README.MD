# 📚 Biblioteca CRUD — CLI

> Trabajo práctico del **Curso Backend de la UTN**.
> Simula el CRUD de una biblioteca desde la terminal, usando el driver nativo de MongoDB + TypeScript.

---

## 📖 Descripción

Este proyecto implementa un **CRUD (Create, Read, Update, Delete)** por línea de comandos sobre una base de datos MongoDB. Los comandos se reciben vía `process.argv` y se ejecutan contra la colección `libros`.

El objetivo es demostrar el entendimiento de:

- Conexión a MongoDB con el **driver nativo** (`MongoClient`).
- Manejo de **variables de entorno** con `dotenv`.
- **Tipado estático** en TypeScript con interfaces.
- **Compilación** de TS a JS y ejecución del bundle final.
- Uso de **módulos ES** (`"type": "module"`).

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) | Entorno de ejecución (ESM) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | Tipado estático y compilación |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white) | Base de datos NoSQL (driver nativo) |
| `dotenv` | Gestión de variables de entorno |

---

## 📂 Estructura del proyecto

```
bibliotecaCrudUtn/
├── src/
│   └── index.ts          # Código fuente principal
├── dist/                 # Código compilado (generado con npm run build)
├── .env                  # Variables de entorno (NO se sube al repo)
├── .env.example          # Plantilla de variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📋 Entidad `ILibro`

Cada documento en la colección `libros` tiene la siguiente forma:

```typescript
interface ILibro {
  _id?: ObjectId;   // generado por MongoDB
  titulo: string;
  autor: string;
  precio: number;
  stock: number;
}
```

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/jaimvizalla/bibliotecaCrudUtn.git
cd bibliotecaCrudUtn
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Creá un archivo `.env` en la raíz, copiando el ejemplo:

```bash
cp .env.example .env
```

Contenido esperado:

```env
URI_DB=mongodb://localhost:27017/
DB_NAME=bibliotecaCrudUTN
```

> 💡 Si usás **MongoDB Atlas**, reemplazá `URI_DB` por tu cadena `mongodb+srv://...`.

### 4. Compilar TypeScript

```bash
npm run build
```

Esto genera la carpeta `dist/` con el JavaScript listo para ejecutar.

---

## 🚀 Comandos disponibles

Todos los comandos se ejecutan con `node ./dist/index.js` seguido de la operación y sus argumentos.

### ➕ Crear un libro

```bash
node ./dist/index.js create "<titulo>" "<autor>" <precio> <stock>
```

**Ejemplo:**

```bash
node ./dist/index.js create "El Principito" "Antoine de Saint-Exupéry" 15000 10
```

**Salida esperada:**

```
Libro creado exitosamente con ID: 650f1a2b3c4d5e6f7a8b9c0d
```

---

### 📖 Leer todos los libros

```bash
node ./dist/index.js read
```

**Salida esperada:** tabla con todos los libros de la colección.

---

### ✏️ Actualizar un libro por ID

```bash
node ./dist/index.js update <id> "<nuevo_titulo>" "<nuevo_autor>" <nuevo_precio> <nuevo_stock>
```

**Ejemplo:**

```bash
node ./dist/index.js update 650f1a2b3c4d5e6f7a8b9c0d "El Principito" "Antoine de Saint-Exupéry" 18000 15
```

---

### 🗑️ Eliminar un libro por ID

```bash
node ./dist/index.js delete <id>
```

**Ejemplo:**

```bash
node ./dist/index.js delete 650f1a2b3c4d5e6f7a8b9c0d
```

---

## 🧪 Flujo rápido de prueba

```bash
# 1. Compilar
npm run build

# 2. Crear un libro
node ./dist/index.js create "El Principito" "Antoine de Saint-Exupéry" 15000 10

# 3. Leer todos
node ./dist/index.js read

# 4. Actualizar (usar el ID devuelto por create)
node ./dist/index.js update <id> "El Principito" "Antoine de Saint-Exupéry" 18000 15

# 5. Eliminar
node ./dist/index.js delete <id>
```

## 👤 Autor

**Jaim Vizalla**
Repositorio: [github.com/jaimvizalla/bibliotecaCrudUtn](https://github.com/jaimvizalla/bibliotecaCrudUtn)

---

## 📄 Licencia

ISC