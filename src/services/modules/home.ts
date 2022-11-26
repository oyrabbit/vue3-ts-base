import http from '../request'

const getHomeHotSuggests = () => {
  return http.get({
    url: '/home/hotSuggests'
  })
}

const getHomeHouselist = (currentPage: number) => {
  return http.get({
    url: '/home/houselist',
    params: {
      page: currentPage
    }
  })
}
export { getHomeHotSuggests, getHomeHouselist }
