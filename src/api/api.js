import axios from 'axios';

let token = null;
let vAjax;

//当前页面下，只会进入一次。刷新页面后会再次进入
(function () {
  token = sessionStorage.getItem('accessToken');
  console.log('加载 api.js 设置 vAjax ');
  if (!token) {
    console.log('token不存在');
  } else {
    vAjax = axios.create({
      headers: { 'authorization': token }
    });
  }
})()

export const setToken = function () {
  console.log('设置token信息')
  token = sessionStorage.getItem('accessToken');
  vAjax = axios.create({
    headers: { 'authorization': token }
  });
};

// let base = 'http://localhost/OPEM.API.App';
let base = 'http://devapi.app.onenewcare.com';
// let base = 'http://192.168.0.144/OPEM.API.App';



// 5-6 获取我的档案
export const drProfile = params => { return vAjax.get(`${base}/Dr/My/Profile`); };


// 文章接口  http://devapi.app.onenewcare.com/Article/Search?IsRecommend=0&CategoryType=1
export const requestArticle = params => { return vAjax.post(`${base}/Article/Search`, params).then(res => res.data); };

// 医生的文章接口
export const requestDrArticle = (pageIndex, pageSize) => { return vAjax.get(`${base}/Dr/Article/List?PageIndex=${pageIndex}&PageSize=${pageSize}`); };

// 文章类型借口
export const requestArticleCate = params => { return vAjax.get(`${base}/Article/Category/`, { params: params }); };

// 查看文章详情
export const getArticleDetail = params => { return vAjax.get(`${base}/Dr/Article/Details/${params}`); };

//提交新的文章
export const addNewArticle = params => { return vAjax.post(`${base}/Dr/Article/Details/`, params).then(res => res.data); };

// 删除医生文章
export const deleteArticle = params => { return vAjax.post(`${base}/Dr/Article/Delete/${params}`).then(res => res.data); };



//获取课程分类  http://devapi.app.onenewcare.com/Dr/Learning/CourseType
export const requestCourseType = params => { return vAjax.get(`${base}/Dr/Learning/CourseType/`, { params: params }); };

//获取课程   http://devapi.app.onenewcare.com/Dr/Learning/Course
export const requestCourse = params => { return vAjax.get(`${base}/Dr/Learning/Course/`, { params: params }).then(res => res.data); };

//获取课程资源 http://devapi.app.onenewcare.com/Dr/Learning/Resource?courseId=
export const requestCourseResource = params => { return vAjax.get(`${base}/Dr/Learning/Resource/`, { params: params }); };

//获取试卷分类  http://devapi.app.onenewcare.com/Dr/Learning/PaperType
export const requestPaperType = params => { return vAjax.get(`${base}/Dr/Learning/PaperType/`, { params: params }); };

//获取试卷  http://devapi.app.onenewcare.com/Dr/Learning/Paper
export const requestPaperes = params => { return vAjax.get(`${base}/Dr/Learning/Paper/`,{ params: params }).then(res => res.data); };

//获取试卷详情 http://devapi.app.onenewcare.com/Dr/Learning/PaperDetails/
export const requestPaperDetails = params => { return vAjax.get(`${base}/Dr/Learning/PaperDetails/${params}`); };

//提交试卷
export const sendPaperTest = params => { return vAjax.post(`${base}/Dr/Learning/Test/`, params).then(res => res.data); };

//模拟下载
export const sendTest = params => { return vAjax.get(`${base}/Dr/Learning/DownloadRes/`,{ params: params }).then(res => res.data); };

//我的成长   Dr/Learning/History?type=
export const requestGrowth = params => { return vAjax.get(`${base}/Dr/Learning/History/`,{ params: params }).then(res => res.data); };













