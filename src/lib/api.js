import axios from 'axios'
import { getToken } from './auth'


function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * Learn Requests

export function createCourse(formData) {
  return axios.post('/api/courses/', formData, headers())
}

export function getSingleCourse(courseId) {
  return axios.get(`/api/courses/${courseId}`, headers())
}

export function getSingleLesson(courseId, lessonId) {
  return axios.get(`/api/courses/${courseId}/lessons/${lessonId}`)
}

export function getUserData(userId) {
  return axios.get(`/api/auth/profile/${userId}/`)
}

// * Auth Requests

export function registerUser(formData) {
  return axios.post('api/auth/register/', formData)
}

export function loginUser(formData) {
  return axios.post('api/auth/login/', formData)
}


export function addNewComment(id, formData) {
  return axios.post(`api/courses/${id}/comments/`, formData, headers())
}

export function deleteComment(id, commentId) {
  return axios.delete(`api/courses/${id}/comments/${commentId}`,  headers())
}


export function editComment(id, commentId) {
  return axios.put(`api/courses/${id}/comments/${commentId}`,  headers())
}