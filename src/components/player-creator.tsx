import { useState } from "react"
import { BasketballPlayer, createPlayer, getAllPlayers } from "../api/player-requests"

type PlayerForm = {
    fname: string
    lname: string
    height: number
    weight: number
}

type PlayerCreatorProps = {
    setPlayers: React.Dispatch<React.SetStateAction<BasketballPlayer[]>>
}

export function PlayerCreator(props:PlayerCreatorProps){

    const [form,setForm] = useState<PlayerForm>({fname:"",lname:"", height:0, weight:0})

    async function submitData(){
        const player = await createPlayer({
            fname:form.fname,
            lname:form.lname,
            bioMetrics:{
                heightInches:form.height,
                weightLbs:form.weight
            },
            careerStats:{
                assists:0,
                shotAttempts:0,
                madeBaskets:0,
                blocks:0,
                rebounds:0
            }
        })
        const players = await getAllPlayers();
        props.setPlayers(players);
        alert(`Player was added their id is ${player.playerId}`)
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

        <button onClick={submitData}>Show data</button>
    </>
}