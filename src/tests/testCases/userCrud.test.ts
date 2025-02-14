import { expect } from 'chai';
import userService from '../../services/users.service';
import logger from '../../utils/logger';
import { allure } from 'allure-mocha/runtime';

const userData = require('../testData/users.json');

describe('User CRUD API Tests', function () {

    logger.info('✅ INFO: This should appear in logs');

    let createdUserId: number;

    before(() => {
        allure.label('feature', 'User API CRUD Operations');
        allure.label('owner', 'QA Team');
        logger.info('✅ INFO: before');
    });

    it('should create a new user', async function () {
        
        await allure.step('Send create user request', async () => {
            const response = await userService.createUser(userData.newUser);
            createdUserId = response.data.id;
            logger.info(`Created user ID: ${createdUserId}`);
            logger.info('✅ INFO: allure');
            expect(response.status).to.equal(201);
            expect(response.data).to.include(userData.newUser);

            allure.attachment('Created User ID', createdUserId.toString(), 'text/plain');
            logger.debug(`Created user ID: ${createdUserId}`);
            logger.info(`Created user ID: ${createdUserId}`);
        });
    });

    it('should fetch a user', async function () {
        await allure.step(`Send get user request for ID: ${userData.testUserId}`, async () => {
            const response = await userService.getUser(userData.testUserId);

            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('id', userData.testUserId);
        });
    });

    it('should update a user', async function () {
        await allure.step(`Send update user request for ID: ${createdUserId}`, async () => {
            const response = await userService.updateUser(createdUserId, userData.updatedUser);

            expect(response.status).to.equal(200);
            expect(response.data).to.include(userData.updatedUser);
        });
    });

    it('should delete a user', async function () {
        await allure.step(`Send delete user request for ID: ${createdUserId}`, async () => {
            const response = await userService.deleteUser(createdUserId);

            expect(response.status).to.equal(200);
        });
    });
});
