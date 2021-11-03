const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rate-limit-login');
const wrapError = require('../../helpers/errorHandler');
const upload = require('../../helpers/uploads');

const { registration, login, logout, current, update, uploadAvatar } = require('../../controllers/users');



router.patch('/', guard,  wrapError(update));

router.post('/registration',  registration);
// Установка лимита на логин с одного IP(3р в течение часа)
router.post('/login', loginLimit, login);
router.post('/logout', guard, logout);
router.get('/current', guard, wrapError(current));
// Загрузка avatar
router.patch('/avatar',guard,  upload.single('avatar'),  uploadAvatar);

module.exports = router;