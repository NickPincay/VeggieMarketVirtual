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
    public class ProductosController : Controller
    {

        [HttpGet]
        public async Task<ActionResult<RespuestaSP>> Get()
        {
            ProductoLocal product = new ProductoLocal();
            product.Transaccion = "PRODUCTOS_LOCAL";

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

            List<ProductoLocal> listData = new List<ProductoLocal>();

            if (dsResultado.Tables.Count > 0)
            {
                try
                {
                    foreach (DataRow row in dsResultado.Tables[0].Rows)
                    {
                        ProductoLocal productObj = new ProductoLocal
                        {
                            Id = Convert.ToInt32(row["id"]),
                            Nombre = row["nombre"].ToString(),
                            Precio = Convert.ToDecimal(row["precio"].ToString()),
                            Cantidad = Convert.ToInt32(row["cantidad"].ToString()),
                            ImagenName = row["imagenName"].ToString(),
                            Descripcion = row["descripcion"].ToString(),
                            NombreAgricultor = row["nombreAgricultor"].ToString(),
                            Cosecha = Convert.ToDateTime(row["cosecha"].ToString()),
                            Descuento = Convert.ToInt32(row["descuento"]),
                            Categoria = new Categoria
                            {
                                Id= Convert.ToInt32(row["id"]),
                                Nombre = row["nombre_categoria"].ToString()
                            }
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
        public async Task<ActionResult<RespuestaSP>> Post([FromBody] ProductoLocal producto)
        {           
            var cadenaConexion = new ConfigurationBuilder()
                                    .AddJsonFile("appsettings.json")
                                    .Build()
                                    .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = DBXmlMethods.GetXml(producto);

            DataSet dsResultado = await DBXmlMethods.EjecutaBase(
                NameStoreProcedure.SET_PRODUCTO,
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
