
import axios from 'axios';

// Like/unlike a post
export const likePost = async (postId, token) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Increment view count
export const incrementView = async (postId) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/view`);
    return response.data;
};

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

// Auth API calls
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

// Blog Post API calls
export const fetchPosts = async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
};

export const fetchPostById = async (postId) => {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    return response.data;
};

export const createPost = async (postData, token) => {
    // If postData is FormData, send as multipart, else send as JSON
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    if (postData instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
        const response = await axios.post(`${API_URL}/posts`, postData, config);
        return response.data;
    } else {
        config.headers['Content-Type'] = 'application/json';
        const response = await axios.post(`${API_URL}/posts`, postData, config);
        return response.data;
    }
};

export const updatePost = async (postId, postData, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    if (postData instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
        const response = await axios.put(`${API_URL}/posts/${postId}`, postData, config);
        return response.data;
    } else {
        config.headers['Content-Type'] = 'application/json';
        const response = await axios.put(`${API_URL}/posts/${postId}`, postData, config);
        return response.data;
    }
};

export const deletePost = async (postId, token) => {
    const response = await axios.delete(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};


export async function getPost(id) {
  const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
  return response.data;
}
// ...existing code...

// Profile API calls
export const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};