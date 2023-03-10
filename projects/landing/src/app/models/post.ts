import { LikesPost } from "./likesPost";
import { ViewsPost } from "./viewsPost";
import { Comments } from './comments';
import { Gallery } from "./gallery";
import { Category } from "./category";
import { User } from "./user";

export class Post {
    
    id?:any;
	title?:any;
	content?:any;
	slug?:any;
	isPublished?:any;
	isDownloaded?:any;
	isShared?:any;
	views?:any;
	likes?:any;
	unlikes?:any;
	numberShares?:any;
	isPremium?:any;
	addedAt?:Date;
	updatedAt?:any;
    author?:User;
	category?:Category;
	galleries?:Gallery[];
	comments?:Comments[];
	myLikes?:LikesPost[];
	myViews?: ViewsPost[];
	image?: Gallery;
	profileDefault?: any;
	recentTime?: String = "0 Hours";
}