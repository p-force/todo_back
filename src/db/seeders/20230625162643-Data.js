/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    const data = [];
    const password = await bcrypt.hash('password', 10);
    for (let i = 0; i < 5; i++) {
      const obj = {
        email: faker.internet.email(),
        confirmEmail: [true, false][Math.floor(Math.random() * [true, false].length)],
        password,
        activationLink: faker.string.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      data.push(obj);
    }
    data.push({
      email: '123@mail.ru',
      confirmEmail: true,
      password: await bcrypt.hash('qw', 10),
      activationLink: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    data.push({
      email: 'qwer@mail.ru',
      confirmEmail: true,
      password: await bcrypt.hash('qw', 10),
      activationLink: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    data.push({
      email: 'zxc@mail.ru',
      confirmEmail: true,
      password: await bcrypt.hash('qw', 10),
      activationLink: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const task = [];
    for (let i = 0; i < 60; i++) {
      const obj = {
        title: faker.lorem.sentence(),
        status: [true, false][Math.floor(Math.random() * [true, false].length)],
        userId:
          [1, 2, 3, 4, 5, 6, 7, 8][Math.floor(Math.random() * [1, 2, 3, 4, 5, 6, 7, 8].length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      task.push(obj);
    }

    await queryInterface.bulkInsert('Users', data, {});
    await queryInterface.bulkInsert('Tasks', task, {});
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
