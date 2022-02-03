import React, {useState, useEffect} from 'react';
import axios from 'axios';
import pokemonColorTypes from './pokemonColorTypes'

const Pokemon = () => {
  let currentPokemonUrl = window.location.href
  let pokemonIndex = (currentPokemonUrl.split('/')[currentPokemonUrl.split('/').length -1])

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

  const [pokemonName, setPokemonName] = useState('')
  const [pokemonImage, setPokemonImage] = useState('')
  const [pokemonType, setPokemonType] = useState([])
  const [pokemonDescription, setPokemonDescription] = useState('')
  const [pokemonStats, setPokemonStats] = useState([]) 
  const [pokemonHeight, setPokemonHeight] = useState('')
  const [pokemonWeight, setPokemonWeight] = useState('')
  const [pokemonEggGroup, setPokemonEggGroup] = useState('')
  const [pokemonCatchRate, setPokemonCatchRate] = useState('')
  const [pokemonAbilities, setPokemonAbilities] = useState('')
  const [pokemonGenderRatioMale, setPokemonGenderRatioMale] = useState('')
  const [pokemonGenderRatioFemale, setPokemonGenderRatioFemale] = useState('')
  const [pokemonEV, setPokemonEV] = useState('')
  const [pokemonHatchSteps, setPokemonHatchSteps] = useState('')


  useEffect(() => {
    // getting pokemon info via pokemonUrl
    axios.get(pokemonUrl).then((res) => {
      setPokemonName(res.data.name)
      setPokemonImage(res.data.sprites.front_default)
      setPokemonType(res.data.types)

      setPokemonStats(res.data.stats
        .map(stat => {
        return stat.base_stat
      }))
      // conversion for decimeters to feet
      setPokemonHeight(Math.round((res.data.height * 0.328084 + 0.0001) * 100) / 100)
      // coversion hecograms to lbs
      setPokemonWeight(Math.round((res.data.weight * 0.220462 + 0.0001) * 100) / 100)
      
      // --------------------------------------- Abilities ---------------------------//
      setPokemonAbilities(res.data.abilities.map(ability => {
        return ability.ability.name
        .toLowerCase()
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
      }))

      //---------------------------------------- EV stat ----------------------------//
      let EV = res.data.stats.filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      }).map(stat => {
           return `${stat.effort} ${stat.stat.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')}`
           
           }).join(', ')
      setPokemonEV(EV)
    },

      //------------------------- getting info via pokemonSpeciesUrl ---------------------------------//

      axios.get(pokemonSpeciesUrl).then((res => {
        setPokemonDescription(res.data.flavor_text_entries.find(flavor => {
          if(flavor.language.name === 'en') {
            return flavor.flavor_text
          } return null;
        }))


        const femaleRate = res.data['gender_rate']
        setPokemonGenderRatioFemale(12.5 * femaleRate)
        setPokemonGenderRatioMale(12.5 * (8 - femaleRate))

        setPokemonCatchRate(Math.round((100 / 255) * res.data['capture_rate']))

        let eggGroup = res.data.egg_groups
          .map(group => {
          return group.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
          })
            .join(' ')
        setPokemonEggGroup(eggGroup)

        setPokemonHatchSteps(255 * res.data.hatch_counter + 1)

      }))
    
  
  )}, [pokemonSpeciesUrl, pokemonUrl]);
  
  

  return (
    <>
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{pokemonIndex}</h5>
              </div>
              <div className="col-7">
                <div className='float-end' key={pokemonType.name}>
                  {pokemonType.map(type => {
                  return (
                  <span 
                  className='badge rounded-pill me-1'
                  style={{backgroundColor: pokemonColorTypes[type.type.name]}}
                  >
                    {type.type.name.toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}
                  </span>)
                    
                  })}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img src={pokemonImage} alt= {pokemonName} className='card-img-top rounded mx-auto mt-2' />
                </div>
                <div className="col-md-9">
                  <h4 className='mx-auto'>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase()}</h4>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">HP</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar"
                          style={{width: `${pokemonStats[0]}%`}}
                          aria-valuenow = "25"
                          aria-valuemin = "0"
                          aria-valuemax = "255"
                          ><small key={setPokemonStats}>{pokemonStats[0]}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Attack</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar"
                          style={{width: `${pokemonStats[1]}%`}}
                          aria-valuenow = "25"
                          aria-valuemin = "0"
                          aria-valuemax = "255"
                          ><small>{pokemonStats[1]}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Defense</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar"
                          style={{width: `${pokemonStats[2]}%`}}
                          aria-valuenow = "25"
                          aria-valuemin = "0"
                          aria-valuemax = "255"
                          ><small>{pokemonStats[2]}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special Attack</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar"
                          style={{width: `${pokemonStats[3]}%`}}
                          aria-valuenow = "25"
                          aria-valuemin = "0"
                          aria-valuemax = "255"
                          ><small>{pokemonStats[3]}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special Defense</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar"
                          style={{width: `${pokemonStats[4]}%`}}
                          aria-valuenow = "25"
                          aria-valuemin = "0"
                          aria-valuemax = "255"
                          ><small>{pokemonStats[4]}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Speed</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar"
                          style={{width: `${pokemonStats[5]}%`}}
                          aria-valuenow = "25"
                          aria-valuemin = "0"
                          aria-valuemax = "255"
                          ><small>{pokemonStats[5]}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col">
                    <p className='p-2'>
                      {pokemonDescription.flavor_text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <h5 className="card-title text-center">Profile</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                    <h6 className='float-end'>Height:</h6>
                    </div>
                    <div className="col-md-6"><h6 className='float-start'>{pokemonHeight} ft.</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                    <h6 className='float-end'>Weight:</h6>
                    </div>
                    <div className="col-md-6"><h6 className='float-start'>{pokemonWeight} lb.</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                    <h6 className='float-end'>Catch Rate:</h6>
                    </div>
                    <div className="col-md-6"><h6 className='float-start'>{pokemonCatchRate}%</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                    <h6 className='float-end'>Gender Ratio:</h6>
                    </div>
                    <div className="col-md-6">
                      <div className="progress">
                        <div className="progress-bar"
                        role = "progressbar"
                        style = {{
                          width: `${pokemonGenderRatioFemale}%`,
                          backgroundColor: '#dd5a8e'
                          }}
                          aria-valuenow={pokemonGenderRatioFemale}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          >
                            <small>{pokemonGenderRatioFemale}</small>
                        </div>
                        <div className="progress-bar"
                        role = "progressbar"
                        style={{
                          width: `${pokemonGenderRatioMale}%`,
                          backgroundColor: '#1976D2'
                        }}
                        aria-valuenow={pokemonGenderRatioMale}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        >
                          <small>{pokemonGenderRatioMale}</small>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-end">Egg Groups:</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-start">{pokemonEggGroup.split(' ').join(', ')}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-end">Hatch Steps:</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-start">{pokemonHatchSteps} steps</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-end">Abilties:</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-start">{JSON.stringify(pokemonAbilities).split('[').join('').split(']').join('').split('"').join('').split(',').join(', ')}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-end">EVs:</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-start">{pokemonEV}</h6>
                    </div>
                  </div>
                </div>        
              </div>
            </div>
          </div>
          <div className="card-footer text-muted float-end">
              Data From{' '}
              <a href="https://pokeapi.co/" target="_blank"  rel="noreferrer">
                  PokeAPI.co
              </a>
            </div>
        </div>
      </div>
        
        
    </>
  )
};

export default Pokemon;
