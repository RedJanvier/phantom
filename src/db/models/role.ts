import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from './index';

class Role extends Model {
  public readonly id!: number;
  public name!: string;
  public associations!: {};
  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}
Role.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Role',
  }
);

export default Role;
