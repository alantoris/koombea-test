import API from "./api";

export const scrape_page = (data) => {
  return API.post('/pages/', { ...data })
}

export const get_pages = (page_number, limit, offset) => {
  return API.get(`/pages/?limit=${limit}&offset=${offset}&page=${page_number}`)
}

export const get_links = (page_pk, page_number, limit, offset) => {
  return API.get(`/links/${page_pk}/?limit=${limit}&offset=${offset}&page=${page_number}`)
}
