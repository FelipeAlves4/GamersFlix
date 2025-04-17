require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Servir arquivos estáticos em produção
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
}

// Rota para buscar todos os vídeos
app.get('/api/v1/videos', (req, res) => {
    // Aqui você pode conectar com um banco de dados
    const videos = [
        {
            id: 1,
            title: 'RTX 4070 Ti: Vale a pena?',
            description: 'Análise completa da nova placa de vídeo da NVIDIA',
            thumbnail: 'https://img.youtube.com/vi/lZ0FppdYAzM/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=lZ0FppdYAzM'
        },
        // Adicione mais vídeos aqui
    ];
    res.json(videos);
});

// Rota para buscar vídeos por categoria
app.get('/api/v1/videos/category/:category', (req, res) => {
    const { category } = req.params;
    // Implemente a lógica para filtrar vídeos por categoria
    res.json([]);
});

// Rota para buscar vídeos em destaque
app.get('/api/v1/videos/featured', (req, res) => {
    // Implemente a lógica para retornar vídeos em destaque
    res.json([]);
});

// Rota para buscar todas as FAQs
app.get('/api/v1/faq', (req, res) => {
    const faqs = [
        {
            id: 1,
            question: 'Como posso encontrar vídeos específicos?',
            answer: 'Você pode usar a barra de pesquisa no topo da página ou navegar pelas categorias disponíveis.',
            category: 'videos'
        },
        // Adicione mais FAQs aqui
    ];
    res.json(faqs);
});

// Rota para buscar FAQs por categoria
app.get('/api/v1/faq/category/:category', (req, res) => {
    const { category } = req.params;
    // Implemente a lógica para filtrar FAQs por categoria
    res.json([]);
});

// Rota para enviar mensagem de contato
app.post('/api/v1/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Aqui você pode implementar o envio de email ou salvar em um banco de dados
    console.log('Mensagem recebida:', { name, email, subject, message });
    
    res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
});

// Rota para servir o frontend em produção
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 