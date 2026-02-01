using ELTBackend.DTOs;

namespace ELTBackend.Services
{
    public interface IUserLeaveService
    {
        Task<LeaveReadDto> CreateLeaveAsync(LeaveCreateDto leaveCreateDto);
    }
}
