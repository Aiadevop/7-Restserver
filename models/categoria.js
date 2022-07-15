//Mismo nombre que la colección sin la s.
//Çotejamos en la base de datos que lo introducido es correcto.

const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria.'],
        unique:true

    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

module.exports = model('Categoria', CategoriaSchema)