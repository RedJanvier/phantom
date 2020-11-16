import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from './index';
import Role from './role';

class User extends Model {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;
  public readonly role?: Role;
  public static associations: {
    role: Association<User, Role>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'User',
  }
);
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

export default User;
