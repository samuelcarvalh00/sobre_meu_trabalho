const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configurar a chave de API do SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-email', async (req, res) => {
  console.log('📧 Requisição recebida!');
  console.log('Dados recebidos:', req.body);
  
  const { name, email, message } = req.body;

  // Validação básica do e-mail
  if (!name || !email || !message) {
    console.log('❌ Dados faltando:', { name, email, message });
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Validação de formato de e-mail
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido' });
  }

  const msg = {
    to: process.env.FROM_EMAIL, // SEU email (onde você vai receber as mensagens)
    from: process.env.FROM_EMAIL, // E-mail verificado no SendGrid
    reply_to: email, // Email da pessoa que enviou (para você conseguir responder)
    subject: `Nova mensagem de contato de ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nova Mensagem de Contato</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Você pode responder diretamente a este e-mail para entrar em contato com ${name}.
        </p>
      </div>
    `,
  };

  try {
    console.log('📤 Tentando enviar email...');
    console.log('Para:', process.env.FROM_EMAIL);
    console.log('De:', process.env.FROM_EMAIL);
    console.log('Reply-to:', email);
    
    await sgMail.send(msg);
    console.log('✅ Email enviado com sucesso!');
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
    
    // Log mais detalhado do erro para debug
    if (error.response) {
      console.error('Response body:', error.response.body);
    }
    
    res.status(500).json({ error: 'Erro ao enviar mensagem. Tente novamente.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Email configurado: ${process.env.FROM_EMAIL}`);
});