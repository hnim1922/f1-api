import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('result')
export class ResultEntity {
    @PrimaryGeneratedColumn()
    public id: number
    @Column({ name: 'grand_prix' })
    public grandPrix: string;

    @Column({ name: 'date' })
    public date: Date;

    @Column({ name: "winner" })
    public winner: string;

    @Column({ name: "car" })
    public car: string;

    @Column({ name: "laps", nullable: true })
    public laps: number;

    @Column({ name: "time", type: 'time', nullable: true })
    public time: string;
}