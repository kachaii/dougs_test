
import { GroupCategory } from './group-category';

export interface Category {
    id: number;
    group: GroupCategory | undefined;
    wording: string;
    description: string;
}
