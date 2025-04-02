import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { WeightClass } from '../entities/weight-class.entity';
import { WeightClassesService } from './weight-classes.service';

@Resolver(() => WeightClass)
export class WeightClassesResolver {
    constructor(private readonly weightClassesService: WeightClassesService) {}

    @Query(() => [WeightClass], { name: 'weightClasses' })
    findAll() {
        return this.weightClassesService.findAll();
    }

    @Query(() => WeightClass, { name: 'weightClass' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.weightClassesService.findOne(id);
    }
}