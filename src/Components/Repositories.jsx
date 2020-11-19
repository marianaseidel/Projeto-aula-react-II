import { useState, useEffect } from 'react'

const Repositories = () => {
    const [repositories, setRepositories] = useState([])
    const [filter, setFilter] = useState([])
    const [find, setFind] = useState('')

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://api.github.com/users/marianaseidel/repos')
            const data = await response.json()

            setRepositories(data)
        }
        getData()
    }, [])

    useEffect(() => {
        setFilter(
            repositories.filter(repos => {
                return repos.name.includes(find)
            })
        )
    }, [find, repositories])

    return (
        <div>
            <input
                type='text'
                placeholder='Digite um repositório'
                onChange={e => {
                    setFind(e.target.value)
                }}
            />
            <ul>
                {filter.map(repos => {
                    return <li key={repos.id}>{repos.name}</li>
                })}
            </ul>
        </div>
    )
}

export default Repositories