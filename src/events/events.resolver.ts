import { Resolver, Query } from '@nestjs/graphql';
import { Event } from '../entities/event.entity';
import { EventsService } from './events.service';

@Resolver(() => Event)
export class EventsResolver {
    constructor(private readonly eventsService: EventsService) {}

    @Query(() => [Event], { name: 'events' })
    async getUpcomingEvents() {
        return this.eventsService.getUpcomingEvents();
    }
}