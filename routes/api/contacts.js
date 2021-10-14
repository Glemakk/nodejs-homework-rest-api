const express = require('express')
const router = express.Router()

const { JoicontactSchema, updateFavoriteJoiSchema } = require('../../models/contact')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')

const { contacts: ctrl } = require('../../controllers/')
// console.log(ctrl)

// 1. Получить список всех товаров
// 2. Получить оодин товар по Id
// 3. Добавить товар
// 4. Удалить товар по Id
// 5. Обновить товар по Id

router.get('/', controllerWrapper(ctrl.listContacts))


router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(JoicontactSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.patch('/:contactId/favorite', validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateFavorite),
)

router.put(
  '/:contactId',
  validation(JoicontactSchema),
  controllerWrapper(ctrl.updateContact),
)

module.exports = router
