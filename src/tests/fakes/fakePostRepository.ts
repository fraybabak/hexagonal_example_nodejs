import { Post } from "../../application/Post/domain/Post";
import { IPostCreateRepository, IPost } from "../../application/Post/domain/IPost";
import { PostRepositoryPort } from "../../application/Post/port/secondary/PostRepositoryPort";
import { NotFoundError } from "../../Errors/NotFound";


export class FakePostRepository implements PostRepositoryPort {
    private posts = [
        {
            id: '1',
            title: 'this is my second post',
            content: 'the second post content',
            authorId: '1',
            createdAt: new Date(),
            updatedAt: new Date(),

        }
    ];
    async create(post: IPostCreateRepository): Promise<Post> {
        this.posts.push(post);
        return new Post(post.title, post.content, post.authorId, post.id);
    }
    async findById(id: string) {
        let post = this.posts.find(post => post.id === id);
        if (post) {
            return post;
        }
        throw new NotFoundError('post not found', 404)
    }
    async findbyAuthorId(authorId: string): Promise<IPost[]> {
        let posts = this.posts.filter(post => post.authorId === authorId);
        return posts;
    }
    async delete(id: string): Promise<boolean> {
        let post = this.posts.find(post => post.id === id);
        if (post) {
            this.posts = this.posts.filter(post => post.id !== id);
            return true;
        }
        return false;
    }

}