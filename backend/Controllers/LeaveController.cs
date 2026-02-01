using ELTBackend.DTOs;
using ELTBackend.Services;
using ELTBackend.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

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

        // DELETE: api/leaves/{id:Guid}?userId={userId}
        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<ApiResponse>> DeletePendingLeaveAsync(
            [FromRoute] Guid id,
            [FromQuery, BindRequired] Guid userId
        )
        {
            await _userLeaveService.DeletePendingLeaveAsync(id, userId);
            return Ok(ResponseHelper.Success());
        }

        // PATCH: api/leaves/{id:Guid}/approve?userId={userId}
        [HttpPatch("{id:Guid}/approve")]
        public async Task<ActionResult<ApiResponse>> ApprovePendingLeaveAsync(
            [FromRoute] Guid id,
            [FromQuery, BindRequired] Guid userId
        )
        {
            return Ok(
                ResponseHelper.Success(
                    data: await _userLeaveService.ApprovePendingLeaveAsync(id, userId)
                )
            );
        }

        // PATCH: api/leaves/{id:Guid}/reject?userId={userId}
        [HttpPatch("{id:Guid}/reject")]
        public async Task<ActionResult<ApiResponse>> RejectPendingLeaveAsync(
            [FromRoute] Guid id,
            [FromQuery, BindRequired] Guid userId
        )
        {
            return Ok(
                ResponseHelper.Success(
                    data: await _userLeaveService.RejectPendingLeaveAsync(id, userId)
                )
            );
        }
    }
}
