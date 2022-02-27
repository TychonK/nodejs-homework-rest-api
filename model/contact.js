import pkg from 'mongoose'
const { Schema, SchemaTypes, model } = pkg

const contactsSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    }
})

const Contact = model('contacts', contactsSchema)

export default Contact