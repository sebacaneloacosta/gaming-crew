import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Ruta pública para sign-in, sign-up y webhooks
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/webhooks(.*)',  // Agregar esta línea para permitir rutas de webhooks públicas
]);

export default clerkMiddleware(async (auth, request) => {
  // No proteger si es una ruta pública
  if (!isPublicRoute(request)) {
    await auth.protect() // Aplica protección de Clerk solo en rutas no públicas
  }
});

export const config = {
  matcher: [
    // Ignorar las rutas internas de Next.js y archivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre ejecutar para rutas API
    '/(api|trpc)(.*)',
  ],
};
