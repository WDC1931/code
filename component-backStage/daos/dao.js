const UserDAO = require('./user.dao');
const CompanyDAO = require('./company.dao');

const DAO = {
    user: UserDAO,
    company: CompanyDAO
}

module.exports = DAO;