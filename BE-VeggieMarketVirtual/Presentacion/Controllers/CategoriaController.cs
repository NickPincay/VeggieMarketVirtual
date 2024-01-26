using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentacion.Shared;
using System.Data;
using System.Xml.Linq;

namespace Presentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : Controller
    {

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<RespuestaSP>> Get()
        {
            Categoria categoria = new Categoria();
            categoria.Transaccion = "CATEGORIAS";

            var cadenaConexion = new ConfigurationBuilder()
                                    .AddJsonFile("appsettings.json")
                                    .Build()
                                    .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = DBXmlMethods.GetXml(categoria);

            DataSet dsResultado = await DBXmlMethods.EjecutaBase(
                NameStoreProcedure.CONSULTAS,
                cadenaConexion,
                categoria.Transaccion,
                xmlParam.ToString());

            RespuestaSP objRespuesta = new RespuestaSP();
            List<Categoria> listData = new List<Categoria>();

            if (dsResultado.Tables.Count > 0)
            {
                try
                {

                    foreach (DataRow row in dsResultado.Tables[0].Rows)
                    {
                        Categoria categoriaObj = new Categoria
                        {
                            Id = Convert.ToInt32(row["id"]),
                            Nombre = row["nombre"].ToString(),                               
                        };
                        listData.Add(categoriaObj);
                    }

                }
                catch (Exception e)
                {
                    Console.Write(e.ToString());
                }
            }
            return Ok(listData);
        }

    }
}
