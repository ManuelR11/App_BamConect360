# Guía para configurar MongoDB Atlas (GRATIS)

## Pasos para MongoDB Atlas:

1. **Crear cuenta**: Ve a https://www.mongodb.com/cloud/atlas
2. **Crear cluster gratuito**:
   - Elige el tier "M0 Sandbox" (GRATIS)
   - Región: Preferiblemente US East
3. **Configurar acceso**:
   - Database Access: Crea un usuario con contraseña
   - Network Access: Permitir acceso desde anywhere (0.0.0.0/0)
4. **Obtener connection string**:
   - Connect > Connect your application
   - Driver: Node.js
   - Copia la cadena de conexión

## Connection String example:

mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bamconect360?retryWrites=true&w=majority

## Límites GRATUITOS:

- 512 MB de almacenamiento
- Conexiones compartidas
- Perfecto para tu proyecto

## En Railway:

Agrega esta URL como variable de entorno MONGODB_URI
