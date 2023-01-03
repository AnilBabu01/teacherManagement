import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Default,
  HasMany,
  HasOne,
  BelongsTo,
} from "sequelize-typescript";

export interface UserI {
  empId?: number | null;
  email: string;
  password: string;
  status: string;
  designation: string;
  name: String;
  phone: String;
  address: String;
  joiningDate: String;
  department: String;
}
import { Teaching } from "./teaching";
import { Research } from "./research";
import { Qualification } from "./qualification";
import { Marks } from "./marks";
import { Administration } from "./administration";
@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model implements UserI {
  @AutoIncrement
  @PrimaryKey
  @Column
  empId?: number;

  @AllowNull(true)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  email!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  password!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  status!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  designation!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  phone!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  address!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  joiningDate!: string;

  @AllowNull(true)
  @NotEmpty
  @Column
  department!: string;

  @HasMany(() => Teaching, "empId")
  Teachings!: Teaching;

  @HasMany(() => Research, "empId")
  Researchs!: Research;

  @HasMany(() => Qualification, "empId")
  Qualifications!: Qualification;

  @HasMany(() => Marks, "empId")
  Marks!: Marks;

  @HasMany(() => Administration, "empId")
  Administration!: Administration;
}
