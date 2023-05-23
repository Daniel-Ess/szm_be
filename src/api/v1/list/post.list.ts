import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import models from '../../../db/models'

import { MESSAGE_TYPE } from '../../../types/enums'

export const schema = Joi.object({
	body: Joi.object({
		name: Joi.string().max(50).required()
	}),
	query: Joi.object(),
	params: Joi.object()
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { List } = models
		const { body } = req

		const list = await List.create({
			name: body.name
		})

		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'List created successfully'
		}]

		return res.json({
			messages,
			list: {
				id: list.id,
			}
		})
	} catch (error) {
		return next(error)
	}
}
