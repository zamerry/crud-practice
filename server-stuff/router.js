import {Router} from "express";
import Post_controller from "./post_controller.js";

const router = Router()

router.post('/', Post_controller.create)
router.get('/', Post_controller.get_all)
router.get('/:id', Post_controller.get_one)
router.put('/', Post_controller.update)
router.delete('/deleteAll', Post_controller.delete_all)
router.delete('/:id', Post_controller.delete)

export default router