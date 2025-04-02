import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from '../entities/ranking.entity';
import { WeightClass } from "../entities/weight-class.entity";
import { Fighter } from "../entities/fighter.entity";

@Injectable()
export class RankingsService {
    constructor(
        @InjectRepository(Ranking)
        private rankingRepository: Repository<Ranking>,

        @InjectRepository(Fighter)
        private fighterRepository: Repository<Fighter>,

        @InjectRepository(WeightClass)
        private weightClassRepository: Repository<WeightClass>,
    ) {}

    async updateRankings(): Promise<void> {
        const weightClasses = await this.weightClassRepository.find();

        for (const weightClass of weightClasses) {
            const fighters = await this.fighterRepository.find({
                where: {weightClass: {id: weightClass.id}},
                order: {
                    wins: 'DESC',
                    losses: 'ASC',
                    knockouts: 'DESC'
                }
            });
        }
    }

    async getCurrentRankings(weightClassId: number): Promise<Ranking[]> {
        return this.rankingRepository.find({
            where: { weightClass: { id: weightClassId } },
            order: { rank: 'ASC' },
            relations: ['fighter'],
        });
    }
}