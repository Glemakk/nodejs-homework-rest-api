const express = require("express");

const { joiSchema } = require('../../models/user');
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { usersController: ctrl } = require('../../controllers');

const router = express.Router();

/*
1. Регистрация нового пользователя
2. Аутентификация (логин) зарег пользователя
3. Авторизация аутентифицированного (зашедшего на сайт) пользователя
4. Выход (log out)
*/

// gполный путь полуться /users/signup
router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.patch("/avatars", )

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));
// router.get("/logout") - тут не будет никакого тела запроса, поэтому обычно get (сдай пропуск т.е. token)

router.get("/current", authenticate, controllerWrapper(ctrl.current));
module.exports = router;