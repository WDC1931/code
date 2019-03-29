const express = require('express');
const router = express.Router();

// 用户
router.use('/addUser', require('./user/add_user'));
router.use('/detailUser', require('./user/detail_user'));
router.use('/listUsers', require('./user/list_users'));
router.use('/updateUser', require('./user/update_user'));
router.use(
  '/detailUserIncludeCompany',
  require('./user/detail_user_include_company')
);
router.use(
  '/listUsersIncludeCompany',
  require('./user/list_users_include_company')
);

module.exports = router;
