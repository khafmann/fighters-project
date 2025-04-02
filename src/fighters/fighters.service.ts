import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../entities/fighter.entity';
import { FightStats } from '../dto/fight-stats.dto';
import {CreateFighterInput} from "./dto/create-fighter.input";
import {UpdateFighterInput} from "./dto/update-fighter.input";

@Injectable()
export class FightersService {
    constructor(
        @InjectRepository(Fighter)
        private fightersRepository: Repository<Fighter>,
    ) {}

    async create(createFighterInput: CreateFighterInput): Promise<Fighter> {
        const fighter = this.fightersRepository.create(createFighterInput);
        return this.fightersRepository.save(fighter);
    }

    async findAll(): Promise<Fighter[]> {
        return this.fightersRepository.find();
    }

    async findOne(id: number): Promise<Fighter> {
        const fighter = await this.fightersRepository.findOneBy({ id });

        if (!fighter) {
            throw new NotFoundException(`Fighter with ud = ${id} not found`);
        }

        return fighter;
    }

    async update(id: number, updateData: UpdateFighterInput): Promise<Fighter | null> {
        await this.fightersRepository.update(id, updateData);
        const fighter = await this.fightersRepository.findOneBy({ id });
        if (!fighter) {
            throw new Error(`Fighter with id =  ${id} not found`);
        }
        return fighter;
    }

    async remove(id: number): Promise<void> {
        await this.fightersRepository.delete(id);
    }

    async getFighterStats(id: number): Promise<FightStats> {
        const fighter = await this.findOne(id);
        return {
            winRate: fighter.wins + fighter.losses > 0
                ? (fighter.wins / (fighter.wins + fighter.losses)) * 100 // Calculate winrate percentage
                : 0,                                                     // Return 0 if no wins
            knockoutRate: fighter.wins > 0
                ? (fighter.knockouts / fighter.wins) * 100
                : 0
        };
    }
}