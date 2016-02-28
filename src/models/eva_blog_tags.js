/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const BlogTags = sequelize.define('BlogTags', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      comment: 'ID',
      autoIncrement: true
    },
    tagName: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.STRING,
      comment: 'Tag名'
    },
    parentId: {
      allowNull: true,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '父ID'
    },
    rootId: {
      allowNull: true,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '根ID'
    },
    sortOrder: {
      allowNull: true,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '排序编号'
    },
    count: {
      allowNull: true,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '统计'
    }
  }, {
    tableName: 'eva_blog_tags',
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: (models) => {
        BlogTags.belongsToMany(models.BlogPosts, {
          as: 'tags',
          through: {
            model: models.BlogTagsPosts,
            unique: false
          },
          constraints: false,
          foreignKey: 'tagId'
        });
      }
    }
  });
  return BlogTags;
};
