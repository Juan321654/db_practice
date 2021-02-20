'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // to pass as an include in app.js
      this.hasMany(Post, {foreignKey: 'user_id', as: 'posts'})
    }

    //this hides the id for users to not be able to see in postman or API
    toJSON(){
      return { ...this.get(), id: undefined}
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    // name: {type: DataTypes.STRING, allowNull: false, validate: { notNull: true, notEmpty: true}},
    name: { 
      type: DataTypes.STRING, 
      allowNull: false,
       validate: { 
         // we can set notNull: true   or we can add a custom message
         notNull: { msg: 'must have a name' }, 
         notEmpty: { msg: 'must not be empty'} 
        } 
      },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: { 
        notNull: { msg: 'must have an email'}, 
        notEmpty: { msg: 'email must not be empty'},
        isEmail: { msg: 'email format must be valid'}
      } 
    } ,
    role: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: { 
        notNull: { msg: 'must have a role'}, notEmpty: { msg: 'role must not be empty'} 
      } 
    },
    boss: DataTypes.BOOLEAN,
    user_status: {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};
