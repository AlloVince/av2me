/* jshint indent: 2 */

import Model from 'sequelize/lib/model';

/**
 * @param sequelize
 * @param DataTypes
 * @returns {Model}
 */
module.exports = function (sequelize, DataTypes) {
  /**
   * @type {Model} BlogPosts
   */
  const BlogPosts = sequelize.define('BlogPosts', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
      comment: 'ID',
      autoIncrement: true
    },
    title: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.STRING,
      comment: '标题'
    },
    status: {
      allowNull: false,
      defaultValue: 'pending',
      type: DataTypes.ENUM('deleted', 'draft', 'published', 'pending'),
      comment: '状态'
    },
    visibility: {
      allowNull: false,
      defaultValue: 'public',
      type: DataTypes.ENUM('public', 'private', 'password'),
      comment: '可见性'
    },
    type: {
      allowNull: false,
      defaultValue: 'article',
      type: DataTypes.STRING,
      comment: '分类'
    },
    codeType: {
      allowNull: false,
      defaultValue: 'markdown',
      type: DataTypes.STRING,
      comment: '原始代码类型'
    },
    language: {
      allowNull: true,
      defaultValue: 'en',
      type: DataTypes.STRING,
      comment: '语言'
    },
    parentId: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '父ID'
    },
    slug: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.STRING,
      comment: '唯一标示'
    },
    sortOrder: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '排序'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.INTEGER(10),
      comment: '创建时间'
    },
    userId: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.BIGINT,
      comment: '创建用户ID'
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '创建用户名'
    },
    updatedAt: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '更新时间'
    },
    editorId: {
      allowNull: true,
      defaultValue: '0',
      type: DataTypes.BIGINT,
      comment: '更新用户ID'
    },
    editorName: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '更新用户ID'
    },
    commentStatus: {
      allowNull: false,
      defaultValue: 'open',
      type: DataTypes.ENUM('open', 'closed', 'authority'),
      comment: '评论状态'
    },
    commentType: {
      allowNull: false,
      defaultValue: 'local',
      type: DataTypes.STRING,
      comment: '评论类型'
    },
    commentCount: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '评论数量'
    },
    viewCount: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.BIGINT,
      comment: '访问量'
    },
    imageId: {
      allowNull: false,
      defaultValue: '0',
      type: DataTypes.INTEGER(10),
      comment: '封面ID'
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '封面URL'
    },
    summary: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '摘要'
    },
    sourceName: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '来源'
    },
    sourceUrl: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '来源Url'
    }
  }, {
    tableName: 'eva_blog_posts',
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        BlogPosts.hasOne(models.BlogTexts, {
          as: 'text',
          foreignKey: 'postId'
        });
        BlogPosts.belongsToMany(models.BlogTags, {
          as: 'tags',
          through: {
            model: models.BlogTagsPosts,
            unique: false
          },
          constraints: false,
          foreignKey: 'postId'
        });
      }
    }
  });
  return BlogPosts;
};
