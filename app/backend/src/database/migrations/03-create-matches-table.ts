import { DataTypes, Model, QueryInterface } from 'sequelize';
// import { CustomCreateTableOptions } from '../../Interfaces/CustomCreateTableOptions';
import { IMatches } from '../../Interfaces/IMatches';

export default {
    up(queryInterface: QueryInterface) {
        // const options: CustomCreateTableOptions = {
        //     underscored: true,
        // };

        return queryInterface.createTable<Model<IMatches>>('matches', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            homeTeamId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'home_team_id',
            },

            awayTeamId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'away_team_id',
            },

            homeTeamGoals: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'home_team_goals',
            },

            awayTeamGoals: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'away_team_goals',
            },

            inProgress: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'in_progress',
            },
        }, // options
      );
    },

    down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('matches');
    }
};