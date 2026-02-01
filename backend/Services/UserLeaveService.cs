using AutoMapper;
using ELTBackend.Constants;
using ELTBackend.DTOs;
using ELTBackend.Exceptions;
using ELTBackend.Models;
using ELTBackend.Repositories;

namespace ELTBackend.Services
{
    public class UserLeaveService : IUserLeaveService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ILeaveRepository _leaveRepository;

        public UserLeaveService(
            IMapper mapper,
            IUserRepository userRepository,
            ILeaveRepository leaveRepository
        )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _leaveRepository = leaveRepository;
        }

        public async Task<LeaveReadDto> CreateLeaveAsync(LeaveCreateDto leaveCreateDto)
        {
            await EnsureUserExistsByIdOrThrowAsync(leaveCreateDto.UserId);
            var leaveEntity = _mapper.Map<Leave>(leaveCreateDto);
            await _leaveRepository.CreateAsync(leaveEntity);
            await _leaveRepository.SaveChangesAsync();
            return _mapper.Map<LeaveReadDto>(leaveEntity);
        }

        #region Private Methods
        private async Task EnsureUserExistsByIdOrThrowAsync(Guid userId)
        {
            var exists = await _userRepository.ExistsByIdAsync(userId);

            if (!exists)
            {
                throw new NotFoundException(BusinessErrorMessages.UserNotFound);
            }
        }
        #endregion
    }
}
