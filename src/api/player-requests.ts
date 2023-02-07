export type BasketballPlayer = {
    playerId:    number
    fname:       string
    lname:       string
    bioMetrics:  BioMetrics
    careerStats: CareerStats
}

export type BioMetrics = {
    heightInches: number
    weightLbs:    number
}

export type CareerStats = {
    shotAttempts: number
    madeBaskets:  number
    rebounds:     number
    assists:      number
    blocks:       number
}


export type BasketballPlayerCreation = {
    fname:       string
    lname:       string
    bioMetrics:  BioMetrics
    careerStats: CareerStats
}

// Fetch is the in built HTTP client in browsers
export async function getAllPlayers():Promise<BasketballPlayer[]>{
    const httpResponse = await fetch("http://127.0.0.1:8000/players");// sometimes node is picky and requires the localhost IP as numbers rather than the name
    const players: BasketballPlayer[] = await httpResponse.json();
    return players;
}

export async function createPlayer(basketballPlayer: BasketballPlayerCreation):Promise<BasketballPlayer>{
    const httpResponse = await fetch("http://127.0.0.1:8000/players", {
        method:"POST", 
        body:JSON.stringify(basketballPlayer),
        headers:{
            "Content-Type":"application/json"
        }
    });

    const player:BasketballPlayer = await httpResponse.json();
    return player;
}

export async function getAllPlayersByLastName(lname:string):Promise<BasketballPlayer[]>{

    const query = `query PlayersByLname($lnameToSearch:String){
        players(lname:$lnameToSearch){
          playerId
          fname
          lname
          bioMetrics{
            heightInches
            weightLbs
            }
          careerStats{
            assists
            blocks
            madeBaskets
            shotAttempts
            rebounds
          }
        }
        
      }`

    const variables = {lnameToSearch:lname}
    const body = JSON.stringify({query:query,variables:variables})

    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const players:BasketballPlayer[] = responseBody.data;
    return players
}

