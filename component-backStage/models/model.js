const UserModel = require('./user.model');
const CompanyModel = require('./company.model');

// 关联：员工属于公司
UserModel.belongsTo(CompanyModel, {
    foreignKey: 'companyId',
    targetKey: 'companyId',
    as: 'companyInfo'
});

// 关联：小黄条负责人属于(或来自)联系人
// StripModel.belongsTo(UserModel, {
//     foreignKey: 'stripPrincipalId',
//     targetKey: 'userId',
//     as: 'principalInfo'
// });

// 关联：小黄条参与人属于(或来自)联系人
// StripModel.belongsTo(UserModel, {
//     foreignKey: 'stripParticipantId',
//     targetKey: 'userId',
//     as: 'participantInfo'
// });

// 关联：小黄条知会人属于(或来自)联系人
// StripModel.belongsTo(UserModel, {
//     foreignKey: 'stripInformedPersonId',
//     targetKey: 'userId',
//     as: 'informedInfo'
// });

module.exports = {
    user: UserModel,
    company: CompanyModel
};