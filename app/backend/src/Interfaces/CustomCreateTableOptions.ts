import { QueryInterfaceCreateTableOptions } from 'sequelize/types';

export interface CustomCreateTableOptions extends QueryInterfaceCreateTableOptions {
  underscored?: boolean;
  timestamps?: boolean;
}
