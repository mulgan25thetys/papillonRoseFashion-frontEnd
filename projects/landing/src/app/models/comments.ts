import { User } from "./user";
import { Post } from './post';

export class Comments {
    id?:any;
	content?:any;
	commentAt?:any;
	author?:User;
	post?:Post;
}