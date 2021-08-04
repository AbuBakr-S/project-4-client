import axios from 'axios'
import { getToken } from './auth'
import { baseUrl } from '../config'


function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * Learn Requests

export function getAllCourses() {
  return axios.get(`${baseUrl}/courses/`, headers())
}

export function deleteLesson(courseId, lessonId) {
  return axios.delete(`${baseUrl}/courses/${courseId}/lessons/${lessonId}/`, headers())
}

export function createLesson(courseId, formData) {
  return axios.post(`${baseUrl}/courses/${courseId}/lessons/`, formData, headers())
}

export function createCourse(formData) {
  return axios.post(`${baseUrl}/courses/`, formData, headers())
}

export function deleteCourse(courseId) {
  return axios.delete(`${baseUrl}/courses/${courseId}/`, headers())
}

export function getSingleCourse(courseId) {
  return axios.get(`${baseUrl}/courses/${courseId}`, headers())
}

export function getSingleLesson(courseId, lessonId) {
  return axios.get(`${baseUrl}/courses/${courseId}/lessons/${lessonId}/`)
}

export function getUserData(userId) {
  return axios.get(`${baseUrl}/auth/profile/${userId}/`)
}

// * Auth Requests

export function registerUser(formData) {
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/auth/login/`, formData)
}


export function addNewComment(id, formData) {
  return axios.post(`${baseUrl}/courses/${id}/comments/`, formData, headers())
}

export function deleteComment(id, commentId) {
  return axios.delete(`${baseUrl}/courses/${id}/comments/${commentId}/`,  headers())
}


export function editComment(id, commentId) {
  return axios.put(`${baseUrl}/courses/${id}/comments/${commentId}/`,  headers())
}