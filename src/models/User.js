const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Por favor, adicione um nome'],
        trim: true,
        maxlength: [50, 'O nome não pode ter mais que 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'Por favor, adicione um email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor, adicione um email válido'
        ]
    },
    senha: {
        type: String,
        required: [true, 'Por favor, adicione uma senha'],
        minlength: [6, 'A senha deve ter pelo menos 6 caracteres'],
        select: false
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    bio: {
        type: String,
        maxlength: [500, 'A bio não pode ter mais que 500 caracteres']
    },
    biblioteca: [{
        jogo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        },
        dataCompra: {
            type: Date,
            default: Date.now
        },
        tempoJogado: {
            type: Number,
            default: 0
        },
        favorito: {
            type: Boolean,
            default: false
        }
    }],
    listaDesejos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    amigos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    nivel: {
        type: Number,
        default: 1
    },
    experiencia: {
        type: Number,
        default: 0
    },
    conquistas: [{
        tipo: {
            type: String,
            enum: ['compra', 'avaliacao', 'social', 'tempo']
        },
        descricao: String,
        data: {
            type: Date,
            default: Date.now
        }
    }],
    role: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});

// Criptografar senha antes de salvar
userSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
});

// Gerar JWT
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

// Verificar senha
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.senha);
};

module.exports = mongoose.model('User', userSchema); 