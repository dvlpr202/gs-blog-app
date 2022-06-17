import axios from "axios"

export const specificUserPosts = async () => {
    const token = localStorage.getItem("jwt")
    return await axios({
        method: "get",
        url: "http://127.0.0.1:4000/p/sp/u/posts",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const likePost = (id) => {
    const token = localStorage.getItem("jwt")
    return axios({
        method: "put",
        url: "http://127.0.0.1:4000/p/like",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            postId: id
        }
    })
}
export const unlikePost = (id) => {
    const token = localStorage.getItem("jwt")
    return axios({
        method: "put",
        url: "http://127.0.0.1:4000/p/unlike",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            postId: id
        }
    })
}
export const specificPost = async (id) => {
    return await axios({
        method: "get",
        url: `http://127.0.0.1:4000/p/sp/post/${id}`
    })
}
export const createPost = async ({ title, categories, sdesc, fdesc, url }) => {
    const token = localStorage.getItem("jwt")
    return await axios({
        method: "post",
        url: "http://127.0.0.1:4000/p/create",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            title: title,
            sdesc: sdesc,
            fdesc: fdesc,
            picture: url,
            categories: categories
        }
    })
}
export const updatePost = async (id, post) => {
    const token = localStorage.getItem("jwt")
    return await axios({
        method: "put",
        url: `http://127.0.0.1:4000/p/up/post/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: post
    })
}
export const deletePost = async (id) => {
    const token = localStorage.getItem("jwt")
    return await axios({
        method: "delete",
        url: `http://127.0.0.1:4000/p/d/post/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const showAllPosts = async () => {
    return await axios({
        method: "get",
        url: "http://127.0.0.1:4000/p/show"
    })
}
export const specificCateNews = async () => {
    return await axios({
        method: "get",
        url: "http://127.0.0.1:4000/p/sp/cate/business"
    })
}
export const specificCateTech = async () => {
    return await axios({
        method: "get",
        url: "http://127.0.0.1:4000/p/sp/cate/tech"
    })
}
export const specificCateDesign = async () => {
    return await axios({
        method: "get",
        url: "http://127.0.0.1:4000/p/sp/cate/design"
    })
}
export const specificCateWeb = async () => {
    return await axios({
        method: "get",
        url: "http://127.0.0.1:4000/p/sp/cate/web"
    })
}
export const specificCateMarketing = async () => {
    return await axios({
        method: "get",
        url: "http://127.0.0.1:4000/p/sp/cate/marketing"
    })
}
export const specificCateMobile = async () => {
    return await axios({
        method: "get",
        url: "http://127.0.0.1:4000/p/sp/cate/mobile"
    })
}
export const commentPost = async (text, postId) => {
    const token = localStorage.getItem("jwt")
    return await axios({
        method: "post",
        url: "http://127.0.0.1:4000/p/comment/create",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            comment: text,
            post_id: postId
        }
    })
}
export const showAllComments = async (id) => {
    return await axios({
        method: "get",
        url: `http://127.0.0.1:4000/p/comment/show/${id}`
    })
}
export const deleteComment = async (id) => {
    const token = localStorage.getItem("jwt")
    return await axios({
        method: "delete",
        url: `http://127.0.0.1:4000/p/comment/delete/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const specificCateSearch = async (search) => {
    return await axios({
        method: "get",
        url: `http://127.0.0.1:4000/p/sp/cate/${search}`
    })
}