<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Ecomerce — README</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; line-height:1.6; padding:24px; max-width:900px; margin:0 auto; color:#222; }
    h1,h2,h3 { color:#111; }
    pre { background:#f6f8fa; padding:12px; overflow:auto; border-radius:6px; }
    code { background:#f0f0f0; padding:2px 6px; border-radius:4px; }
    ul { margin-left:1.2rem; }
    .section { margin-bottom:24px; }
    .badge { font-size:0.85em; color:#666; }
  </style>
</head>
<body>
  <header class="section">
    <h1>Ecomerce</h1>
    <p class="badge">Aplicación de ejemplo tipo e-commerce con Node.js/Express y MongoDB Atlas (mongoCloud). Incluye autenticación, carrito y pagos mediante PayPal.</p>
  </header>

  <section class="section">
    <h2>Características principales</h2>
    <ul>
      <li>Listado y gestión básica de productos</li>
      <li>Registro e inicio de sesión de usuarios (JWT + hashing con bcrypt)</li>
      <li>Carrito de compra y creación de pedidos</li>
      <li>Integración de pagos con PayPal (sandbox y producción)</li>
      <li>Persistencia en MongoDB Atlas (mongoCloud)</li>
      <li>API REST organizada para frontend o clientes móviles</li>
    </ul>
  </section>

  <section class="section">
    <h2>Tecnologías</h2>
    <ul>
      <li>Backend: Node.js + Express</li>
      <li>Base de datos: MongoDB Atlas (mongoCloud)</li>
      <li>Autenticación: JWT (JSON Web Tokens) y bcrypt</li>
      <li>Pagos: PayPal REST (Checkout / Orders API)</li>
      <li>Herramientas: dotenv, mongoose, nodemon (en desarrollo)</li>
    </ul>
  </section>

  <section class="section">
    <h2>Requisitos</h2>
    <ul>
      <li>Node.js ≥ 16</li>
      <li>NPM o Yarn</li>
      <li>Cuenta en MongoDB Atlas (mongoCloud)</li>
      <li>Cuenta de desarrollador de PayPal (para obtener Client ID / Secret)</li>
    </ul>
  </section>

  <section class="section">
    <h2>Instalación local</h2>
    <ol>
      <li>Clona el repositorio:
        <pre><code>git clone https://github.com/Alejandro2005DAM/Ecomerce.git
cd Ecomerce</code></pre>
      </li>
      <li>Instala dependencias:
        <pre><code>npm install
# o
yarn</code></pre>
      </li>
      <li>Crea un archivo <code>.env</code> en la raíz con las variables necesarias (ejemplo abajo).</li>
      <li>Ejecuta la app en modo desarrollo:
        <pre><code>npm run dev
# o
yarn dev</code></pre>
      </li>
      <li>La API normalmente quedará disponible en <code>http://localhost:3000</code> (o el puerto que configures).</li>
    </ol>
  </section>

  <section class="section">
    <h2>Variables de entorno (.env)</h2>
    <p>Crea un <code>.env</code> con estas variables (ajusta nombres según la implementación real):</p>
    <pre><code>PORT=3000
MONGODB_URI=mongodb+srv://&lt;usuario&gt;:&lt;password&gt;@cluster0.mongodb.net/ecomerce?retryWrites=true&amp;w=majority
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=7d

# PayPal
PAYPAL_CLIENT_ID=tu_paypal_client_id
PAYPAL_CLIENT_SECRET=tu_paypal_client_secret
PAYPAL_MODE=sandbox   # "sandbox" o "live"</code></pre>
    <p><small>MONGODB_URI: Cadena de conexión de MongoDB Atlas. Sustituye <code>&lt;usuario&gt;</code> y <code>&lt;password&gt;</code> por tus credenciales. PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET: creadas en el <a href="https://developer.paypal.com/" target="_blank" rel="noopener">Dashboard de PayPal Developer</a>.</small></p>
  </section>

  <section class="section">
    <h2>Configurar PayPal (rápido)</h2>
    <ol>
      <li>Entra en <a href="https://developer.paypal.com/" target="_blank" rel="noopener">developer.paypal.com</a>.</li>
      <li>Crea una aplicación en "My Apps &amp; Credentials".</li>
      <li>Copia <strong>Client ID</strong> y <strong>Secret</strong> y ponlos en tu <code>.env</code>.</li>
      <li>En desarrollo usa <code>PAYPAL_MODE=sandbox</code>. En producción usa <code>PAYPAL_MODE=live</code> y credenciales reales.</li>
      <li>Flujo básico:
        <ul>
          <li>Crear orden en el servidor (<code>/api/paypal/create-order</code>) con la suma a pagar.</li>
          <li>Enviar al cliente la info para completar el pago con PayPal Checkout.</li>
          <li>Capturar/comprobar la orden en el servidor (<code>/api/paypal/capture-order</code>) y crear el pedido en la base de datos.</li>
        </ul>
      </li>
      <li>Opcional: configura webhooks para recibir notificaciones automáticas (pagos completados, reembolsos, etc.).</li>
    </ol>
  </section>

  <section class="section">
    <h2>Endpoints (ejemplos)</h2>
    <p>Los paths pueden variar según la implementación real. Ajusta si tu código usa otros nombres.</p>
    <ul>
      <li><strong>Auth</strong>
        <ul>
          <li>POST <code>/api/auth/register</code> — Registro de usuario (Body: <code>{ name, email, password }</code>)</li>
          <li>POST <code>/api/auth/login</code> — Login (devuelve JWT) (Body: <code>{ email, password }</code>)</li>
        </ul>
      </li>
      <li><strong>Productos</strong>
        <ul>
          <li>GET <code>/api/products</code> — Listar productos</li>
          <li>GET <code>/api/products/:id</code> — Obtener producto</li>
          <li>POST <code>/api/products</code> — Crear producto (admin)</li>
          <li>PUT <code>/api/products/:id</code> — Actualizar producto (admin)</li>
          <li>DELETE <code>/api/products/:id</code> — Eliminar producto (admin)</li>
        </ul>
      </li>
      <li><strong>Carrito / Pedidos</strong>
        <ul>
          <li>POST <code>/api/cart</code> — Añadir al carrito (en muchas apps el carrito se maneja en el frontend)</li>
          <li>POST <code>/api/orders</code> — Crear pedido (después de capturar pago)</li>
          <li>GET <code>/api/orders/:id</code> — Obtener pedido</li>
        </ul>
      </li>
      <li><strong>PayPal</strong>
        <ul>
          <li>POST <code>/api/paypal/create-order</code> — Crear una orden en PayPal (servidor)</li>
          <li>POST <code>/api/paypal/capture-order</code> — Capturar la orden y confirmar pago</li>
        </ul>
      </li>
    </ul>
    <p>Ejemplo (pseudocódigo) para crear una orden con PayPal:</p>
    <pre><code>// Pseudocódigo
const order = await paypalClient.createOrder({
  intent: "CAPTURE",
  purchase_units: [{ amount: { currency_code: "USD", value: "59.99" } }]
});</code></pre>
  </section>

  <section class="section">
    <h2>Flujo de autenticación (resumen)</h2>
    <ol>
      <li>Usuario se registra → servidor guarda usuario con contraseña hasheada (bcrypt).</li>
      <li>Usuario inicia sesión → servidor valida credenciales y devuelve un JWT.</li>
      <li>Cliente guarda JWT (localStorage o cookie segura) y lo envía en <code>Authorization: Bearer &lt;token&gt;</code> en peticiones protegidas.</li>
      <li>Rutas protegidas validan el JWT y obtienen la información del usuario.</li>
    </ol>
  </section>

  <section class="section">
    <h2>Estructura sugerida del proyecto</h2>
    <pre><code>/src
  /controllers
  /models
  /routes
  /middlewares
  /services   # ej. integración PayPal
server.js / app.js
.env
package.json
README.md</code></pre>
  </section>

  <section class="section">
    <h2>Ejemplo de seed de productos</h2>
    <p>Puedes incluir un script para poblar productos de ejemplo en MongoDB. Ejemplo:</p>
    <pre><code>// scripts/seedProducts.js (ejemplo)
const mongoose = require('mongoose');
const Product = require('../src/models/product');
const products = [ /* array de productos */ ];
async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Productos insertados');
  process.exit();
}
seed();</code></pre>
    <p>Y ejecutarlo con:</p>
    <pre><code>node scripts/seedProducts.js</code></pre>
  </section>

  <section class="section">
    <h2>Buenas prácticas de seguridad</h2>
    <ul>
      <li>No cometas tu <code>.env</code> ni credenciales al repositorio.</li>
      <li>Usa TLS/HTTPS en producción.</li>
      <li>Valida y sanitiza entradas del usuario.</li>
      <li>Protege rutas administrativas con comprobación de roles.</li>
      <li>Implementa límites de petición / rate limiting si la API es pública.</li>
    </ul>
  </section>

  <section class="section">
    <h2>Despliegue</h2>
    <p>Configura variables de entorno en tu proveedor (Heroku, Railway, Render, Vercel serverless, DigitalOcean, etc.). Asegúrate de que <code>MONGODB_URI</code> apunte a tu cluster en MongoDB Atlas y que las IPs/ACLs permitan la conexión. En producción utiliza <code>PAYPAL_MODE=live</code> y las credenciales reales de PayPal.</p>
  </section>

  <section class="section">
    <h2>Pruebas</h2>
    <ul>
      <li>Agrega pruebas unitarias e integradas según necesidad (Jest, Supertest, etc.).</li>
      <li>Prueba flujos críticos: registro/login, creación de pedidos, captura de pago.</li>
    </ul>
  </section>

  <section class="section">
    <h2>Contribuir</h2>
    <ol>
      <li>Haz fork del repositorio.</li>
      <li>Crea una rama feature: <code>git checkout -b feature/mi-cambio</code>.</li>
      <li>Haz commits claros y descriptivos.</li>
      <li>Abre un Pull Request describiendo los cambios.</li>
    </ol>
  </section>

  <section class="section">
    <h2>Licencia</h2>
    <p>Indica la licencia del proyecto (por ejemplo MIT) o la que prefieras.</p>
  </section>

  <footer class="section">
    <p>Si quieres, puedo:</p>
    <ul>
      <li>Añadir este archivo <code>README.html</code> al repositorio y hacer el commit por ti.</li>
      <li>Generar un <code>.env.example</code> y/o scripts de seed.</li>
      <li>Crear ejemplos de controladores (auth, products, paypal) para integrarlos.</li>
    </ul>
    <p>Dime cuál de estas opciones prefieres y lo hago.</p>
  </footer>
</body>
</html>
