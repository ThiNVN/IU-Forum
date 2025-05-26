const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sslDir = path.join(__dirname, 'src', 'Backend', 'ssl');

// Create ssl directory if it doesn't exist
if (!fs.existsSync(sslDir)) {
    fs.mkdirSync(sslDir, { recursive: true });
    console.log('✅ Created ssl directory');
}

try {
    // Generate private key
    execSync(`openssl genrsa -out "${path.join(sslDir, 'key.pem')}" 2048`, { stdio: 'inherit' });
    
    // Generate certificate
    execSync(`openssl req -new -x509 -key "${path.join(sslDir, 'key.pem')}" -out "${path.join(sslDir, 'cert.pem')}" -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`, { stdio: 'inherit' });
    
    console.log('✅ SSL certificates generated successfully!');
    console.log('📁 Certificates saved to:', sslDir);
    console.log('🔒 Your backend will now support HTTPS on https://localhost:5000');
    
} catch (error) {
    console.error('❌ Error generating SSL certificates:', error.message);
    console.log('💡 Make sure OpenSSL is installed on your system');
    console.log('💡 Alternative: You can use mkcert for easier local SSL certificate generation');
    console.log('💡 Install mkcert: https://github.com/FiloSottile/mkcert');
} 