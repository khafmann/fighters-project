import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fight } from "./fight.entity";
import {Field, ID} from "@nestjs/graphql";


@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    location: string;

    @Column()
    @Field()
    date: Date;

    @OneToMany(() => Fight, fight => fight.event)
    @Field(() => [Fight])
    fights: Fight[];
}