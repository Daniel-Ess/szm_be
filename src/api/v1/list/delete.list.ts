import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { Op, Transaction } from 'sequelize'

import db from '../../../db'
import models from '../../../db/models'

import ErrorBuilder from '../../../utils/ErrorBuilder'
import { MESSAGE_TYPE } from '../../../types/enums'

export const schema = Joi.object({
	body: Joi.object(),
	query: Joi.object(),
	params: Joi.object({
		listID: Joi.number().integer().min(1).required()
	})
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	let transaction: Transaction
	try {
		const { List, Item } = models
		const { params } = req

		const list = await List.findByPk(parseInt(params.listID, 10), {
			attributes: ['id', 'name']
		})

		if (!list) {
			throw new ErrorBuilder(404, 'List not found')
		}

		transaction = await db.transaction()

		await Item.destroy({
			where: {
				listID: { [Op.eq]: list.id }
			},
			transaction
		})

		await list.destroy({ transaction })

		await transaction.commit()

		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'List deleted successfully'
		}]

		return res.json({
			messages
		})
	} catch (error) {
		if (transaction) {
			await transaction.rollback()
		}
		return next(error)
	}
}
