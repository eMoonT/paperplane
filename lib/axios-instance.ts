import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
// import Router from 'next/router';

const axiosInstance = axios.create({
  baseURL: '/api/v1', // 根据实际情况调整
  timeout: 10000
});

// 请求拦截器
axiosInstance.interceptors.request.use(config => {
  const authToken = Cookies.get('auth');

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  const router = useRouter()
  // 如果返回的状态码为401，即没有权限，则跳转到登录页面
  if (error.response && error.response.status === 401) {
    // Router.push('/login');
    router.push('/login')
  }
  return Promise.reject(error);
});

export default axiosInstance;
