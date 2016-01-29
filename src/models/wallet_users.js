"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('WalletUsers', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            defaultValue: null
        }
        ,
        realName: {
            type: DataTypes.STRING,
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null
        },
        idCardNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null
        },
        isRealNameVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 0
        },
        realNameVerifiedAt: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 0
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null
        },
        isMobileVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 0
        },
        mobileVerifiedAt: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 0
        },
        isBankCardBound: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 0
        },
        bankCardBoundAt: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 0
        },
        hasTrustedBankCard: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 0
        },
        transactionPassword: {
            type: DataTypes.STRING,
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null
        },
        transactionPasswordCreatedAt: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 0
        },
        transactionPasswordResetAt: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 0
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'eva_wallet_users'
    });
};
