'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // by default it will get UserId, but we want lower case for convention so we pass an option
      // this.belongsTo(User)
      // to pass as an include in app.js [getting users with their post]
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user'})
    }
    //this will hide the id in post man from users. it does not alter the actual database
    toJSON(){
      return {...this.get(), id: undefined, userId: undefined}
    }
  };
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    content: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};
