// quick-jwt.js
const jwt = require('jsonwebtoken');

// Replace this with your real User ID from pgAdmin
const userId = 'cmc4vk1wa0000uzi0q7r57fy2';

// Secret must match your server's secret
const secret = 'secret';

const token = jwt.sign({ userId }, secret);

console.log('✅ Generated JWT Token:\n', token);
