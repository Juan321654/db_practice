'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('users', [{
      uuid: "f4d53509-19ae-43d7-82a8-d0224d371a12",
      name: "gtrtrand",
      email: "todfasm@email.com",
      role: "user",
      boss: false,
      user_status: "today I have been coding",
      updatedAt: "2021-02-19T21:30:28.485Z",
      createdAt: "2021-02-19T21:30:28.485Z"
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
