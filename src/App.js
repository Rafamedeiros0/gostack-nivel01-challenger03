import React from "react";
import api from './services/api'

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'teste-navegador',
      url: 'https://github.com/rafamedeiros0',
      techs: ['NodeJS','Express']
    })
    const repository = response.data
    setRepositories([...repositories,repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    
    if (response.status === 204){
      const filteredRepositories = repositories.filter(repository => repository.id != id) 
      setRepositories(filteredRepositories)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
