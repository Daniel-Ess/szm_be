import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import models from '../../../db/models'

export const schema = Joi.object({
	body: Joi.object(),
	query: Joi.object(),
	params: Joi.object()
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { List } = models

		const lists = await List.findAll({
			attributes: ['id', 'name'],
			order: [['id', 'DESC']]
		})

		return res.json({
			lists
		})
	} catch (error) {
		return next(error)
	}
}
