const match = require('mime-match/');

export enum FileTypes {
    ANY = '*/*',
    IMAGE = 'image/*',
    VIDEO = 'video/*',
    DOC = 'application/*',
}

export class FileTypeMatcher {
    static isImage(mimetype: string): boolean {
        return match(mimetype, FileTypes.IMAGE);
    }

    static isVideo(mimetype: string): boolean {
        return match(mimetype, FileTypes.VIDEO);
    }

    static isDoc(mimetype: string): boolean {
        return match(mimetype, FileTypes.DOC);
    }

    static isPng(mimeType: string): boolean {
        return match(mimeType, 'image/png');
    }
}
