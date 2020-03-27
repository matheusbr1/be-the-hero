import axios from 'axios'

const api = axios.create({
    // IP que está rodando o tunelamento para o dispositivo móvel + porta da API -> Utilizando EXPO
    baseURL: 'http:192.168.0.14:3333'
})

export default api