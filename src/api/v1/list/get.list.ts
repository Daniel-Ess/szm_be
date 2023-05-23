import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import models from '../../../db/models'
import ErrorBuilder from '../../../utils/ErrorBuilder'

export const schema = Joi.object({
	body: Joi.object(),
	query: Joi.object(),
	params: Joi.object({
		listID: Joi.number().integer().min(1).required()
	})
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { List, Item } = models
		const { params } = req

		const list = await List.findByPk(parseInt(params.listID, 10), {
			attributes: ['id', 'name'],
			include: [{
				model: Item,
				attributes: ['id', 'name']
			}],
			order: [[Item, 'id', 'DESC']]
		})

		if (!list) {
			throw new ErrorBuilder(404, 'List not found')
		}

		return res.json({
			list
		})
	} catch (error) {
		return next(error)
	}
}
