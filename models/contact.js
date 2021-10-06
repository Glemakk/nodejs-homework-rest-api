const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const PhoneRegExp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/
// (123) 456-7890
const EmailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// qwe@mail.com
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: EmailRegExp,
    minlength: 3,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: PhoneRegExp,
    minlength: 6,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
},
  { versionKey: false, timestamps: true/*, retainKeyOrder: true*/ },
);

const JoicontactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(4).pattern(EmailRegExp).required(),
  phone: Joi.string().min(6).pattern(PhoneRegExp).required(),
  favorite: Joi.boolean(),


});

const updateFavoriteJoiSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  JoicontactSchema,
  updateFavoriteJoiSchema
};
