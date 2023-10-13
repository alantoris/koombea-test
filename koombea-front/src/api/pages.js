import API from "./api";

export const scrape_page = (data) => {
  return API.post('/pages/', { ...data })
}
