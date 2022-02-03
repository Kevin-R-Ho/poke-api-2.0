import React, {useState, useEffect} from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios'
import Pagination from './Pagination'

const PokemonList = () => {

    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [pokemonList, setPokemonList] = useState([])
    const [nextPage, setNextPage] = useState()
    const [prevPage, setPrevPage] = useState()

    // setting up state values
    useEffect (() => {
        axios.get(currentPage)
        .then((res => {
            setPokemonList(res.data.results)
            setNextPage(res.data.next)
            setPrevPage(res.data.previous)
        }))
    }, [currentPage])

    function goToNextPage() {
        setCurrentPage(nextPage)
    }
    
    function goToPrevPage() {
        setCurrentPage(prevPage)
    }

    return (
        <>
            <div className='row'>
            <Pagination
                goToNextPage={nextPage ? goToNextPage : null}
                goToPreviousPage={prevPage ? goToPrevPage : null}
            />
                {pokemonList.map(pokemon => (
                    <PokemonCard
                // need to destructure to display props of the pokemon object. otherwise, would specify which properties to display here
                    pokemon = {pokemon}
                    />
                ))}
            </div>
        </>
    )
}

export default PokemonList
