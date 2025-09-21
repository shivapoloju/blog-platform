import axios from 'axios';

// Use environment variable if available, otherwise fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// -------------------- Auth API --------------------
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

// -------------------- Blog Post API --------------------
export const fetchPosts = async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
};

export const fetchPostById = async (postId) => {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    return response.data;
};

export const createPost = async (postData, token) => {
    let config = { headers: { Authorization: `Bearer ${token}` } };

    if (postData instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }

    const response = await axios.post(`${API_URL}/posts`, postData, config);
    return response.data;
};

export const updatePost = async (postId, postData, token) => {
    let config = { headers: { Authorization: `Bearer ${token}` } };

    if (postData instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }

    const response = await axios.put(`${API_URL}/posts/${postId}`, postData, config);
    return response.data;
};

export const deletePost = async (postId, token) => {
    const response = await axios.delete(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// -------------------- Likes / Views --------------------
export const likePost = async (postId, token) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const incrementView = async (postId) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/view`);
    return response.data;
};

// -------------------- User Profile --------------------
export const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// -------------------- Single Post Helper --------------------
export async function getPost(id) {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
}
