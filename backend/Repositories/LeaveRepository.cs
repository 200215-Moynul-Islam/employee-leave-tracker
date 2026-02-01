using ELTBackend.Data;
using ELTBackend.Models;

namespace ELTBackend.Repositories
{
    public class LeaveRepository : RepositoryBase<Leave>, ILeaveRepository
    {
        public LeaveRepository(EmployeeLeaveTrackerDbContext dbContext)
            : base(dbContext) { }
    }
}
