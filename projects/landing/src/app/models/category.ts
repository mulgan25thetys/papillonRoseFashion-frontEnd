import { Post } from './post';
export class Category{
    id?:any;
	name?:any;
	slug?:any;
    isPremium?: any;
	addedAt?:any;
	updatedAt?:any;
	posts?: Post[];
	nbrPosts?: any;
}