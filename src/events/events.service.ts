import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) {}

    async getUpcomingEvents(): Promise<Event[]> {
        return this.eventsRepository.find({
            where: { date: MoreThan(new Date()) },
            order: { date: 'ASC' },
            take: 25 // Takes only first 25 events, may be useful for future pagination implementation
        });
    }
}