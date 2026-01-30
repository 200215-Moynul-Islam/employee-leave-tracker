using AutoMapper;
using ELTBackend.Constants;
using ELTBackend.DTOs;
using ELTBackend.Exceptions;
using ELTBackend.Models;
using ELTBackend.Repositories;

namespace ELTBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserReadDto> CreateUserAsync(UserCreateDto userCreateDto)
        {
            await EnsureEmailIsUniqueOrThrowAsync(userCreateDto.Email!);

            var userEntity = _mapper.Map<User>(userCreateDto);
            userEntity.Id = Guid.NewGuid();
            userEntity.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userCreateDto.Password);
            userEntity.Role = Roles.Employee; // Default role assignment

            await _userRepository.CreateAsync(userEntity);
            await _userRepository.SaveChangesAsync();

            return _mapper.Map<UserReadDto>(userEntity);
        }

        #region Private Methods
        private async Task EnsureEmailIsUniqueOrThrowAsync(string email)
        {
            if (await _userRepository.ExistsByEmailAsync(email))
            {
                throw new ConflictException(BusinessErrorMessages.UserEmailAlreadyExists);
            }
        }
        #endregion
    }
}
