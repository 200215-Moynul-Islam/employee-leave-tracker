using ELTBackend.Data;
using ELTBackend.Models;

namespace ELTBackend.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(EmployeeLeaveTrackerDbContext dbContext)
            : base(dbContext) { }
    }
}
