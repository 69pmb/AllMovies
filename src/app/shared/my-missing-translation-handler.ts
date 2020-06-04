import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Injectable, Injector } from '@angular/core';

import { DropboxService } from './service/dropbox.service';
import { Dropbox } from '../constant/dropbox';

@Injectable()
export class MyMissingTranslationHandler implements MissingTranslationHandler {

    constructor(
        private injector: Injector
    ) { }

    handle(params: MissingTranslationHandlerParams): string {
        let defaultTrad;
        if (params.key.includes('.')) {
            defaultTrad = params.translateService.translations[params.translateService.defaultLang];
            params.key.split('.').forEach(key => defaultTrad = defaultTrad[key]);
            const dropbox = this.injector.get(DropboxService);
            dropbox.downloadFile(Dropbox.DROPBOX_TRANSLATION_FILE).then((file: string) => {
                dropbox.uploadFile(new Blob([file.concat('\r\n' + defaultTrad ? (params.translateService.currentLang + ': ') : '' + params.key)],
                    { type: 'text/plain;charset=utf-8' }),
                    Dropbox.DROPBOX_TRANSLATION_FILE);
            });
        }
        return defaultTrad ? defaultTrad : params.key;
    }
}
