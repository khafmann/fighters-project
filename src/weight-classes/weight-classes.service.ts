import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightClass } from '../entities/weight-class.entity';

@Injectable()
export class WeightClassesService {
    constructor(
        @InjectRepository(WeightClass)
        private weightClassesRepository: Repository<WeightClass>,
    ) {}

    async findOne(id: number): Promise<WeightClass> {
        const weightClass = await this.weightClassesRepository.findOne({
            where: { id }
        });

        if (!weightClass) {
            throw new NotFoundException(`Weight class with id = ${id} not found`);
        }

        return weightClass;
    }

    async findAll(): Promise<WeightClass[]> {
        return this.weightClassesRepository.find();
    }
}