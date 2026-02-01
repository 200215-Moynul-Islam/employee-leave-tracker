using ELTBackend.DTOs;
using ELTBackend.Services;
using ELTBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace ELTBackend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // POST: api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<UserReadDto>> CreateUser(
            [FromBody] UserCreateDto userCreateDto
        )
        {
            return StatusCode(
                StatusCodes.Status201Created,
                ResponseHelper.Success(data: await _userService.CreateUserAsync(userCreateDto))
            );
        }

        // GET: api/useers/employees
        [HttpGet("employees")]
        public async Task<ActionResult<ApiResponse>> GetAllEmployees()
        {
            return Ok(ResponseHelper.Success(data: await _userService.GetAllEmployeesAsync()));
        }

        // PATCH: api/users/{id:Guid}
        [HttpPatch("{id:Guid}")]
        public async Task<ActionResult<ApiResponse>> UpdateUserByIdAsync(
            [FromRoute] Guid id,
            [FromBody] UserUpdateDto userUpdateDto
        )
        {
            return Ok(
                ResponseHelper.Success(
                    data: await _userService.UpdateUserByIdAsync(id, userUpdateDto)
                )
            );
        }

        // DELETE: api/users/{id:Guid}
        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<ApiResponse>> DeleteUserByIdAsync([FromRoute] Guid id)
        {
            await _userService.DeactivateUserByIdAsync(id);
            return Ok(ResponseHelper.Success());
        }
    }
}
