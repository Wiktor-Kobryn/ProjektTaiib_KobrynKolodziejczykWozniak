import { Component, inject } from '@angular/core';
import { EventsService } from '../events.service';
import { Route, Router } from '@angular/router';
import { EventResponseDTO } from '../model/event.interface';
import { GroupsService } from '../groups.service';
import { GroupResponseDTO } from '../model/group.interface';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { useAnimation } from '@angular/animations';
import { EventType } from '../model/eventType.interface';
import { EventRequestDTO } from '../model/eventRequest.interface';
import { EventCommon } from '../events-common/event-common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent extends EventCommon{
}
