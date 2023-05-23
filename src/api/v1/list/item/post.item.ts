import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import models from '../../../../db/models'

import ErrorBuilder from '../../../../utils/ErrorBuilder'
import { MESSAGE_TYPE } from '../../../../types/enums'

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
		const { Item, List } = models
		const { body, params } = req

		const list = await List.findByPk(parseInt(params.listID, 10), {
			attributes: ['id', 'name'],
			include: [{
				model: Item,
				attributes: ['id', 'name']
			}]
		})

		if (!list) {
			throw new ErrorBuilder(404, 'List not found')
		}

		const duplicate = list.items.find(item => item.name === body.name)

		if (duplicate) {
			throw new ErrorBuilder(409, 'Item is already in the list')
		}

		const item = await Item.create({
			name: body.name,
			listID: list.id
		})

		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'Item created successfully'
		}]

		return res.json({
			messages,
			item: {
				id: item.id
			}
		})
	} catch (error) {
		return next(error)
	}
}
