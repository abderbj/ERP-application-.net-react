using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        // Register Model
        public class RegisterModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        // Register API
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var user = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok("User registered successfully.");
            }

            return BadRequest(result.Errors);
        }

        // Login Model
        public class LoginModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        // Login API
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return BadRequest("Invalid email or password.");

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (result.Succeeded)
            {
                return Ok(new { userId = user.Id }); // Return user ID
            }

            return BadRequest("Invalid login attempt.");
        }

        // Create Role API
        [HttpPost("create-role")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new IdentityRole { Name = roleName });
                return Ok("Role created successfully.");
            }

            return BadRequest("Role already exists.");
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] AssignRoleModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return BadRequest("User not found.");

            if (!await _roleManager.RoleExistsAsync(model.RoleName))
            {
                return BadRequest("Role does not exist.");
            }

            await _userManager.AddToRoleAsync(user, model.RoleName);
            return Ok("Role assigned to user.");
        }

        [HttpPost("get-user-roles")]
public async Task<IActionResult> GetUserRoles([FromBody] GetUserRolesRequest request)
{
    if (string.IsNullOrEmpty(request.Email))
    {
        return BadRequest("Email is required.");
    }

    var user = await _userManager.FindByEmailAsync(request.Email);
    if (user == null)
    {
        return NotFound("User not found.");
    }

    

    var roles = await _userManager.GetRolesAsync(user);
    return Ok(roles);
}
public class GetUserRolesRequest
{
    public string Email { get; set; }
}
        // Define the model for JSON request body
        public class AssignRoleModel
        {
            public string Email { get; set; }
            public string RoleName { get; set; }
        }

        // Logout API
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Logged out successfully.");
        }
    }
}
