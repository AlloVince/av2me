/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BlogTexts', {
    postId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(20),
      comment: '文章ID',
      references: {
        model: '',
        key: ''
      }
    },
    metaKeywords: {
      allowNull: true,
      type: DataTypes.TEXT,
      comment: 'Meta Keywords'
    },
    metaDescription: {
      allowNull: true,
      type: DataTypes.TEXT,
      comment: 'Meta Description'
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
      comment: '文章正文'
    }
  }, {
    tableName: 'eva_blog_texts',
    timestamps: false,
    freezeTableName: true
  });
};
