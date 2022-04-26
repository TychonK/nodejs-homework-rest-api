import HttpCode from "../lib/constants"
import { uploadFileService, localFileStorage } from '../service/file-storage'

const uploadAvatar = async (req, res, next) => {
    const uploadService = new uploadFileService(localFileStorage, req.file, req.user)
    const avatarUrl = await uploadService.updateAvatar()
    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, message: 'Successfully uploaded avatar', data: { avatarUrl } })
}

export {
    uploadAvatar
}