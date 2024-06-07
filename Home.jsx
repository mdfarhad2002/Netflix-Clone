import React,{useState , useEffect} from 'react'
import "./Home.scss"
import Row from './Row'
// import Card from './Card'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'

const apiKey="2fa72b167089e6c35a3e5f0a80195f30";
const url="https://api.themoviedb.org/3";
const Upcoming="upcoming";
// const imgUrl="https://image.tmdb.org/t/p/original"
const NowPlaying="now_playing"
const Popular="popular"
const TopRated="top_rated"
// const Card=({img})=> <img className='card' src={img} alt="cover" />

// const Row=({title, arr1 = [] })=>(
//   // const arr1=[{}]
//   // return(

//     <div className='rows'>

//         <h2>{title}</h2>
//         <div>
//             {
//               arr1.map((item,index)=>(
//               <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
//             ))
//             }
//         </div>
    
//     </div>
//   // )
// );


function Home(){
  const [upcomingMovie, setUpcomingMovie] = useState([])
  const [nowPlayingMovie, setNowPlayingMovie] = useState([])
  const [popularMovie, setPopularMovie] = useState([])
  const [topRatedMovie, setTopRatedMovie] = useState([])
  const [genre, setGenreMovie] = useState([])

  useEffect(() => {
    const fetchUpcoming=async()=>{
    const {data:{results}}=await axios.get(`${url}/movie/${Upcoming}?api_key=${apiKey}`)
      setUpcomingMovie(results)
    };

    const fetchNowPlaying=async()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${NowPlaying}?api_key=${apiKey}&page=2`)
        setNowPlayingMovie(results)
      };

    const fetchPopular=async()=>{
        const {data:{results}}=await axios.get(`${url}/movie/${Popular}?api_key=${apiKey}`)
          setPopularMovie(results)
        };

    const fetchTopRated=async()=>{
          const {data:{results}}=await axios.get(`${url}/movie/${TopRated}?api_key=${apiKey}`)
            setTopRatedMovie(results)
          };
    const getAllGenre=async()=>{
          const {data:{genres}}=await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
              setGenreMovie(genres)
            };



    fetchUpcoming()
    fetchNowPlaying()
    fetchPopular()
    fetchTopRated()
    getAllGenre()
  },[])
  
  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage: popularMovie[0]? `url(${`${imgUrl}/${popularMovie[0].poster_path}`})`:"rgb(15, 1, 1)"
      }}>
          
          {popularMovie[0] && <h1>{popularMovie[0].original_title}</h1>}
          {popularMovie[0] && <p>{popularMovie[0].overview}</p>} 
          <div>
          <button><BiPlay/> Play</button>
          <button>My list <AiOutlinePlus/></button>
          </div>
      </div>
      <Row title={"Upcoming Movies"} arr1={upcomingMovie}/>
      <Row title={"Now Playing"} arr1={nowPlayingMovie}/>
      <Row title={"Popular Movies"} arr1={popularMovie}/>
      <Row title={"Top Rated Movies"} arr1={topRatedMovie}/>
      <div className="genreBox">
        {genre.map((item)=>(
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>
    </section>
  )
}

export default Home