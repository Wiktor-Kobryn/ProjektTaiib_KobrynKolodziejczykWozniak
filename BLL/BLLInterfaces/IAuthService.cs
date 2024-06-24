using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Model;
namespace BLL
{
    public interface IAuthService
    {
        Task<(int, string)> Registeration(RegistrationModel model, string role);
        Task<(int, string)> Login(LoginModel model);
    }
}
