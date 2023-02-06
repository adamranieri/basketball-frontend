import { useEffect, useState } from "react"
import { BasketballPlayer, getAllPlayers } from "../api/player-requests"
import { PlayerCreator } from "./player-creator";


export function PlayerViewer(){

    const [players,setPlayers] = useState<BasketballPlayer[]>([]);

    // stands for sideEffect. a side effect in software when a snippet code does something outside of your general control flow
    // useEffect can be used to execute code at specific points of the component lifecycle
    // 1. when the component first loads in
    // 2. whenever a stateful value changes
    // 3. whenever the component is destroyeed
    useEffect(()=>{
        // async iife Immeditaly invoked function expression
        (async ()=>{
            const retrievedPlayers = await getAllPlayers();
            setPlayers(retrievedPlayers)
        })();

    },[]); // add an empty array as the argument for the 2nd param. the callback will execute as sson as the page loads

    return <>
        <h2>Player Stats</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th> <th>Shots Made</th> <th>Assists</th>
                </tr>
            </thead>
            <tbody>
                {players.map(p => <tr><td>{p.fname} {p.lname}</td><td>{p.careerStats.madeBaskets}</td> <td>{p.careerStats.assists}</td></tr>)}
            </tbody>
        </table>

        <PlayerCreator setPlayers={setPlayers}></PlayerCreator>
    
    </>
}