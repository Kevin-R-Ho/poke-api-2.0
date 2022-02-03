import React, {useEffect, useState} from 'react'
import {Sprite, Card, StyledLink} from './PokemonCardStyle'

// destructuring object {pokemon} to assign its own variables to the properties of {pokemon}
const PokemonCard = ({ pokemon }) => {

// setting state for each card per different pokemon    
    const [name, setName] = useState('')
    const [pokemonUrl, setPokemonUrl] = useState('')
    const [pokemonIndex, setPokemonIndex] = useState('')
    const [pokemonImg, setPokemonImg] = useState('')

    useEffect(() => {
        setName(pokemon.name)
        setPokemonUrl(pokemon.url)
        setPokemonIndex(pokemonUrl.split('/')[pokemonUrl.split('/').length -2])
        setPokemonImg(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`)
    })

    return (
        <>
            <div className='col-md-3 col-sm-6 mb-5'>
                <StyledLink to = {`pokemon/${pokemonIndex}`}>
                    <Card className='card'>
                            <h5  className='card-header' key = {name}>
                                {pokemonIndex}
                            </h5>
                            <Sprite className='card-img-top rounded mx-auto mt-2' src={pokemonImg} />
                        <div className="card-body mx-auto">
                            <h6 className='card-title'>
                                {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                            </h6>
                        </div>
                    </Card>
                </StyledLink>
            </div>
        </>
    )
}

export default PokemonCard

