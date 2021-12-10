import { Team } from "./team";

export class Enfrentamiento{
    public team1: Team;
    public team2: Team;

    constructor(team1: Team, team2: Team){
        this.team1 = team1;
        this.team2 = team2;
    }
}