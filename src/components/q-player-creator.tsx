import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { BasketballPlayerCreation, createPlayer } from "../api/player-requests"


type PlayerForm = {
    fname: string
    lname: string
    height: number
    weight: number
}

export function QPlayerCreator(){

    const [form,setForm] = useState<PlayerForm>({fname:"",lname:"", height:0, weight:0})

    const queryClient = useQueryClient();// will get us access to the query client object in the app.tsx

    // mutations are when you change the data. Anything other than a read
    const createPlayerMutation = useMutation(createPlayer, {
        onSuccess: () => queryClient.invalidateQueries("playercache") // whenever we successfully create a player. React Query will automatically refresh the players cache
    });


    function addPlayer(){
        const newPlayer: BasketballPlayerCreation ={
            fname:form.fname,
            lname:form.lname,
            bioMetrics:{
                heightInches:form.height,
                weightLbs:form.weight
            },
            careerStats:{
                shotAttempts:0,
                madeBaskets:0,
                rebounds:0,
                assists:0,
                blocks:0
            }
        }

        createPlayerMutation.mutate(newPlayer);// calls createPlayer passing in the newPlayer object
    }



    return <>

        <fieldset>
            <legend>Player Name</legend>

            <input type="text" placeholder="Jim" onChange={e=>setForm({...form, fname:e.target.value})}/>
            <input type="text" placeholder="smith" onChange={e=>setForm({...form, lname:e.target.value})} />
            
        </fieldset>

        <fieldset>
            <legend>Bio Metrics</legend>
            <label htmlFor="heightInput">Height</label>
            <input id="heightInput"type="number" placeholder="74" onChange={e=>setForm({...form, height:Number(e.target.value)})} />

            <label htmlFor="weightInput">Weight</label>
            <input  id="weightInput" type="number" placeholder="185" onChange={e=>setForm({...form, weight:Number(e.target.value)})}/>
        </fieldset>

        <button onClick={addPlayer} >Add Player</button>
    
    
    </>

}