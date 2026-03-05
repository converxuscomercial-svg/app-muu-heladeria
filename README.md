# MUU Heladería - App & PWA 🍦🌴

Plataforma "bien chimba" para la heladería MUU en La Punta Zicatela, Puerto Escondido. Funciona como Web y App instalable (PWA).

## 🚀 Tecnologías
- **Frontend:** React + Vite + TypeScript
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Estado:** Zustand
- **Backend:** Supabase (Auth, DB, Storage)
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React

## 🛠️ Instalación Local

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` con tus credenciales de Supabase:
   ```env
   VITE_SUPABASE_URL=tu_url_aqui
   VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
   ```
4. Correr en modo desarrollo:
   ```bash
   npm run dev
   ```

## 🗄️ Base de Datos (Supabase)

Para inicializar la base de datos, ejecuta el script SQL que se encuentra en `/.gemini/antigravity/brain/8ea4b709-9891-44d1-9d80-c9a2cf108f6c/database_schema.sql` (o pídeme el contenido si no lo ves) en el SQL Editor de tu Dashboard de Supabase.

## 📱 PWA
La aplicación está configurada para ser instalable. En móviles, selecciona "Añadir a la pantalla de inicio" para tener la experiencia de App nativa.

## 🎨 Identidad Visual
- **Azul Primario:** `#3A47CD`
- **Naranja Acento:** `#D06524`
- **Fondo Crema:** `#FFF7EF`
- **Tipografía:** Inter (Sans) & Outfit (Display)

---
Hecho con 💙 para MUU Heladería.
