using ELTBackend.Data;
using ELTBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace ELTBackend.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(EmployeeLeaveTrackerDbContext dbContext)
            : base(dbContext) { }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _dbSet.AnyAsync(u => u.Email == email);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Email == email && !u.IsDeleted);
        }
    }
}
