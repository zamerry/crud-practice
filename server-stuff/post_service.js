import Students from "./students.js";
import file_service from "./file_service.js";
import mongoose from "mongoose";

import fs from 'fs/promises'
import path from 'path'

class Post_service {
    async get_all() {
        const get_students = await Students.find()
        return get_students
    }

    async create(post, picture) {

        const file_name = await file_service.save_file(picture)

        let {name, age, russian_grade, math_grade, english_grade} = post

        if (name === undefined || age === undefined || russian_grade === undefined || math_grade === undefined || english_grade === undefined) {
            throw new Error("заполните поля")
        }

        name.trim()

        if (name.length > 20) {
            throw new Error("введите имя корректно")
        }

        for (const key of name) {
            if (key !== "" && !isNaN(Number(key))) {
                throw new Error("имя не должно содержить числа")
            }
        }

        const check_duplicate = await Students.findOne({name})

        if (check_duplicate) {
            // чисто для удобства
            throw new Error("такое имя уже имеется")
        }

        const parsed_age = Number(age)

        const parsed_ru = Number(russian_grade)
        const parsed_math = Number(math_grade)
        const parsed_en = Number(english_grade)


        if (isNaN(parsed_age) || isNaN(parsed_ru) || isNaN(parsed_math) || isNaN(parsed_en)) {
            throw new Error("невалидный ввод числовых данных")
        }

        const general_grade = [parsed_ru, parsed_math, parsed_en]

        for (const key of general_grade) {
            if (key <= 0 || key > 100) {
                throw new Error("оценка должна быть больше 0 и меньше 100")
            }
        }

        const create_student = await Students.create({
            name,
            age: parsed_age,
            russian_grade: parsed_ru,
            math_grade: parsed_math,
            english_grade: parsed_en,
            picture: file_name
        })
        return create_student
    }

    async get_one(id) {

        if (!id) {
            throw new Error("введите id")
        }

        const get_student = await Students.findById(id)

        if (!get_student) {
            throw new Error("по указанному id никто не найден")
        }

        return get_student
    }

    async delete(id) {
        if (!id) {
            throw new Error("введите id")
        }

        const student_id = await Students.findById(id)

        if (student_id.picture) {
            const file_path = path.resolve(import.meta.dirname, '..', 'static', student_id.picture)
            try {
                await fs.unlink(file_path)
            } catch (e) {
                console.log("картинка при удалении не найдена", e.message)
            }
        }

        const delete_student = await Students.findByIdAndDelete(id)

        if (!delete_student) {
            throw new Error("по указанному id никто не найден, скорее вы его удалили")
        }


        return delete_student

    }

    async update(post, id) {
        if (!id) {
            throw new Error("введите id")
        }

        const update_student = await Students.findByIdAndUpdate(post._id, post, {returnDocument: 'after'})

        if (!update_student) {
            throw new Error("по указанному id никто не найден")
        }

        return update_student
    }

    async deleteAll(post, picture) {
        try {
            const dir_path = path.resolve(import.meta.dirname, 'static')

            await fs.rm(dir_path, {force: true, recursive: true})

            await fs.mkdir(dir_path, {recursive: true})

            const result = await Students.deleteMany({});
            return result
        } catch (e) {
            throw new Error("ошибка при удалении всех данных", e.message)
        }
    }
}

export default new Post_service()