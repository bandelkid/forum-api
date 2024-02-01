// src/Applications/use_case/_test/DeleteCommentUseCase.test.js
const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteComment = require('../../../Domains/comments/entities/DeleteComment');

describe('DeleteCommentUseCase', () => {
  it('should delete comment correctly', async () => {
    // Arrange
    const mockCommentRepository = {
      isCommentExist: jest.fn(() => Promise.resolve(true)),
      isCommentOwner: jest.fn(() => Promise.resolve(true)),
      deleteComment: jest.fn(),
    };

    const mockThreadRepository = {
      isThreadExist: jest.fn(() => Promise.resolve(true)),
    };

    const useCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    // Action
    await useCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.isThreadExist).toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.isCommentExist).toHaveBeenCalledWith(useCasePayload.id);
    expect(mockCommentRepository.isCommentOwner).toHaveBeenCalledWith(
      useCasePayload.id,
      useCasePayload.owner,
    );
    expect(mockCommentRepository.deleteComment).toHaveBeenCalledWith(useCasePayload.id);
  });

  it('should throw error when thread not found', async () => {
    // Arrange
    const mockCommentRepository = {
      isCommentExist: jest.fn(() => Promise.resolve(true)),
      isCommentOwner: jest.fn(() => Promise.resolve(true)),
      deleteComment: jest.fn(),
    };

    const mockThreadRepository = {
      isThreadExist: jest.fn(() => Promise.resolve(false)),
    };

    const useCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const useCasePayload = {
      id: 'comment-123',
      threadId: 'nonexistent-thread',
      owner: 'user-123',
    };

    // Action and Assert
    await expect(useCase.execute(useCasePayload))
      .rejects.toThrowError('DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND');

    // Ensure that isCommentExist, isCommentOwner, and deleteComment are not called
    expect(mockCommentRepository.isCommentExist).not.toHaveBeenCalled();
    expect(mockCommentRepository.isCommentOwner).not.toHaveBeenCalled();
    expect(mockCommentRepository.deleteComment).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});
