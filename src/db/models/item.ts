import { Sequelize } from 'sequelize'

import DatabaseModel from '../../types/models'
/* eslint-disable import/no-cycle */
import { ListModel } from './list'

export class ItemModel extends DatabaseModel {
	id: number
	name: string
	// FK
	listID: number
	list: ListModel
	// metadata
	createdAt: Date
	updatedAt: Date
	deletedAt: Date
}

export default (sequelize: Sequelize, DataTypes: any) => {
	ItemModel.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		sequelize,
		timestamps: true,
		paranoid: true,
		modelName: 'item'
	})

	ItemModel.associate = (models) => {
		ItemModel.belongsTo(models.List, { foreignKey: 'listID' })
	}

	return ItemModel
}
