import { useQuery } from "react-query"
import { BasketballPlayer, getAllPlayers } from "../api/player-requests"



export function QPlayerViewer(){

    // useQuery will make an httpRequest using the function you passed as the second paramater when the component loads.
    // the first parameter "players" is the cache key. It is the label of the data we got back from the web server
    // this key is important becasuse we can use this key ANYWHERE in our code and have the data be shared and in sync
    
    //useQuery returns an object literal with tons of properties.
    // isLoading is true when the http request is made but not completed
    // isError is true when the request was finished but you got back an error
    // data is the actual data from the http request if successful
    const {isLoading, isError, data = []} = useQuery("playercache", getAllPlayers);

    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    return <>
        <h1>React Query version of player viewer</h1>
        <ul>
            {data.map(p => <li key={p.playerId}>{p.fname} {p.lname} shooting %{p.careerStats.madeBaskets/p.careerStats.shotAttempts}</li>)}
        </ul>
    </>
}