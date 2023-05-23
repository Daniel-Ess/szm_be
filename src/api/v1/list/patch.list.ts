import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import models from '../../../db/models'
import ErrorBuilder from '../../../utils/ErrorBuilder'
import { MESSAGE_TYPE } from '../../../types/enums'

export const schema = Joi.object({
	body: Joi.object({
		name: Joi.string().max(50).required()
	}),
	query: Joi.object(),
	params: Joi.object({
		listID: Joi.number().integer().min(1).required()
	})
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { List } = models
		const { params, body } = req

		const list = await List.findByPk(parseInt(params.listID, 10), {
			attributes: ['id', 'name']
		})

		if (!list) {
			throw new ErrorBuilder(404, 'List not found')
		}

		await list.update({
			name: body.name
		})
		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'List updated successfully'
		}]

		return res.json({
			messages
		})
	} catch (error) {
		return next(error)
	}
}
