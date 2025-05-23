import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRole {
    UI = 'UI',
    UX = 'UX',
    DEVELOPER = 'DEVELOPER',
    HR = 'HR'
}

@Entity()
class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

	@Column()
	age:number

	@OneToOne(() => Address , (address) => address.employee , {
		cascade:true,
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	address : Address

    @ManyToOne(()=> Department , (address) => address.employees)
    department : Department

    @Column()
    password:string

    @Column({type:'enum',
        enum:EmployeeRole,
        default: EmployeeRole.DEVELOPER
    })
    role:EmployeeRole
}

export default Employee;
