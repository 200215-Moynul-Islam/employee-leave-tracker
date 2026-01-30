using ELTBackend.Models;

namespace ELTBackend.Repositories
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task<bool> ExistsByEmailAsync(string email);
    }
}
