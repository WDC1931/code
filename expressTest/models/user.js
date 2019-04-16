module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    id: {
      // 用户表主键
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    appid: {
      // 应用id
      type: DataTypes.STRING,
      allowNull: true
    },
    openid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unionid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nickName: {
      // 微信昵称
      type: DataTypes.STRING,
      allowNull: true,
      field: "nick_name"
    },
    gender: {
      // 性别
      type: DataTypes.INTEGER,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.STRING(1234),
      allowNull: true,
      field: "avatar_url"
    },
    power: {
      // 用户权限  1：发布活动/报名活动的权限  2：报名活动的权限  3：无权限
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    realName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "real_name"
    },
    is21CN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "is_21CN"
    },
    enterpriseEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "enterprise_email"
    },
    nextPowerCheck: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "next_power_check"
    },
    extFieldOne: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "ext_field_one"
    },
    extFieldTwo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "ext_field_two"
    },
    extFieldThree: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "ext_field_three"
    }
  });

  User.associate = function(models) {};

  return User;
};
