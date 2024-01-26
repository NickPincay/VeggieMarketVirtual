using Entities;
using Microsoft.AspNetCore.Mvc;
using Presentacion.Shared;
using System.Data;
using System.Xml.Linq;

namespace Presentacion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoComunidadController : Controller
    {
        [HttpGet]
        public async Task<ActionResult<RespuestaSP>> Get()
        {
            ProductoComunidad product = new ProductoComunidad();
            product.Transaccion = "PRODUCTOS_COMUNIDAD";

            var cadenaConexion = new ConfigurationBuilder()
                                    .AddJsonFile("appsettings.json")
                                    .Build()
                                    .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = DBXmlMethods.GetXml(product);

            DataSet dsResultado = await DBXmlMethods.EjecutaBase(
                NameStoreProcedure.CONSULTAS,
                cadenaConexion,
                product.Transaccion,
                xmlParam.ToString());

            List<ProductoComunidad> listData = new List<ProductoComunidad>();

            if (dsResultado.Tables.Count > 0)
            {
                try
                {
                    foreach (DataRow row in dsResultado.Tables[0].Rows)
                    {
                        ProductoComunidad productObj = new ProductoComunidad
                        {
                            Id = Convert.ToInt32(row["id"]),
                            Nombre = row["nombre"].ToString(),
                            Precio = Convert.ToDecimal(row["precio"].ToString()),
                            Cantidad = Convert.ToInt32(row["cantidad"].ToString()),
                            ImagenName = row["imagenName"].ToString(),
                            Descripcion = row["descripcion"].ToString(),
                            Cosecha = Convert.ToDateTime(row["cosecha"].ToString())
                        };
                        listData.Add(productObj);
                    }

                }
                catch (Exception e)
                {
                    Console.Write(e.ToString());
                }
            }
            return Ok(listData);
        }


        [HttpPost]
        public async Task<ActionResult<RespuestaSP>> Post([FromBody] ProductoComunidad producto)
        {
            var cadenaConexion = new ConfigurationBuilder()
                                    .AddJsonFile("appsettings.json")
                                    .Build()
                                    .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = DBXmlMethods.GetXml(producto);

            DataSet dsResultado = await DBXmlMethods.EjecutaBase(
                NameStoreProcedure.SET_PRODUCTOCOMUNIDAD,
                cadenaConexion,
                producto.Transaccion,
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
