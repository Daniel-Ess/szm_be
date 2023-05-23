import { Router } from 'express'

import ListRouter from './list'

const router = Router()

export default () => {
	router.use('/lists', ListRouter())

	return router
}
