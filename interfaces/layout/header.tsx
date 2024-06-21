import { IMenuLink } from '~/interfaces/models/menuLink';
import { IDatoAnnouncement } from '~/interfaces/layout/announcement';

export interface IHeader {
    menu: IMenuLink[];
    announcement:IDatoAnnouncement;
    darkTheme:boolean;
}
