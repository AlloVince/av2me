/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BlogTagsPosts', {
    tagId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      comment: 'TAG ID',
      references: {
        model: '',
        key: ''
      }
    },
    postId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      comment: 'POST ID',
      references: {
        model: '',
        key: ''
      }
    }
  }, {
    tableName: 'eva_blog_tags_posts',
    timestamps: false,
    freezeTableName: true
  });
};
