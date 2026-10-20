import path from 'path'
import {v4 as uuid_v4} from 'uuid'
import fs from 'fs/promises'

class File_service {
    async save_file(file) {
        try {

            if (!file) {
                return null
            }

            const file_format = path.extname(file.name) || '.jpg'
            const file_name = uuid_v4() + file_format

            const dir_path = path.resolve(import.meta.dirname, '..', 'static')
            await fs.mkdir(path.resolve(dir_path), {recursive: true})
            const file_path = path.resolve(dir_path, file_name)

            await file.mv(file_path)
            return file_name
        } catch (e) {
            console.log(e.message)
        }
    }
}

export default new File_service()