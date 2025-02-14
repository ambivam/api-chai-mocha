import axios from 'axios';
import config from '../config/config';

import logger from '../utils/logger';
import { allure } from 'allure-mocha/runtime';

class UserService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${config.baseUrl}/users`;
    }

    async createUser(userData: object) {
        return allure.step('Create a new user', async () => {
            try {
                const response = await axios.post(this.baseUrl, userData);
                allure.attachment('Create User Response', JSON.stringify(response.data), 'application/json');
                logger.info(`User created: ${JSON.stringify(response.data)}`);
                return response;
            } catch (error: any) {
                allure.attachment('Error Response', JSON.stringify(error.response?.data || error.message), 'application/json');
                logger.error(`Error creating user: ${error.message}`);
                throw error;
            }
        });
    }

    async getUser(userId: number) {
        return allure.step(`Fetch user with ID: ${userId}`, async () => {
            try {
                const response = await axios.get(`${this.baseUrl}/${userId}`);
                allure.attachment('Get User Response', JSON.stringify(response.data), 'application/json');
                logger.info(`Fetched user: ${JSON.stringify(response.data)}`);
                return response;
            } catch (error: any) {
                allure.attachment('Error Response', JSON.stringify(error.response?.data || error.message), 'application/json');
                logger.error(`Error fetching user: ${error.message}`);
                throw error;
            }
        });
    }

    async updateUser(userId: number, updatedData: object) {
        return allure.step(`Update user with ID: ${userId}`, async () => {
            try {
                const response = await axios.put(`${this.baseUrl}/${userId}`, updatedData);
                allure.attachment('Update User Response', JSON.stringify(response.data), 'application/json');
                logger.info(`User updated: ${JSON.stringify(response.data)}`);
                return response;
            } catch (error: any) {
                allure.attachment('Error Response', JSON.stringify(error.response?.data || error.message), 'application/json');
                logger.error(`Error updating user: ${error.message}`);
                throw error;
            }
        });
    }

    async deleteUser(userId: number) {
        return allure.step(`Delete user with ID: ${userId}`, async () => {
            try {
                const response = await axios.delete(`${this.baseUrl}/${userId}`);
                allure.attachment('Delete User Response', JSON.stringify(response.data), 'application/json');
                logger.info(`User deleted: ID ${userId}`);
                return response;
            } catch (error: any) {
                allure.attachment('Error Response', JSON.stringify(error.response?.data || error.message), 'application/json');
                logger.error(`Error deleting user: ${error.message}`);
                throw error;
            }
        });
    }
}

export default new UserService();
