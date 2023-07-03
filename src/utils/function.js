import axios from 'axios'

export const fetcherGet = (url) => axios.get(url).then((res) => res.data)
