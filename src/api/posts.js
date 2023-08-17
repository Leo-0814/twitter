import axios from "axios"

const baseUrl = 'http://localhost:3001'

export const getPosts = async () => {
  try {
    const res = await axios.get(`${baseUrl}/posts`)

    return res.data
  } catch (error) {
    console.error('[Get posts]', error)
  }
}

export const createPost = async ({token, id, create_at, getTime, postingContent, ...personInfo}) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${baseUrl}/posts`,
      headers: {
        Authorization: 'bearer ' + token
      },
      data: {
        id,
        account: personInfo.account,
        real_name: personInfo.real_name,
        create_at,
        getTime,
        content: postingContent,
        photo: '',
        reply: [],
        reply_count: 0,
        like: [],
        like_count: 0,
      }
    })

    return res.data
  } catch (error) {
    console.error('[Create post]', error)
  }
}

export const editPost = async ({post, account_id, token}) => {
  let postLike = post[0].like
  if (postLike.includes(account_id)) {
    const targetIndex = postLike.findIndex(item => item === account_id)
    postLike.splice(targetIndex, 1)
  } else {
    postLike.push(account_id)
  }
  try {
    const res = await axios({
      method: 'put',
      url: `${baseUrl}/posts/${post[0].id}`,
      headers: {
        Authorization: 'bearer ' + token
      },
      data: {
        ...post[0],
        like: postLike
      }
    })

    return res.data
  } catch (error) {
    console.error('[Edit post]', error)
  }
}