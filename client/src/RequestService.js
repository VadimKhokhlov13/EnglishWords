import axios from 'axios';

const url = 'api';

class RequestService {
    static getWords() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data);
            } catch {
                reject('error');
            }
        })
    }

    static getWord(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url + '/word', {
                    id
                });
                const data = res.data;
                resolve(data);
            } catch {
                reject('error');
            }
        })
    }

    static setPoints(id, isRemembered) {
        return axios.post(url + '/points', {
            id,
            isRemembered
        })
    }

    static addWord(data) {
        return axios.post(url, {
            data
        });
    }

    static deleteWord(id) {
        return axios.post(url + '/delete', {
            id
        });
    }
}

export default RequestService;