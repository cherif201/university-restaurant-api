import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  
} from '@nestjs/common';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { PostsService } from './posts.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';



@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully.' })
  async findAll() {
    return this.postsService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CreatePostDto })
  createPost(@Body() { userId, ...createPostData }: CreatePostDto) {
    return this.postsService.createPost(userId, createPostData);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get posts by user ID' })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully.' })
  @ApiParam({ name: 'userId', type: String, description: 'ID of the user whose posts to retrieve' })
  async findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findByUserId(userId);
  }
 


  /**
   * UPVOTE a Post
   * 
   * Route: POST /posts/:postId/upvote
   * Body: { "userId": number }
   * 
   * Example Body:
   *   {
   *     "userId": 123
   *   }
   */
  @Post(':postId/upvote')
  async upvotePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.upvotePost(postId, userId);
  }

  /**
   * DOWNVOTE a Post
   * 
   * Route: POST /posts/:postId/downvote
   * Body: { "userId": number }
   * 
   * Example Body:
   *   {
   *     "userId": 123
   *   }
   */
  @Post(':postId/downvote')
  async downvotePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.downvotePost(postId, userId);
  }

  /**
   * GET total votes for a Post
   * 
   * Route: GET /posts/:postId/votes
   * No body needed.
   */
  @Get(':postId/votes')
  async getVotes(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.getVotes(postId);
  }

  
    // --- REPORT POST ---
    @Post(':postId/report')
    async reportPost(
      @Param('postId', ParseIntPipe) postId: number,
      @Body('userId', ParseIntPipe) userId: number,  // <--- Take user ID from the request body
      @Body('reason') reason: string,
    ) {
      return this.postsService.reportPost(postId, userId, reason);
    }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the post to delete',
  })
  @ApiResponse({ status: 200, description: 'Post has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async remove(@Param('id', ParseIntPipe) postId: number) {
    return this.postsService.remove(postId);
  }}
  




