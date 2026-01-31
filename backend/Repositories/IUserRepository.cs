using ELTBackend.Models;

namespace ELTBackend.Repositories
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task<bool> ExistsByEmailAsync(string email);
        Task<User?> GetUserByEmailAsync(string email);
        Task<IEnumerable<User>> GetUsersByRoleAsync(string role);
    }
}
