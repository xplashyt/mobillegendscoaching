# Nexo Cinco

Landing de una página para vender coaching independiente de Mobile Legends: Bang Bang. Incluye siete fichas de entrenamiento, checkout propio con tarjeta y Wompi, consulta del estado del pago y webhook de confirmación.

## Puesta en marcha

1. Instala Node.js y ejecuta `npm install`.
2. Completa las cuatro llaves de `.env.local`.
3. Cambia `CORREO_CONTACTO` y `HORAS_DE_ENTREGA` en `lib/contacto.ts` por datos reales.
4. Cambia `metadataBase` en `app/layout.tsx` por el dominio real.
5. Ejecuta `npm run dev` y abre `http://localhost:3000`.

El proyecto corre de forma nativa en el sistema operativo. No requiere Docker, contenedores ni WSL.

## Llaves de Wompi

Las cuatro llaves salen del panel de Wompi y deben pertenecer al mismo ambiente:

- `NEXT_PUBLIC_WOMPI_PUBLIC_KEY`
- `WOMPI_PRIVATE_KEY`
- `WOMPI_INTEGRITY_SECRET`
- `WOMPI_EVENTS_SECRET`

Usa las cuatro llaves de pruebas o las cuatro de producción; no las mezcles. Con una llave pública `pub_test_`, una tarjeta real puede terminar en `ERROR` con un mensaje que indica que no se admite en Sandbox. Para cobrar tarjetas reales se requieren las cuatro llaves de producción.

Después de pegar las cuatro llaves en `.env.local`, detén y vuelve a iniciar `npm run dev`; no hay que modificar código. Next.js incorpora `NEXT_PUBLIC_WOMPI_PUBLIC_KEY` durante el build, así que en el hosting debes guardar las cuatro variables y volver a desplegar.

## Flujo del pago

1. El navegador solicita los enlaces vigentes de los contratos a `/api/wompi/acceptance`.
2. La tarjeta se cifra como JWE y se tokeniza directamente desde el navegador contra Wompi. El número y el CVC no pasan por este servidor.
3. `/api/wompi/pay` valida el plan desde la referencia, calcula el precio en el servidor, obtiene los dos tokens de aceptación y crea la transacción con la llave privada.
4. Si queda `PENDING`, el navegador consulta `/api/wompi/status/[id]` cada 2,5 segundos durante un máximo de cinco minutos.
5. El webhook verifica el checksum de Wompi y solo registra `[VENTA PAGADA]` cuando el estado es `APPROVED` y referencia, monto y moneda coinciden.

La URL de eventos de Wompi es única por comercio. Si varios proyectos comparten comercio, un solo receptor deberá distribuir los eventos; cada proyecto ignora referencias con otro prefijo. Lo recomendable es usar un comercio por proyecto.

## Estados y mensajes

- `DECLINED`: rechazo en alguna capa de la ruta de pago, como controles de Wompi, procesador o banco.
- `ERROR`: fallo de procesamiento; el mensaje concreto permite distinguir configuración, ambiente u otro problema.
- `WS05`: rechazo genérico de seguridad. No demuestra por sí solo falta de fondos ni fraude. La interfaz conserva el mensaje íntegro de Wompi y ofrece una explicación prudente.

El frontend muestra `status_message`, los mensajes de validación anidados y, cuando existe, `processor_response_code`. No los reemplaza por un aviso genérico.

## Entrega y operación manual

No hay proveedor de correo ni entrega automatizada. El vendedor revisa el panel de Wompi o la línea `[VENTA PAGADA]`, toma el correo del comprador y se comunica personalmente para coordinar la entrega. El plazo provisional es de 24 horas hábiles.

Antes de vender falta:

- Sustituir `contacto@nexocinco.co` por un correo real y ajustar el plazo de contacto.
- Configurar las cuatro llaves de producción y verificar un pago real controlado.
- Configurar y verificar el webhook público por HTTPS.
- Grabar y preparar el contenido ofrecido en cada ficha.
- Guardar ventas e idempotencia en almacenamiento persistente: el `Set` actual solo cubre una instancia y el log se pierde al reiniciar.
- Confirmar con Wompi la habilitación del flujo de tarjeta y, si aplica, 3D Secure.
- Revisar con asesoría jurídica la política de datos de la Ley 1581, la autorización para compradores menores y el retracto y la reversión de pago de la Ley 1480 aplicables al contenido digital.

## Dirección visual

La interfaz toma la forma de una sala de estrategia de cinco roles: tablero de tres líneas, fichas de posición, anillos de Turtle y Lord, llamadas de objetivo y una hoja de decisión para imprimir. La pieza firma y los separadores están construidos en SVG y CSS propios; no se usan logos, personajes, skins ni capturas oficiales.

La paleta usa niebla, cobalto, jade, oro de objetivo, rojo de alerta y tinta. `Kanit` se reserva para titulares y datos de juego; `Spline Sans`, para lectura continua.

## Identidad y juego limpio

Nexo Cinco usa una identidad propia. No se presenta como servicio oficial y no ofrece acceso a cuentas, boosting, joki, hacks, scripts, mods ni map hacks. El alumno juega; el coaching observa, explica y propone práctica. No se garantiza un rango específico.

Mobile Legends: Bang Bang y sus signos pertenecen a sus titulares. MOONTON Games no patrocina ni respalda este servicio.
