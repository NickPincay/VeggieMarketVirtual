using Entities;
using Microsoft.AspNetCore.Mvc;
using Presentacion.Shared;
using System.Data;
using System.Xml.Linq;

namespace Presentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : Controller
    {
        [HttpPost]
        public async Task<ActionResult<RespuestaSP>> Post([FromBody] Factura factura)
        {
            factura.Transaccion = "post";
            var cadenaConexion = new ConfigurationBuilder()
                                    .AddJsonFile("appsettings.json")
                                    .Build()
                                    .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = DBXmlMethods.GetXml(factura);

            DataSet dsResultado = await DBXmlMethods.EjecutaBase(
                NameStoreProcedure.SET_FACTURA,
                cadenaConexion,
                factura.Transaccion,
                xmlParam.ToString());

            RespuestaSP objRespuesta = new RespuestaSP();

            if (dsResultado.Tables.Count > 0)
            {
                try
                {
                    objRespuesta.Status = Convert.ToInt32(dsResultado.Tables[0].Rows[0]["status"]);
                    objRespuesta.Data = dsResultado.Tables[0].Rows[0]["data"].ToString();
                }
                catch (Exception e)
                {
                    Console.Write(e.ToString());
                }
            }
            return Ok(objRespuesta);
        }
    }
}
