import path, { join } from "path"
import fs from 'fs/promises'
import Users from "../../repository/users"

class LocalFileStorage {
    constructor(file, user) {
        this.userId = user.id
        this.filename = user.id + path.extname(file.filename)
        this.filePath = file.path
        this.folderAvatars = process.env.FOLDER_FOR_AVATAR
    }

    async save() {
        const destination = path.join(this.folderAvatars, 'avatars')
        await fs.mkdir(destination, {recursive: true})
        await fs.rename(this.filePath, join(destination, this.filename)) // public/avatars/filename
        const avatarUrl = path.normalize(path.join('avatars', this.filename))
        await Users.updateAvatar(this.userId, avatarUrl)
        return avatarUrl
    }
}

export default LocalFileStorage