import "reflect-metadata";
import { container } from "tsyringe";
import { PostRepositoryPort } from '../../application/Post/port/secondary/PostRepositoryPort';
import { FakePostRepository } from "../fakes/fakePostRepository";
import { CreatePostUseCase } from "../../application/Post/usecases/createPost";
import { PostEventhandler } from "../../adapter/secondary/post/PostEventHandler";
import { PostEventHandlerPort } from "../../application/Post/port/secondary/PostEventHandlerPort";
import { BaseEventHandler } from "../../adapter/secondary/events/BaseEventHandler";


describe('Create Post', () => {
    let postRepository: PostRepositoryPort;
    let postEventHandler: PostEventHandlerPort;

    beforeEach(() => {

        container.registerSingleton("PostRepository", FakePostRepository);
        container.registerSingleton("PostEventHandler", PostEventhandler)
        postRepository = container.resolve(FakePostRepository);
        postEventHandler = container.resolve(PostEventhandler)
    });
    it('Should create a post', async () => {
        const eventPromise = new Promise((resolve) => BaseEventHandler.on("post_created", (event) => {
            console.log(event);
            resolve(event);
        }));
        const createPostUseCase = new CreatePostUseCase(postRepository, postEventHandler);
        const post = await createPostUseCase.create({
            title: "test1",
            content: "this is my new post",
            authorId: "1"
        });
        const event = await eventPromise;
        expect(post).toHaveProperty("title");
        expect(post).toHaveProperty("content");
        expect(post).toHaveProperty("authorId");
        expect(post).toHaveProperty("id");
        expect(event).toHaveProperty("id");
    }
    )
});