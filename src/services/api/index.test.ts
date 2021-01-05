import api from './index'

interface IPost {
  id?: number,
  title: string,
  body: string,
};

const url = 'https://jsonplaceholder.typicode.com/posts'

test('api service GET request', (done) => {
  api.get(url).then((posts: IPost[]) => {
    expect(posts[0].id).toBe(1)
    done()
  })
})

test('api service POST request', (done) => {
  const data: IPost = {
    title: 'Example title',
    body: 'Example body',
  }
  api.post(url, data).then((result: IPost) => {
    expect(result.title).toBe(data.title)
    done()
  })
})

test('api service HttpError', (done) => {
  api.get(`${url}/a`).catch((error) => {
    expect(error.status).toBe(404)
    done()
  })
})