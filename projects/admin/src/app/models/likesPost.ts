import { Post } from "./post";
import { User } from "./user";

export class LikesPost {
    id?:any;
	hasLiked?:any;
	likesAt?:any;
	myPost:Post;
	myAuthor:User;
}