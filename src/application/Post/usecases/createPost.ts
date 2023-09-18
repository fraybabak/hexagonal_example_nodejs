import "reflect-metadata";

import { inject, injectable } from "tsyringe";



import { IPostCreate, IPost } from "../domain/IPost";
import { Post } from "../domain/Post";
import { CreatePostPort } from "../port/primary/CreatePostPort";

import { PostRepositoryPort } from "../port/secondary/PostRepositoryPort";
import { UnCaughtError } from "../../../Errors/Uncaught"
import { PostCreatedEvent } from "../domain/PostEvent";

// import { PostEventHandlerPort } from "../port/secondary/PostEventHandlerPort";

