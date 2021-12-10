import React, {useState, useEffect} from 'react'
import PokemonList from './PokemonList';
import axios from 'axios'
import Pagination from './Pagination';

function App() {
  
  //pokemon c'est notre selection, setPokemon c'est l'update
  const [pokemon, setPokemon] = useState([])
  
  // chargment de la page
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  
  // gestion de navigation
  const [nextPageUrl, setNextPageUrl] = useState("")
  const [prevPageUrl, setPrevPageUrl] = useState("")

  // chargement de la page // true => by default l'application is loading
  const [loading, setLoading] = useState (true)

  // request qui retourne une promesse. Le response est data avec le JSON et dans results y a l'array des Pokemeons 
  useEffect(()=>{
      setLoading(true)
      let cancel
      axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c=>cancel=c)
      }).then(res=>{
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p=>p.name))
  })

  return()=>cancel()

  // a chaque fois que currentPageUrl change fais un reender
  }, [currentPageUrl])
  
  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."


  return (
    <>
   <PokemonList pokemon={pokemon}/>
   <Pagination
   //Permet de cacher les bouttons
   // if nextPageUrl is true alors passe gotoNextPage sinon rien (nexPageUrl=false)
   gotoNextPage={nextPageUrl ? gotoNextPage : null}
   gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
    />
    </>
  );
}

export default App;
