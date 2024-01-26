using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Presentacion.Shared;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Xml.Linq;

namespace Presentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        
        private readonly IConfiguration Configuration;

        public AuthController(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        [HttpPost]
        public async Task<ActionResult<RespuestaSP>> Auth([FromBody] Credenciales credenciales)
        {
            var cadenaConexion = new ConfigurationBuilder()
                                    .AddJsonFile("appsettings.json")
                                    .Build()
                                    .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = DBXmlMethods.GetXml(credenciales);

            DataSet dsResultado = await DBXmlMethods.EjecutaBase(
                NameStoreProcedure.AUTHS,
                cadenaConexion,
                credenciales.Transaccion,
                xmlParam.ToString());

            RespuestaSP objRespuesta = new RespuestaSP();

            if (dsResultado.Tables.Count > 0)
            {
                try
                {
                    int status = Convert.ToInt32(dsResultado.Tables[1].Rows[0]["status"]);

                    if (status == 1)
                    {

                        foreach (DataRow row in dsResultado.Tables[0].Rows)
                        {
                            Usuario usuario = new Usuario
                            {
                                Id = Convert.ToInt32(row["id"]),
                                Nombres = row["nombres"].ToString(),
                                Rol = new Rol
                                {
                                    Descripcion = row["descripcion"].ToString()
                                },
                                Username = row["username"].ToString()
                            };
                            objRespuesta.Status = status;
                            objRespuesta.Data = CrearTokenUsuario(usuario);
                        }
                    }
                    else
                    {
                        objRespuesta.Status = status;
                        objRespuesta.Data = dsResultado.Tables[1].Rows[0]["data"].ToString();
                    }
                }
                catch (Exception e)
                {
                    Console.Write(e.ToString());
                }
            }
            return Ok(objRespuesta);
        }

        private string CrearTokenUsuario(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, usuario.Nombres),
                new Claim(ClaimTypes.Name, usuario.Rol.Descripcion),
            };
            var appSettingsToken = Configuration.GetSection("AppSettings:Token").Value;
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
