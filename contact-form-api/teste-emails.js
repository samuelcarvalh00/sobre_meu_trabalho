const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Configurar a chave de API do SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'samuelcarv008@gmail.com', // Seu email
  from: 'samuelcarv008@gmail.com', // Email verificado no SendGrid
  subject: 'TESTE - Email funcionando!',
  text: 'Se você recebeu este email, o SendGrid está funcionando perfeitamente!',
  html: '<h1>✅ TESTE FUNCIONOU!</h1><p>O SendGrid está configurado corretamente.</p>',
};

async function enviarTeste() {
  try {
    console.log('🧪 Enviando email de teste...');
    await sgMail.send(msg);
    console.log('✅ Email de teste enviado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao enviar email de teste:', error);
    
    if (error.response) {
      console.error('Detalhes do erro:', error.response.body);
    }
  }
}

enviarTeste();