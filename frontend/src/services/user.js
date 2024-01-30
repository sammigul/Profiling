import { authenticatedAxiosInstance } from '../api/config';


export const viewUserProfile = async () => {
    try {
        const response = await authenticatedAxiosInstance.get(`/users/profile`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const changeUserPassword = async (data) => {
    try {
        const response = await authenticatedAxiosInstance.put(`/users/change_password`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateUserProfile = async (data) => {
    try {
        const response = await authenticatedAxiosInstance.put(`/users/update_info`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

