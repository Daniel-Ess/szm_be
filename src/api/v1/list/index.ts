import { Router } from 'express'

import * as getLists from './get.lists'
import * as getList from './get.list'
import * as postList from './post.list'
import * as deleteList from './delete.list'
import * as patchList from './patch.list'

import ItemRouter from './item'

// middlewares
import validationMiddleware from '../../../middlewares/validationMiddleware'

const router = Router()

export default () => {
	// Get all lists
	router.get(
		'/',
		validationMiddleware(getLists.schema),
		getLists.workflow
	)
	// Get list detail with items
	router.get(
		'/:listID',
		validationMiddleware(getList.schema),
		getList.workflow
	)
	// Create a new list
	router.post(
		'/',
		validationMiddleware(postList.schema),
		postList.workflow
	)
	// Update a list
	router.patch(
		'/:listID',
		validationMiddleware(patchList.schema),
		patchList.workflow
	)
	// Delete a list
	router.delete(
		'/:listID',
		validationMiddleware(deleteList.schema),
		deleteList.workflow
	)

	router.use('/:listID/items', ItemRouter())

	return router
}
