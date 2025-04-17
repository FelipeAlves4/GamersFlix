const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Por favor, adicione um usuário']
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: [true, 'Por favor, adicione um jogo']
    },
    nota: {
        type: Number,
        required: [true, 'Por favor, adicione uma nota'],
        min: [1, 'A nota deve ser maior que 0'],
        max: [5, 'A nota deve ser menor que 6']
    },
    comentario: {
        type: String,
        required: [true, 'Por favor, adicione um comentário'],
        maxlength: [1000, 'O comentário não pode ter mais que 1000 caracteres']
    },
    curtidas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    respostas: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comentario: {
            type: String,
            required: true,
            maxlength: [500, 'A resposta não pode ter mais que 500 caracteres']
        },
        data: {
            type: Date,
            default: Date.now
        }
    }],
    denuncias: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        motivo: {
            type: String,
            required: true,
            enum: ['spam', 'conteudo_inadequado', 'assedio', 'outro']
        },
        descricao: String,
        data: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Índices para busca
reviewSchema.index({ game: 1, usuario: 1 }, { unique: true });
reviewSchema.index({ nota: 1 });
reviewSchema.index({ createdAt: -1 });

// Middleware para atualizar a média de avaliações do jogo
reviewSchema.post('save', async function() {
    const Game = mongoose.model('Game');
    const Review = mongoose.model('Review');
    
    const reviews = await Review.find({ game: this.game });
    const totalReviews = reviews.length;
    const mediaNotas = reviews.reduce((acc, review) => acc + review.nota, 0) / totalReviews;
    
    await Game.findByIdAndUpdate(this.game, {
        'avaliacoes.media': mediaNotas,
        'avaliacoes.total': totalReviews
    });
});

module.exports = mongoose.model('Review', reviewSchema); 