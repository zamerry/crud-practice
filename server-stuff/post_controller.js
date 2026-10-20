import Post_service from "./post_service.js";

class Post_controller {
    async create(req, res) {
        try {
            // const {name, age, russian_grade, math_grade, english_grade} = req.body

            const check_picture = req.files ? req.files.picture : null
            // const file_name = await File_service.save_file(check_picture)

            const create_student = await Post_service.create(req.body, check_picture)
            return res.status(200).json(create_student)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async get_all(req, res) {
        try {
            const get_students = await Post_service.get_all()
            return res.status(200).json(get_students)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async get_one(req, res) {
        try {
            const get_student = await Post_service.get_one(req.params.id)
            return res.status(200).json(get_student)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const delete_student = await Post_service.delete(req.params.id)
            return res.status(200).json(delete_student)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const update_student = await Post_service.update(req.body, req.body._id)
            return res.status(200).json(update_student)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

export default new Post_controller()