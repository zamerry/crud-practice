import Students from "./students.js";
import file_service from "./file_service.js";

class Post_service {
    async get_all() {
        const get_students = await Students.find()
        return get_students
    }

    async create(post, picture) {

        const file_name = await file_service.save_file(picture)

        const create_student = await Students.create({...post, picture: file_name})
        return create_student
    }

    async get_one(id) {

        if (!id) {
            throw new Error("введите id")
        }

        const get_student = await Students.findById(id)
        return get_student
    }

    async delete(id) {
        if (!id) {
            throw new Error("введите id")
        }

        const delete_student = await Students.findByIdAndDelete(id)
        return delete_student

    }

    async update(post, id) {
        if (!id) {
            throw new Error("введите id")
        }

        const update_student = await Students.findByIdAndUpdate(post._id, post, {returnDocument: 'after'})
        return update_student
    }
}

export default new Post_service()