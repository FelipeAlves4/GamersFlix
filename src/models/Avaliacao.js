const mongoose = require('mongoose');

const avaliacaoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Por favor, adicione o usuário']
    },
    jogo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: [true, 'Por favor, adicione o jogo']
    },
    nota: {
        type: Number,
        required: [true, 'Por favor, adicione uma nota'],
        min: 1,
        max: 5
    },
    comentario: {
        type: String,
        required: [true, 'Por favor, adicione um comentário'],
        maxlength: [1000, 'O comentário não pode ter mais que 1000 caracteres']
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Índice composto para garantir que um usuário só pode avaliar um jogo uma vez
avaliacaoSchema.index({ usuario: 1, jogo: 1 }, { unique: true });

// Middleware para atualizar a média de avaliações do jogo
avaliacaoSchema.post('save', async function() {
    const Game = mongoose.model('Game');
    const avaliacoes = await this.constructor.find({ jogo: this.jogo });
    
    const media = avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length;
    
    await Game.findByIdAndUpdate(this.jogo, {
        avaliacaoMedia: media,
        numeroAvaliacoes: avaliacoes.length
    });
});

module.exports = mongoose.model('Avaliacao', avaliacaoSchema); 