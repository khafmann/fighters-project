import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fighter } from "./fighter.entity";
import { Ranking } from "./ranking.entity";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class WeightClass {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    maxWeight: number;

    @OneToMany(() => Fighter, fighter => fighter.weightClass)
    @Field(() => [Fighter])
    fighters: Fighter[];

    @OneToMany(() => Ranking, ranking => ranking.weightClass)
    @Field(() => [Ranking])
    rankings: Ranking[];
}