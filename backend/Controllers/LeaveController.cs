using ELTBackend.DTOs;
using ELTBackend.Services;
using ELTBackend.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ELTBackend.Controllers
{
    [ApiController]
    [Route("api/leaves")]
    public class LeaveController : ControllerBase
    {
        private readonly IUserLeaveService _userLeaveService;

        public LeaveController(IUserLeaveService userLeaveService)
        {
            _userLeaveService = userLeaveService;
        }

        // POST: api/leaves
        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateLeaveAsync(
            [FromBody] LeaveCreateDto leaveCreateDto
        )
        {
            return StatusCode(
                StatusCodes.Status201Created,
                ResponseHelper.Success(
                    data: await _userLeaveService.CreateLeaveAsync(leaveCreateDto)
                )
            );
        }
    }
}
