const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Por favor, adicione um título'],
        trim: true,
        maxlength: [100, 'O título não pode ter mais que 100 caracteres']
    },
    descricao: {
        type: String,
        required: [true, 'Por favor, adicione uma descrição'],
        maxlength: [2000, 'A descrição não pode ter mais que 2000 caracteres']
    },
    desenvolvedor: {
        type: String,
        required: [true, 'Por favor, adicione o desenvolvedor']
    },
    publicadora: {
        type: String,
        required: [true, 'Por favor, adicione a publicadora']
    },
    dataLancamento: {
        type: Date,
        required: [true, 'Por favor, adicione a data de lançamento']
    },
    generos: [{
        type: String,
        required: [true, 'Por favor, adicione pelo menos um gênero']
    }],
    plataformas: [{
        type: String,
        required: [true, 'Por favor, adicione pelo menos uma plataforma']
    }],
    classificacao: {
        type: String,
        required: [true, 'Por favor, adicione uma classificação etária'],
        enum: ['L', '10', '12', '14', '16', '18']
    },
    preco: {
        type: Number,
        required: [true, 'Por favor, adicione um preço'],
        min: [0, 'O preço não pode ser negativo']
    },
    desconto: {
        type: Number,
        min: [0, 'O desconto não pode ser negativo'],
        max: [100, 'O desconto não pode ser maior que 100%'],
        default: 0
    },
    imagens: {
        capa: {
            type: String,
            required: [true, 'Por favor, adicione uma imagem de capa']
        },
        galeria: [String
        ],
        videos: [String
        ]
    },
    requisitos: {
        minimos: {
            sistema: String,
            processador: String,
            memoria: String,
            video: String,
            armazenamento: String
        },
        recomendados: {
            sistema: String,
            processador: String,
            memoria: String,
            video: String,
            armazenamento: String
        }
    },
    avaliacoes: {
        media: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        }
    },
    tags: [String],
    destaque: {
        type: Boolean,
        default: false
    },
    disponivel: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Índices para busca
gameSchema.index({ titulo: 'text', descricao: 'text' });
gameSchema.index({ generos: 1 });
gameSchema.index({ plataformas: 1 });
gameSchema.index({ destaque: 1 });
gameSchema.index({ disponivel: 1 });

// Virtual para reviews
gameSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'game',
    justOne: false
});

module.exports = mongoose.model('Game', gameSchema); 