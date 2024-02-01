// src/Infrastructures/repository/_test/CommentRepository.test.js
const CommentRepository = require('../CommentRepository');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');

describe('CommentRepository interface', () => {
  it('should throw error for unimplemented method addComment', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action and Assert
    await expect(commentRepository.addComment({}))
      .rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });

  it('should throw error for unimplemented method isCommentExist', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action and Assert
    await expect(commentRepository.isCommentExist('comment-123'))
      .rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });

  it('should throw error for unimplemented method isCommentOwner', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action and Assert
    await expect(commentRepository.isCommentOwner('comment-123', 'user-123'))
      .rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });

  it('should throw error for unimplemented method deleteComment', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action and Assert
    await expect(commentRepository.deleteComment('comment-123'))
      .rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });

  it('should throw error for unimplemented method getCommentsByThreadId', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action and Assert
    await expect(commentRepository.getCommentsByThreadId('thread-123'))
      .rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
