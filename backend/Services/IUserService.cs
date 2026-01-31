using ELTBackend.DTOs;

namespace ELTBackend.Services
{
    public interface IUserService
    {
        Task<UserReadDto> CreateUserAsync(UserCreateDto userCreateDto);
        Task<IEnumerable<UserReadDto>> GetAllEmployeesAsync();
    }
}
