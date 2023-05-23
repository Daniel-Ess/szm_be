import { forEach } from 'lodash'
import { DataTypes } from 'sequelize'

// database connectioin
import db from '..'

// models
import defineList from './list'
import defineItem from './item'

const models = {
	List: defineList(db, DataTypes),
	Item: defineItem(db, DataTypes),
}

forEach(models, (value) => {
	if (value.associate) {
		value.associate(models)
	}
})

export default models
