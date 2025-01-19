import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }
  async findAll() {
    return this.prisma.post.findMany();
  }

  async findByUserId(userId: number) {
    return this.prisma.post.findMany({
      where: {
        userId: userId,
      },
    });
  }
  

  async remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }
  
  async reportPost(postId: number, userId: number, reason: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    const existingReport = await this.prisma.report.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingReport) {
      throw new BadRequestException('You have already reported this post');
    }

    await this.prisma.report.create({
      data: { userId, postId, reason },
    });

    return { message: 'Post reported successfully' };
  }
  
  // UPVOTE logic
  async upvotePost(postId: number, userId: number) {
    const existingVote = await this.prisma.vote.findUnique({
      where: {
        userId_postId: { userId, postId }, 
      },
    });

    if (existingVote) {
      // If it's already an UPVOTE, do nothing or return the same vote
      if (existingVote.voteType === 'UPVOTE') {
        return existingVote;
      }
      // Otherwise, change a DOWNVOTE to an UPVOTE
      return this.prisma.vote.update({
        where: { id: existingVote.id },
        data: { voteType: 'UPVOTE' },
      });
    }

    // If there's no existing vote, create a new one
    return this.prisma.vote.create({
      data: {
        postId,
        userId,
        voteType: 'UPVOTE',
      },
    });
  }

  // DOWNVOTE logic
  async downvotePost(postId: number, userId: number) {
    const existingVote = await this.prisma.vote.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingVote) {
      // If it's already a DOWNVOTE, do nothing
      if (existingVote.voteType === 'DOWNVOTE') {
        return existingVote;
      }
      // Otherwise, change an UPVOTE to a DOWNVOTE
      return this.prisma.vote.update({
        where: { id: existingVote.id },
        data: { voteType: 'DOWNVOTE' },
      });
    }

    // Create new vote
    return this.prisma.vote.create({
      data: {
        postId,
        userId,
        voteType: 'DOWNVOTE',
      },
    });
  }

  // Retrieve upvotes, downvotes, and netVotes for a post
  async getVotes(postId: number) {
    const upvoteCount = await this.prisma.vote.count({
      where: { postId, voteType: 'UPVOTE' },
    });
    const downvoteCount = await this.prisma.vote.count({
      where: { postId, voteType: 'DOWNVOTE' },
    });

    return {
      upvotes: upvoteCount,
      downvotes: downvoteCount,
      netVotes: upvoteCount - downvoteCount,
    };
  }

}

