import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import models from '../../../../db/models'

import ErrorBuilder from '../../../../utils/ErrorBuilder'
import { MESSAGE_TYPE } from '../../../../types/enums'

export const schema = Joi.object({
	body: Joi.object(),
	query: Joi.object(),
	params: Joi.object({
		listID: Joi.number().integer().min(1).required(),
		itemID: Joi.number().integer().min(1).required()
	})
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { Item, List } = models
		const { params } = req

		const list = await List.findByPk(parseInt(params.listID, 10), {
			attributes: ['id', 'name']
		})

		if (!list) {
			throw new ErrorBuilder(404, 'List not found')
		}

		const item = await Item.findByPk(parseInt(params.itemID, 10), {
			attributes: ['id', 'name', 'listID']
		})

		if (!item) {
			throw new ErrorBuilder(404, 'Item not found')
		}

		if (item.listID !== list.id) {
			throw new ErrorBuilder(409, 'Item does not belong to the list')
		}

		await item.destroy()

		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'Item deleted successfully'
		}]

		return res.json({
			messages
		})
	} catch (error) {
		return next(error)
	}
}
