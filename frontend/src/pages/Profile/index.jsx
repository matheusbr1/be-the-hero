// useEffect método do React para executar funções em algum momento do componente, exemplo: assim que ele é mostrado em tela 
import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Profile() {

    const history = useHistory()

    const [incidents, setIncidents] = useState([])

    // Buscando o nome da ong do LocalStorage do navegador
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    // param 1 = função a ser executada
    // param 2 arr de dependencia, (sempre que o valor do array mudar)
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId] )

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            // Setando o estado com somente os incidents diferentes do que foi deletado
            setIncidents(incidents.filter( incident => incident.id !== id ))

        }catch(err) {
             alert('Erro ao deletar caso')
        }
    }

    function handleLogout () {

        // Limpando os dados mantidos no localStorage do navegador
        localStorage.clear()    

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new" >Cadastrar novo caso</Link>
                <button type="button" >
                    <FiPower size={18} color="#E02401" onClick={handleLogout} />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id} >
                            <strong>CASO:</strong>
                            <p>{incident.title}</p> 

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p> 

                            <strong>VALOR:</strong>
                             {/* classe INTL (internacionalização) para formatar valores, data, etc.. */}
                            <p>{ Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p> 

                            <button type="button" onClick={() => handleDeleteIncident(incident.id)} >
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}