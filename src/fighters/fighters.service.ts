import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../entities/fighter.entity';
import { FightStats } from '../dto/fight-stats.dto';
import {CreateFighterInput} from "./dto/create-fighter.input";
import {UpdateFighterInput} from "./dto/update-fighter.input";
import {WeightClass} from "../entities/weight-class.entity";

@Injectable()
export class FightersService {
    constructor(
        @InjectRepository(Fighter)
        private fightersRepository: Repository<Fighter>,
        @InjectRepository(WeightClass)
        private weightClassRepository: Repository<WeightClass>
    ) {}

    async create(createFighterInput: CreateFighterInput): Promise<Fighter> {
        const fighter = this.fightersRepository.create(createFighterInput);

        if (createFighterInput.weightClassId) {
            const weightClass = await this.weightClassRepository.findOneBy({ id: createFighterInput.weightClassId });
            if (!weightClass) {
                throw new NotFoundException(`Weight with id = ${createFighterInput.weightClassId} not found`);
            }
            fighter.weightClass = weightClass;
        }

        return this.fightersRepository.save(fighter);
    }

    async findAll(): Promise<Fighter[]> {
        return this.fightersRepository.find();
    }

    async findOne(id: number): Promise<Fighter> {
        const fighter = await this.fightersRepository.findOne({
            where: { id },
            relations: ['weightClass'],
        });

        if (!fighter) {
            throw new NotFoundException(`Fighter with id = ${id} not found`);
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