const { NotFound, BadRequest } = require('http-errors');

const { sendSuccessResponse } = require('../helpers');
const {Contact} = require('../models')

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "_id name email phone favorite")
  sendSuccessResponse(res, { result })
  //   const contacts = await contactsOperations.listContacts()
  //   res.json({
  //     message: 'success',
  //     code: 200,
  //     data: {
  //       result: contacts,
  //     },
  //   })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  // console.log(req.params)
  const result = await Contact.findById(contactId)
  // findOne можно использовать по поиску, имени, имейла, кода - чего угодно. 
  // const result = await Contact.findOne({_id: contactId}, "_id name email phone  favorite")
  if (!result) {
    // instead of create new Error just use createError from http-error package
    // const error = new Error(`Contact with id '${contactId}' not found`)
    // error.status = 404
    // throw error
    throw new NotFound(`Contact with id '${contactId}' not found`)
    // ======== more correctly write error as we see above
    // res.status(404).json({
    //   status: 'error',
    //   code: 404,
    //   message: `Product with id${id} not found`,
    // })
    // return
    // ==============================
  }
  sendSuccessResponse(res, { result })
  //   res.json({
  //     message: 'success',
  //     code: 200,
  //     data: {
  //       result,
  //     },
  //   })
}

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  //   console.log(req.body)
  sendSuccessResponse(res, { result }, 201)
  //   res.status(201).json({
  //     status: 'success',
  //     code: 201,
  //     data: {
  //       result,
  //     },
  //   })
}

const updateContact = async (req, res) => {
  //   const { error } = contactSchema.validate(req.body)
  //   if (error) {
  //     throw new BadRequest(error.message)
  //   }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true }); // new: true показывает, что вернуть в ответе обновленный объект
  if (!result) {
    throw new NotFound(`Contact with id '${contactId}' not found`)
    // const error = new Error(`Contact with id=${contactId} not found`)
    // error.status = 404
    // throw error
  }
  sendSuccessResponse(res, { result });
  //   res.json({
  //     result: 'success',
  //     code: 200,
  //     data: {
  //       result,
  //     },
  //   })
}

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, { new: true }); // new: true показывает, что вернуть в ответе обновленный объект
  if (!result) {
    throw new BadRequest(`Contact with id '${contactId}' not found`)
  }
  sendSuccessResponse(res, { result });
}

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Missing field favorite with id '${contactId}' `)
  }

  sendSuccessResponse(res, { message: 'Contact successfully deleted' })

  // если указать res.status(204).json({}) то никакой объект обратно не приходит, какой-бы мы не указали
  //   res.json({
  //     status: 'success',
  //     code: 200,
  //     message: 'Contact successfully deleted',
  //   })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite
}
