import { authenticatedAxiosInstance,unauthenticatedAxiosInstance } from '../api/config';
export const registerUser = async (data) => {
    try {
        const response = await unauthenticatedAxiosInstance.post('/auth/register', data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (data) => {

    try {
        const response = await unauthenticatedAxiosInstance.post('/auth/login', data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async (token) => {
    try {
        const response = await authenticatedAxiosInstance.delete('/auth/logout', token);
        return response;
    } catch (error) {
        throw error;
    }
}

