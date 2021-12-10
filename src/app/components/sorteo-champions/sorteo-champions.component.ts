import { Component, OnInit } from '@angular/core';
import { Enfrentamiento } from 'src/app/models/enfrentamiento';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-sorteo-champions',
  templateUrl: './sorteo-champions.component.html',
  styleUrls: ['./sorteo-champions.component.css']
})
export class SorteoChampionsComponent implements OnInit {

  enfrentamientos: Enfrentamiento[] = [];
  selectTeamsPot1: Team[] = [];
  selectTeamsPot2: Team[] = [];
  equiposPosiblesEnfrentamiento: Team[] = [];

  ocultar: boolean = false;
  sorteo: boolean = true;
  volver: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.selectTeamsPot1 = [
      {name: 'Manchester City', country: '(ENG)', letterGroup: 'A', img: './assets/city.png'},
      {name: 'Liverpool', country: '(ENG)', letterGroup: 'B', img: './assets/liverpool.png'},
      {name: 'Ajax', country: '(PSB)', letterGroup: 'C', img: './assets/ajax.png'},
      {name: 'Real Madrid', country: '(SPA)', letterGroup: 'D', img: './assets/realmadrid.png'},
      {name: 'Bayern Münich', country: '(GER)', letterGroup: 'E', img: './assets/bayern.png'},
      {name: 'Manchester United', country: '(ENG)', letterGroup: 'F', img: './assets/united.png'},
      {name: 'Lille', country: '(FRA)', letterGroup: 'G', img: './assets/lille.png'},
      {name: 'Juventus', country: '(ITA)', letterGroup: 'H', img: './assets/juve.png'}];
    
    this.selectTeamsPot2 = [
    {name: 'Paris Saint Germain', country: '(FRA)', letterGroup: 'A', img: './assets/psg.png'},
    {name: 'Atlético de Madrid', country: '(SPA)', letterGroup: 'B', img: './assets/atleti.jpg'},
    {name: 'Sporting Portugal', country: '(POR)', letterGroup: 'C', img: './assets/sporting.jpg'},
    {name: 'Inter Milán', country: '(ITA)', letterGroup: 'D', img: './assets/inter.jpg'},
    {name: 'Benfica', country: '(POR)', letterGroup: 'E', img: './assets/benfica.png'},
    {name: 'Villarreal', country: '(SPA)', letterGroup: 'F', img: './assets/villarreal.png'},
    {name: 'Salzburgo', country: '(AUS)', letterGroup: 'G', img: './assets/salzburgo.png'},
    {name: 'Chelsea', country: '(ENG)', letterGroup: 'H', img: './assets/chelsea.png'}];
  }

  selectMatchups(){
    let teamPot1: Team;
    let teamPot2: Team;
    while (this.selectTeamsPot1 && this.selectTeamsPot1.length > 0) {
      teamPot1 = this.selectTeamsPot1[Math.floor(Math.random() * this.selectTeamsPot1.length)];
      this.equiposPosiblesEnfrentamiento = this.seleccionarPosibleRival(teamPot1);
      teamPot2 = this.equiposPosiblesEnfrentamiento[Math.floor(Math.random() * this.equiposPosiblesEnfrentamiento.length)];
      let partido = new Enfrentamiento(teamPot1, teamPot2);
      this.enfrentamientos.push(partido);
      this.deleteTeamPot1(teamPot1);
      this.deleteTeamPot2(teamPot2);
    }
    this.ocultar = true;
    this.sorteo = false;
    this.volver = true;
  }

  deleteTeamPot1(team: Team){
    const index: number = this.selectTeamsPot1.indexOf(team);
    if (index !== -1) {
      this.selectTeamsPot1.splice(index, 1);
    }       
  }

  deleteTeamPot2(team: Team){
    const index: number = this.selectTeamsPot2.indexOf(team);
    if (index !== -1) {
      this.selectTeamsPot2.splice(index, 1);
    }       
  }

  returnDraw(){
    this.ocultar = false;
    this.sorteo = true;
    this.volver = false;
    this.enfrentamientos = [];
    this.ngOnInit();
  }

  seleccionarPosibleRival(equipoBombo1: Team){
    let posiblesEquipos: Team[] = [];
    posiblesEquipos = this.selectTeamsPot2.filter((equipo) => {
      this.volver = true;
      return equipo.country != equipoBombo1.country && equipo.letterGroup != equipoBombo1.letterGroup;
    })
    return posiblesEquipos;
  }
}
