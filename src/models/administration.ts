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
  ForeignKey,
} from "sequelize-typescript";

export interface AdministrationI {
  id?: number | null;
  empId?: number | null;
  session: string;
  semester: string;
  designation: string;
  work: String;
}
import { User } from "./user";
@Table({
  tableName: "Administration",
  timestamps: true,
})
export class Administration extends Model implements AdministrationI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  session!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  semester!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  designation!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  work!: string;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column
  empId!: number;
}
