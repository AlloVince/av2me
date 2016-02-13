module.exports = function (sequelize, DataTypes) {
  return sequelize.define('WalletUsers', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
      comment: '',
      references: {
        model: '',
        key: ''
      }
    },
    realName: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '真实姓名'
    },
    idCardNumber: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '身份证号'
    },
    isRealNameVerified: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.BOOLEAN,
      comment: '是否已实名'
    },
    realNameVerifiedAt: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '实名时间'
    },
    mobile: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '手机号'
    },
    isMobileVerified: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.BOOLEAN,
      comment: '是否已验证手机'
    },
    mobileVerifiedAt: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '验证手机时间'
    },
    isBankCardBound: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.BOOLEAN,
      comment: '是否已绑定银行卡'
    },
    bankCardBoundAt: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '绑定银行卡时间'
    },
    hasTrustedBankCard: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(4),
      comment: '是否有可信任银行卡'
    },
    transactionPassword: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '支付密码'
    },
    transactionPasswordCreatedAt: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '支付密码创建时间'
    },
    transactionPasswordResetAt: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '支付密码上次重置时间'
    },
    userName: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: ''
    }
  }, {
    tableName: 'eva_wallet_users',
    timestamps: false,
    freezeTableName: true
  });
};
