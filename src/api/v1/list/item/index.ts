import { Router } from 'express'

import * as postItem from './post.item'
import * as deleteItem from './delete.item'

// middlewares
import validationMiddleware from '../../../../middlewares/validationMiddleware'

const router = Router({ mergeParams: true })

export default () => {
	// Create a new item
	router.post(
		'/',
		validationMiddleware(postItem.schema),
		postItem.workflow
	)
	// Delete a item
	router.delete(
		'/:itemID',
		validationMiddleware(deleteItem.schema),
		deleteItem.workflow
	)

	return router
}
