import {Resolver, Query, Args, Int, Mutation} from '@nestjs/graphql';
import { WeightClass } from '../entities/weight-class.entity';
import { WeightClassesService } from './weight-classes.service';
import {CreateWeightClassInput} from "./dto/ create-weight-class.input";

@Resolver(() => WeightClass)
export class WeightClassesResolver {
    constructor(private readonly weightClassesService: WeightClassesService) {}

    @Mutation(() => WeightClass)
    async createWeightClass(
        @Args('input') input: CreateWeightClassInput
    ) {
        return this.weightClassesService.create(input);
    }

    @Query(() => [WeightClass], { name: 'weightClasses' })
    findAll() {
        return this.weightClassesService.findAll();
    }

    @Query(() => WeightClass, { name: 'weightClass' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.weightClassesService.findOne(id);
    }
}