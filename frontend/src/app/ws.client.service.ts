import {Injectable} from '@angular/core';
import {BaseDto} from "../models/baseDto";
import {WebsocketSuperclass} from "../models/WebsocketSuperclass";
import {Association, Event} from "../models/entities";
import {environment} from "../environments/environment";
import {MessageService} from "primeng/api";
import {ServerSendsEventFeed} from "../models/ServerSendsEventFeed";
import {ServerSendsAssociationFeed} from "../models/ServerSendsAssociationFeed";
import {TokenServiceService} from "../../serviceAngular/token-service.service";


@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService {

  events: Event[] = [];
  associations: Association[] = [
    {
      AssociationId: 3,
      Name: "Community Garden",
      Email: "garden@community.org",
      Phone: 23456789,
      Address: "91011 Green Road",
      Description: "Community managed garden for residents",
      BannerUrl: "../assets/Football field.jpg",
      ProfileUrl: "https://en.reformsports.com/oxegrebi/2023/07/why-do-they-sprinkle-football-pitches.jpg"
    },
    {
      AssociationId: 9,
      Name: "Tjæreborg IF",
      Email: "tjaereborguu@gmail.com",
      Phone: 60225726,
      Address: "Brovej 12 , Tjæreborg, Denmark, 6731",
      Description: "TIF’s hovedaktivitet er fodbold. På det sportslige plan har TIF’s fodboldherrer som største bedrift i turneringsregi at spille sig op i serie 1 i 1993. Derudover er den største sportslige oplevelse, da foreningens fodboldherrer i 2008 spillede sig frem til landspokalturneringens anden runde, hvor man trak det lokale SAS-ligahold Esbjerg fB. Kampen endte 10-1 til Esbjerg fB, men det var en uforglemmelig oplevelse for spillere, ledere, familie og de ca. 1300 tilskuere, der mødte op på Tjæreborg Stadion. På ungdomsfronten er den største bedrift et jysk mesterskab for ynglinge i 2000 i ynglinge 3. TIF er dog mere end fodbold. Af andre aktiviteter er der kroket og petanque. I 1995 kom kroketspillet for alvor til Tjæreborg, hvor der er blevet spillet ved græsarealerne ved Tjæreborg Ældrecenter. I 1997 fik TIF i samarbejde med Esbjerg Kommune anlagt kroketbaner øst for Østerkrog, hvor der også er blevet opført et klubhus. Siden 1996 er det blevet spillet kroket under TIF på banerne ved mellem Tjæreborg Ældrecenter og Kirkestien. I 2009 er dog blevet anlagt petanquebaner ved TIF’s klubhus på brovej, hvor petanqueaktiviteterne finder sted i dag.",
      BannerUrl: "https://live-895-tjaereborg-if.umbraco-proxy.com/media/1657/unavngivet.jpg",
      ProfileUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWJxQaNhKqpB5a5O5G6zU3UReTsW90eHHIIbC8r2YA1g&s"
    },
    {
      AssociationId: 5,
      Name: "Community Garden",
      Email: "garden@community.org",
      Phone: 23456789,
      Address: "91011 Green Road",
      Description: "Community managed garden for residents",
      BannerUrl: "src/assets/badminton.jpg",
      ProfileUrl: "../assets/badminton.jpg"
    },
    {
      AssociationId: 6,
      Name: "Community Garden",
      Email: "garden@community.org",
      Phone: 23456789,
      Address: "91011 Green Road",
      Description: "Community managed garden for residents",
      BannerUrl: "src/assets/Football field.jpg",
      ProfileUrl: "https://en.reformsports.com/oxegrebi/2023/07/why-do-they-sprinkle-football-pitches.jpg"
    },
    {
      AssociationId: 7,
      Name: "Community Garden",
      Email: "garden@community.org",
      Phone: 23456789,
      Address: "91011 Green Road",
      Description: "Community managed garden for residents",
      BannerUrl: "src/assets/Football field.jpg",
      ProfileUrl: "https://en.reformsports.com/oxegrebi/2023/07/why-do-they-sprinkle-football-pitches.jpg"
    },
    {
      AssociationId: 8,
      Name: "Community Garden",
      Email: "garden@community.org",
      Phone: 23456789,
      Address: "91011 Green Road",
      Description: "Community managed garden for residents",
      BannerUrl: "src/assets/Football field.jpg",
      ProfileUrl: "https://en.reformsports.com/oxegrebi/2023/07/why-do-they-sprinkle-football-pitches.jpg"
    },
  ];

  public socketConnection: WebsocketSuperclass;

  constructor(public messageService: MessageService, public tokenService: TokenServiceService) {
    this.socketConnection = new WebsocketSuperclass(environment.websocketBaseUrl);
    this.handleEventsEmittedByTheServer()
  }

  handleEventsEmittedByTheServer() {
    this.socketConnection.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.success && data.token) {
        const token = data.token;
        console.log("Received token: " + token);
        localStorage.setItem('jwt', token);
        this.tokenService.setToken(token);
      } else {
        console.log("Received invalid response from server");
      }
    }
  }



  GetAssociationsById(associationId: number | undefined): Association | undefined {
    return this.associations.find(associated => associated.AssociationId === associationId);
  }

  GetEventsById(eventId: number): Event | undefined {
    return this.events.find(event => event.EventId === eventId);
  }

  ServerWelcomesNewUser(data: any) {
    console.log(data)
    this.messageService.add({
      key: 'bottomcenter',
      life: 2000,
      severity: "info",
      summary: data,
    })
  }

  ServerSendsEventFeed(dto: ServerSendsEventFeed) {
    this.events = dto.EventsFeedQueries!;
    console.log(this.events);
  }

  ServerSendsAssociationFeed(dto: ServerSendsAssociationFeed) {
    //this.associations = dto.AssociationsFeedQueries!;
    console.log(this.associations);
  }
}

