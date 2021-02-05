import httpClient from "../Common/Http";

class DvdService {
    retrieveAll() {
        return httpClient.get("/dvds/")
    }

    searchByTitle(title) {
        return httpClient.get(`/dvds?title=${title}`)
    }

    retrieveById(id) {
        return httpClient.get(`/dvds/${id}`)
    }

    create(data) {
        return httpClient.post("/dvds/", data)
    }

    update(id, data) {
        return httpClient.put(`/dvds/${id}`, data)
    }

    delete(id) {
        return httpClient.delete(`/dvds/${id}`)
    }
}

export default new DvdService();