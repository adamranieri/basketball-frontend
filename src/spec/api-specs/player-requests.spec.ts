import { BasketballPlayer, BasketballPlayerCreation, createPlayer, getAllPlayers } from "../../api/player-requests"

// testing API endpoints is never going to play nice. The data that would test lives outside of your application. You can never be certain it exists
test("Get All Players", async ()=>{
    const players = await getAllPlayers();
    console.log(players);
    expect(players).toBeTruthy();
})

test("Basketball Player Creation", async ()=>{
    const newPlayer: BasketballPlayerCreation = {
        fname:"Nate",
        lname:"Smith",
        bioMetrics:{
            heightInches:84,
            weightLbs:270
        },
        careerStats:{
            assists:10,
            shotAttempts:40,
            madeBaskets:32,
            blocks:15,
            rebounds:51
        }
    }

    const player = await createPlayer(newPlayer);
    expect(player.playerId).not.toBe(0);// by convention of an object's id is not 0 it means it is saved somewhere
    console.log(player);
})