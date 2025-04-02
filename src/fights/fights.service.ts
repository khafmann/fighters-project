import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from '../entities/fight.entity';
import { CreateFightInput } from "./dto/create-fight.input";
import { Fighter } from "../entities/fighter.entity";
import { Event } from  "../entities/event.entity"

@Injectable()
export class FightsService {
    constructor(
        @InjectRepository(Fight)
        private fightsRepository: Repository<Fight>,
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
        @InjectRepository(Fighter)
        private fightersRepository: Repository<Fighter>,
    ) {}

    async create(createFightInput: CreateFightInput): Promise<Fight> {
        const { eventId, fighter1Id, fighter2Id, ...rest } = createFightInput;

        const event = await this.eventsRepository.findOneBy({ id: eventId });
        const fighter1 = await this.fightersRepository.findOneBy({ id: fighter1Id });
        const fighter2 = await this.fightersRepository.findOneBy({ id: fighter2Id });

        if (!event || !fighter1 || !fighter2) {
            throw new Error('Event or Fighter not found');
        }

        const fight = this.fightsRepository.create({
            ...rest,
            event,
            fighter1,
            fighter2
        });

        return this.fightsRepository.save(fight);
    }

    async findAll(): Promise<Fight[]> {
        return this.fightsRepository.find();
    }

    async findOne(id: number): Promise<Fight> {
        const fight = await this.fightsRepository.findOneBy({ id });

        if (!fight) {
            throw new NotFoundException(`Fight with id = ${id} not found`);
        }

        return fight;
    }

    async findByFighter(fighterId: number): Promise<Fight[]> {
        return this.fightsRepository.find({
            where: [
                { fighter1: { id: fighterId } },
                { fighter2: { id: fighterId } }
            ]
        });
    }

    async update(id: number, updateData: Partial<Fight>): Promise<Fight> {
        await this.fightsRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.fightsRepository.delete(id);
    }

    async recordResult(id: number, result: string): Promise<Fight> {
        await this.fightsRepository.update(id, { result });
        return this.findOne(id);
    }
}