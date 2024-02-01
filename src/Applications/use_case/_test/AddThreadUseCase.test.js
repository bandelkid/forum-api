const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
it('should orchestrating the add thread action correctly', async () => {

  // Arrange
  const mockThreadRepository = new ThreadRepository();
  const mockReturnAddThread = new AddedThread({
    id: 'thread-123',
    title: 'ini contoh thread title',
    owner: 'user-123',
  });
  mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddThread));

  const useCase = new AddThreadUseCase({
    threadRepository: mockThreadRepository,
  });

  const useCasePayload = {
    title: 'ini contoh thread title',
    body: 'ini contoh thread body',
    owner: 'user-123',
  };

  const expectedAddedThread = new AddedThread({
    id: 'thread-123',
    title: 'ini contoh thread title',
    owner: 'user-123',
  });

  // Action
  const addedThread = await useCase.execute(useCasePayload);

  // Assert
  expect(addedThread).toEqual(expectedAddedThread);
  expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
});

it('should handle error when adding thread fails', async () => {
  // Arrange
  const mockThreadRepository = new ThreadRepository();
  mockThreadRepository.addThread = jest.fn(() => Promise.reject(new Error('Failed to add thread')));

  const useCase = new AddThreadUseCase({
    threadRepository: mockThreadRepository,
  });

  const useCasePayload = {
    title: 'ini contoh thread title',
    body: 'ini contoh thread body',
    owner: 'user-123',
  };

  // Action and Assert
  await expect(useCase.execute(useCasePayload)).rejects.toThrowError('Failed to add thread');
});

it('should add thread with different payload correctly', async () => {
  // Arrange
  const mockThreadRepository = new ThreadRepository();
  const mockReturnAddThread = new AddedThread({
    id: 'thread-456',
    title: 'thread title lain',
    owner: 'user-789',
  });
  mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddThread));

  const useCase = new AddThreadUseCase({
    threadRepository: mockThreadRepository,
  });

  const useCasePayload = {
    title: 'thread title lain',
    body: 'thread body lain',
    owner: 'user-789',
  };

  const expectedAddedThread = new AddedThread({
    id: 'thread-456',
    title: 'thread title lain',
    owner: 'user-789',
  });

  // Action
  const addedThread = await useCase.execute(useCasePayload);

  // Assert
  expect(addedThread).toEqual(expectedAddedThread);
  expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
});
